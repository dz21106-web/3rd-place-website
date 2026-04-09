#!/usr/bin/env python3
"""
Claude Code → Notion ダッシュボード 自動更新スクリプト

各メンバーが自分のマシンで実行すると:
1. 過去24時間のClaude Code作業ログを抽出
2. タスクボードのステータスを自動更新（進行中のタスクに作業メモを追記）
3. 意思決定ログに新しい判断があれば追加
4. 引き継ぎボードに依頼事項があれば追加
5. 週次サマリーを自動生成（日曜実行時のみ）

環境変数:
  NOTION_TOKEN, MEMBER_NAME, ANTHROPIC_API_KEY（任意）

使い方:
  python3 scripts/daily_report_notion.py
  python3 scripts/daily_report_notion.py --dry-run
  python3 scripts/daily_report_notion.py --weekly   # 週次サマリー強制生成
"""

import json
import os
import sys
import subprocess
import time
import argparse
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── 設定 ──────────────────────────────────────────────
NOTION_TOKEN = os.environ.get("NOTION_TOKEN", "")
MEMBER_NAME = os.environ.get("MEMBER_NAME", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

CLAUDE_DIR = Path.home() / ".claude"
HISTORY_FILE = CLAUDE_DIR / "history.jsonl"
PROJECT_FILTER = os.environ.get("PROJECT_FILTER", "3rd place job housing referral bank")

# Notion Database IDs
TASK_DB = "33aeaa14-f6a1-81ba-90cc-c1f2ee1b76bf"
DECISION_DB = "33aeaa14-f6a1-81af-b8d0-c4c5a756b07e"
HANDOVER_DB = "33aeaa14-f6a1-8127-ba98-e841006dc537"
PROGRESS_DB = "33aeaa14-f6a1-81b7-aa80-cfc75a7787a9"
DASHBOARD_PAGE = "32deaa14f6a181349621d77d5f5852d4"

# メンバー名のマッピング（環境変数 → Notion表示名）
MEMBER_DISPLAY = {
    "ダイチ": "🔵 ダイチ", "ヒロト": "🟢 ヒロト",
    "ミナト": "🟠 ミナト", "アサヒ": "🔴 アサヒ",
}

def display_name():
    return MEMBER_DISPLAY.get(MEMBER_NAME, MEMBER_NAME)


# ── Notion API ─────────────────────────────────────────
def notion_request(method, endpoint, payload=None):
    url = f"https://api.notion.com/v1/{endpoint}"
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(
        url, data=data,
        headers={
            "Authorization": f"Bearer {NOTION_TOKEN}",
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  Notion API error ({e.code}): {body[:200]}", file=sys.stderr)
        return None


def get_my_tasks():
    """Get all tasks assigned to this member."""
    result = notion_request("POST", f"databases/{TASK_DB}/query", {
        "filter": {
            "property": "担当者",
            "select": {"equals": display_name()},
        },
        "sorts": [{"property": "優先度", "direction": "ascending"}],
    })
    if not result:
        return []
    tasks = []
    for page in result.get("results", []):
        props = page["properties"]
        title_parts = props.get("タスク", {}).get("title", [])
        title = "".join(t.get("plain_text", "") for t in title_parts)
        status_obj = props.get("ステータス", {}).get("select")
        task_status = status_obj["name"] if status_obj else "未着手"
        memo_parts = props.get("メモ", {}).get("rich_text", [])
        memo = "".join(t.get("plain_text", "") for t in memo_parts)
        tasks.append({
            "id": page["id"],
            "title": title,
            "status": task_status,
            "memo": memo,
        })
    return tasks


def update_task_memo(page_id, new_memo):
    """Append to a task's memo field."""
    notion_request("PATCH", f"pages/{page_id}", {
        "properties": {
            "メモ": {"rich_text": [{"text": {"content": new_memo[:2000]}}]},
        }
    })


def update_task_status(page_id, new_status):
    """Update a task's status."""
    notion_request("PATCH", f"pages/{page_id}", {
        "properties": {
            "ステータス": {"select": {"name": new_status}},
        }
    })


def add_decision(title, category, bg_reason, decision_status="仮決定"):
    """Add a new entry to the decision log."""
    jst = timezone(timedelta(hours=9))
    today = datetime.now(jst).strftime("%Y-%m-%d")
    notion_request("POST", "pages", {
        "parent": {"database_id": DECISION_DB},
        "properties": {
            "決定事項": {"title": [{"text": {"content": title}}]},
            "日付": {"date": {"start": today}},
            "カテゴリ": {"select": {"name": category}},
            "ステータス": {"select": {"name": decision_status}},
            "背景・理由": {"rich_text": [{"text": {"content": bg_reason[:2000]}}]},
        }
    })


def post_daily_progress(date_str, summary, detail_memo):
    """Post daily progress to the progress database."""
    # Check if already posted today
    result = notion_request("POST", f"databases/{PROGRESS_DB}/query", {
        "filter": {
            "and": [
                {"property": "メンバー", "select": {"equals": display_name()}},
                {"property": "日付", "date": {"equals": date_str}},
            ]
        }
    })
    if result and result.get("results"):
        # Update existing entry
        page_id = result["results"][0]["id"]
        notion_request("PATCH", f"pages/{page_id}", {
            "properties": {
                "サマリー": {"title": [{"text": {"content": summary[:200]}}]},
                "進捗メモ": {"rich_text": [{"text": {"content": detail_memo[:2000]}}]},
            }
        })
        return "updated"
    else:
        # Create new entry
        notion_request("POST", "pages", {
            "parent": {"database_id": PROGRESS_DB},
            "properties": {
                "サマリー": {"title": [{"text": {"content": summary[:200]}}]},
                "日付": {"date": {"start": date_str}},
                "メンバー": {"select": {"name": display_name()}},
                "進捗メモ": {"rich_text": [{"text": {"content": detail_memo[:2000]}}]},
            }
        })
        return "created"


def add_handover(content, from_member, to_member, kind, detail):
    """Add a new entry to the handover board."""
    jst = timezone(timedelta(hours=9))
    today = datetime.now(jst).strftime("%Y-%m-%d")
    notion_request("POST", "pages", {
        "parent": {"database_id": HANDOVER_DB},
        "properties": {
            "内容": {"title": [{"text": {"content": content}}]},
            "From": {"select": {"name": MEMBER_DISPLAY.get(from_member, from_member)}},
            "To": {"select": {"name": MEMBER_DISPLAY.get(to_member, to_member)}},
            "種別": {"select": {"name": kind}},
            "ステータス": {"select": {"name": "未対応"}},
            "日付": {"date": {"start": today}},
            "詳細": {"rich_text": [{"text": {"content": detail[:2000]}}]},
        }
    })


# ── データ収集 ───────────────────────────────────────────
def get_project_dirs():
    projects_dir = CLAUDE_DIR / "projects"
    return list(projects_dir.iterdir()) if projects_dir.exists() else []


def extract_conversations(hours=24):
    cutoff_ms = (time.time() - hours * 3600) * 1000
    active_sessions = {}

    if HISTORY_FILE.exists():
        with open(HISTORY_FILE) as f:
            for line in f:
                try:
                    entry = json.loads(line.strip())
                except json.JSONDecodeError:
                    continue
                ts = entry.get("timestamp", 0)
                if ts >= cutoff_ms:
                    sid = entry.get("sessionId", "")
                    project = entry.get("project", "")
                    display = entry.get("display", "")
                    if sid and display and PROJECT_FILTER in project:
                        if sid not in active_sessions:
                            active_sessions[sid] = {"messages": [], "assistant_texts": []}
                        active_sessions[sid]["messages"].append(display)

    # Also extract assistant responses
    for sid, info in active_sessions.items():
        for project_dir in get_project_dirs():
            jsonl_path = project_dir / f"{sid}.jsonl"
            if jsonl_path.exists():
                try:
                    with open(jsonl_path) as f:
                        for line in f:
                            try:
                                entry = json.loads(line.strip())
                            except json.JSONDecodeError:
                                continue
                            ts = entry.get("timestamp", 0)
                            if not isinstance(ts, (int, float)) or ts < cutoff_ms:
                                continue
                            if entry.get("type") == "assistant":
                                msg = entry.get("message", {})
                                if isinstance(msg, dict):
                                    for block in msg.get("content", []):
                                        if isinstance(block, dict) and block.get("type") == "text":
                                            text = block.get("text", "").strip()
                                            if len(text) > 30:
                                                info["assistant_texts"].append(text[:600])
                except Exception:
                    pass
                break

    return active_sessions


def build_analysis_prompt(sessions, tasks):
    """Build prompt for Claude to analyze work and update dashboard."""
    # Compile all messages
    all_user_msgs = []
    all_assistant_msgs = []
    for sid, info in sessions.items():
        all_user_msgs.extend(info["messages"])
        all_assistant_msgs.extend(info["assistant_texts"])

    user_log = "\n".join(f"- {m[:300]}" for m in all_user_msgs[:40])
    assistant_log = "\n".join(f"- {m[:400]}" for m in all_assistant_msgs[:30])

    task_list = "\n".join(
        f"- [{t['status']}] {t['title']} (メモ: {t['memo'][:100]})"
        for t in tasks
    )

    return f"""あなたはプロジェクト管理アシスタントです。
以下はチームメンバー「{MEMBER_NAME}」の過去24時間のClaude Code作業ログと、現在のタスク一覧です。

## 作業ログ（ユーザーの発言）
{user_log}

## アシスタントの応答（抜粋）
{assistant_log}

## 現在のタスク一覧
{task_list}

---

以下のJSON形式で分析結果を出力してください。JSONのみ出力し、他のテキストは不要です。

{{
  "task_updates": [
    {{
      "title": "タスク名（完全一致で）",
      "new_status": "進行中 or 完了 or 待ち（他メンバー） or null（変更なし）",
      "memo_append": "今日の作業内容を簡潔に追記（50字以内）。変更なしならnull"
    }}
  ],
  "new_decisions": [
    {{
      "title": "決定事項（30字以内）",
      "category": "ビジネスモデル or プロダクト or 法的 or 運営方針 or デザイン",
      "reason": "背景・理由（100字以内）",
      "status": "確定 or 仮決定 or 議論中"
    }}
  ],
  "new_handovers": [
    {{
      "content": "内容（30字以内）",
      "to": "ダイチ or ヒロト or ミナト or アサヒ",
      "kind": "フィードバック or 依頼 or 質問 or 報告",
      "detail": "詳細（100字以内）"
    }}
  ],
  "daily_summary": "今日の作業を3〜5文で要約（チームメンバーに共有する用）"
}}

注意:
- task_updatesのtitleは現在のタスク一覧と完全一致させること
- 作業ログから明確に読み取れるものだけ出力。推測で追加しない
- new_decisions: LINEで流れそうな重要な判断のみ
- new_handovers: 他メンバーへの明確な依頼や報告のみ。fromは「{MEMBER_NAME}」固定"""


def analyze_with_claude(prompt):
    if not ANTHROPIC_API_KEY:
        return None
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        response = client.messages.create(
            model="claude-sonnet-4-6", max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        text = response.content[0].text.strip()
        # Extract JSON from response
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        return json.loads(text)
    except Exception as e:
        print(f"  Claude API error: {e}", file=sys.stderr)
        return None


def generate_fallback_analysis(sessions, tasks):
    """Simple analysis without Claude API."""
    all_msgs = []
    for info in sessions.values():
        all_msgs.extend(info["messages"])

    # Find tasks that seem related to today's work
    task_updates = []
    for t in tasks:
        if t["status"] == "進行中":
            relevant_msgs = [m for m in all_msgs if any(
                kw in m for kw in t["title"][:10].split()
            )]
            if relevant_msgs:
                task_updates.append({
                    "title": t["title"],
                    "new_status": None,
                    "memo_append": f"[{datetime.now().strftime('%m/%d')}] 作業あり",
                })

    summary = f"本日 {len(all_msgs)} 件の作業メッセージ。"
    if task_updates:
        summary += f" {len(task_updates)}件のタスクに進捗。"

    return {
        "task_updates": task_updates,
        "new_decisions": [],
        "new_handovers": [],
        "daily_summary": summary,
    }


# ── 週次サマリー ─────────────────────────────────────────
def generate_weekly_summary():
    """Generate a weekly summary page from the task/decision/handover boards."""
    # Get all tasks
    all_tasks = notion_request("POST", f"databases/{TASK_DB}/query", {})
    if not all_tasks:
        return

    completed = []
    in_progress = []
    blocked = []
    for page in all_tasks.get("results", []):
        props = page["properties"]
        title = "".join(t.get("plain_text", "") for t in props.get("タスク", {}).get("title", []))
        assignee = props.get("担当者", {}).get("select", {})
        assignee_name = assignee.get("name", "?") if assignee else "?"
        st = props.get("ステータス", {}).get("select", {})
        st_name = st.get("name", "?") if st else "?"

        entry = f"{title} ({assignee_name})"
        if st_name == "完了":
            completed.append(entry)
        elif st_name == "進行中":
            in_progress.append(entry)
        elif st_name == "待ち（他メンバー）":
            blocked.append(entry)

    # Build summary blocks
    jst = timezone(timedelta(hours=9))
    week_str = datetime.now(jst).strftime("%Y-%m-%d")
    blocks = [
        {"object": "block", "type": "heading_1", "heading_1": {
            "rich_text": [{"type": "text", "text": {"content": f"週次サマリー - {week_str}"}}]}},
        {"object": "block", "type": "heading_2", "heading_2": {
            "rich_text": [{"type": "text", "text": {"content": "✅ 今週完了"}}]}},
    ]
    for item in completed:
        blocks.append({"object": "block", "type": "bulleted_list_item",
                        "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}})
    if not completed:
        blocks.append({"object": "block", "type": "paragraph",
                        "paragraph": {"rich_text": [{"type": "text", "text": {"content": "(なし)"}}]}})

    blocks.append({"object": "block", "type": "heading_2", "heading_2": {
        "rich_text": [{"type": "text", "text": {"content": "🔄 進行中"}}]}})
    for item in in_progress:
        blocks.append({"object": "block", "type": "bulleted_list_item",
                        "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}})

    if blocked:
        blocks.append({"object": "block", "type": "heading_2", "heading_2": {
            "rich_text": [{"type": "text", "text": {"content": "⏳ ブロック中"}}]}})
        for item in blocked:
            blocks.append({"object": "block", "type": "bulleted_list_item",
                            "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}})

    # Create as a page in the dashboard
    result = notion_request("POST", "pages", {
        "parent": {"page_id": DASHBOARD_PAGE},
        "icon": {"type": "emoji", "emoji": "📊"},
        "properties": {
            "title": {"title": [{"text": {"content": f"週次サマリー - {week_str}"}}]},
        },
        "children": blocks[:100],
    })
    if result:
        print(f"  週次サマリー作成: https://www.notion.so/{result['id'].replace('-', '')}")


# ── メイン ───────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Claude Code → Notion ダッシュボード更新")
    parser.add_argument("--hours", type=int, default=24)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--weekly", action="store_true", help="週次サマリーを強制生成")
    args = parser.parse_args()

    if not MEMBER_NAME:
        print("エラー: MEMBER_NAME を設定してください", file=sys.stderr)
        sys.exit(1)
    if not args.dry_run and not NOTION_TOKEN:
        print("エラー: NOTION_TOKEN を設定してください", file=sys.stderr)
        sys.exit(1)

    # 1. 作業ログ抽出
    print(f"過去{args.hours}時間のログを抽出中...")
    sessions = extract_conversations(hours=args.hours)
    total_msgs = sum(len(s["messages"]) for s in sessions.values())
    if total_msgs == 0:
        print("作業ログがありません。")
        sys.exit(0)
    print(f"  {len(sessions)}セッション / {total_msgs}メッセージ")

    # 2. 現在のタスク取得
    if not args.dry_run:
        print("タスク一覧を取得中...")
        tasks = get_my_tasks()
        print(f"  {len(tasks)}件のタスク")
    else:
        tasks = []

    # 3. 分析
    print("分析中...")
    prompt = build_analysis_prompt(sessions, tasks)
    analysis = analyze_with_claude(prompt)
    if not analysis:
        print("  (Claude APIなし → 簡易分析)")
        analysis = generate_fallback_analysis(sessions, tasks)

    # 4. 結果表示
    print(f"\n{'='*50}")
    print(f"📋 {MEMBER_NAME} - ダッシュボード更新")
    print(f"{'='*50}")

    if analysis.get("daily_summary"):
        print(f"\n📝 サマリー: {analysis['daily_summary']}")

    if analysis.get("task_updates"):
        print(f"\n🎯 タスク更新 ({len(analysis['task_updates'])}件):")
        for u in analysis["task_updates"]:
            status_str = f" → {u['new_status']}" if u.get("new_status") else ""
            memo_str = f" [{u['memo_append']}]" if u.get("memo_append") else ""
            print(f"  - {u['title']}{status_str}{memo_str}")

    if analysis.get("new_decisions"):
        print(f"\n📝 新しい意思決定 ({len(analysis['new_decisions'])}件):")
        for d in analysis["new_decisions"]:
            print(f"  - [{d['status']}] {d['title']}")

    if analysis.get("new_handovers"):
        print(f"\n🔄 引き継ぎ ({len(analysis['new_handovers'])}件):")
        for h in analysis["new_handovers"]:
            print(f"  - {h['content']} → {h['to']}")

    print(f"{'='*50}")

    if args.dry_run:
        print("(--dry-run: Notionは更新されていません)")
        return

    # 5. Notion更新
    jst = timezone(timedelta(hours=9))
    today = datetime.now(jst).strftime("%Y-%m-%d")
    print("\nNotionを更新中...")

    # Daily progress
    daily_summary = analysis.get("daily_summary", "")
    detail_parts = []
    for u in analysis.get("task_updates", []):
        if u.get("memo_append"):
            detail_parts.append(f"・{u['title']}: {u['memo_append']}")
    for d in analysis.get("new_decisions", []):
        detail_parts.append(f"・[判断] {d['title']}")
    for h in analysis.get("new_handovers", []):
        detail_parts.append(f"・[→{h['to']}] {h['content']}")
    detail_memo = "\n".join(detail_parts) if detail_parts else daily_summary

    result = post_daily_progress(today, daily_summary, detail_memo)
    print(f"  ✓ 日次進捗 ({result})")

    # Task updates
    for u in analysis.get("task_updates", []):
        matching = [t for t in tasks if t["title"] == u["title"]]
        if matching:
            t = matching[0]
            if u.get("new_status"):
                update_task_status(t["id"], u["new_status"])
                print(f"  ✓ {t['title']} → {u['new_status']}")
            if u.get("memo_append"):
                existing = t["memo"]
                new_memo = f"{existing}\n{u['memo_append']}" if existing else u["memo_append"]
                update_task_memo(t["id"], new_memo)

    # New decisions
    for d in analysis.get("new_decisions", []):
        add_decision(d["title"], d["category"], d["reason"], d.get("status", "仮決定"))
        print(f"  ✓ 意思決定: {d['title']}")

    # New handovers
    for h in analysis.get("new_handovers", []):
        add_handover(h["content"], MEMBER_NAME, h["to"], h["kind"], h["detail"])
        print(f"  ✓ 引き継ぎ: {h['content']} → {h['to']}")

    # 6. Weekly summary (Sunday or --weekly flag)
    jst = timezone(timedelta(hours=9))
    if args.weekly or datetime.now(jst).weekday() == 6:  # Sunday
        print("\n週次サマリーを生成中...")
        generate_weekly_summary()

    print("\n完了!")


if __name__ == "__main__":
    main()
