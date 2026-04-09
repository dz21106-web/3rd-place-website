#!/bin/bash
# Claude Code 日報 → Notion 自動投稿セットアップ
# 各メンバーが自分のマシンで1回実行する

set -e

echo "=== Claude Code 日報 自動セットアップ ==="
echo ""

# 1. メンバー名の入力
read -p "あなたの名前を入力してください: " MEMBER_NAME
if [ -z "$MEMBER_NAME" ]; then
    echo "エラー: 名前を入力してください"
    exit 1
fi

# 2. Notion トークン（.env ファイルから読み込み、なければ入力を求める）
ENV_FILE="$(cd "$(dirname "$0")/.." && pwd)/.env"
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
fi

if [ -z "$NOTION_TOKEN" ]; then
    read -p "NOTION_TOKEN を入力してください: " NOTION_TOKEN
fi
if [ -z "$NOTION_DB_ID" ]; then
    read -p "NOTION_DB_ID を入力してください: " NOTION_DB_ID
fi

# 3. Anthropic API Key (optional)
echo ""
echo "Claude APIキーがあるとAIサマリーが生成されます（なくても動きます）"
read -p "ANTHROPIC_API_KEY (なければEnter): " ANTHROPIC_KEY

# 4. pip install anthropic (if key provided)
if [ -n "$ANTHROPIC_KEY" ]; then
    echo "anthropic パッケージをインストール中..."
    pip3 install anthropic 2>/dev/null || pip install anthropic 2>/dev/null || true
fi

# 5. 環境変数をシェル設定に追加
SHELL_RC="$HOME/.zshrc"
if [ -f "$HOME/.bashrc" ] && [ ! -f "$HOME/.zshrc" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

echo "" >> "$SHELL_RC"
echo "# Claude Code 日報 → Notion" >> "$SHELL_RC"
echo "export NOTION_TOKEN=\"$NOTION_TOKEN\"" >> "$SHELL_RC"
echo "export NOTION_DB_ID=\"$NOTION_DB_ID\"" >> "$SHELL_RC"
echo "export MEMBER_NAME=\"$MEMBER_NAME\"" >> "$SHELL_RC"
if [ -n "$ANTHROPIC_KEY" ]; then
    echo "export ANTHROPIC_API_KEY=\"$ANTHROPIC_KEY\"" >> "$SHELL_RC"
fi

echo ""
echo "環境変数を $SHELL_RC に追加しました"

# 6. スクリプトのパスを取得
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT_PATH="$SCRIPT_DIR/daily_report_notion.py"

# 7. macOS LaunchAgent で毎日自動実行（23:50 JST = 14:50 UTC）
PLIST_PATH="$HOME/Library/LaunchAgents/com.3rdplace.daily-report.plist"
mkdir -p "$HOME/Library/LaunchAgents"

cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.3rdplace.daily-report</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>$SCRIPT_PATH</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>NOTION_TOKEN</key>
        <string>$NOTION_TOKEN</string>
        <key>NOTION_DB_ID</key>
        <string>$NOTION_DB_ID</string>
        <key>MEMBER_NAME</key>
        <string>$MEMBER_NAME</string>
EOF

if [ -n "$ANTHROPIC_KEY" ]; then
cat >> "$PLIST_PATH" << EOF
        <key>ANTHROPIC_API_KEY</key>
        <string>$ANTHROPIC_KEY</string>
EOF
fi

cat >> "$PLIST_PATH" << EOF
    </dict>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>3</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardOutPath</key>
    <string>$HOME/.claude/daily-report.log</string>
    <key>StandardErrorPath</key>
    <string>$HOME/.claude/daily-report-error.log</string>
</dict>
</plist>
EOF

# LaunchAgent を登録
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo ""
echo "=== セットアップ完了 ==="
echo ""
echo "設定内容:"
echo "  メンバー名: $MEMBER_NAME"
echo "  自動実行: 毎日 3:00 + PC起動時（重複投稿なし）"
echo "  ログ: ~/.claude/daily-report.log"
echo ""
echo "手動で実行する場合:"
echo "  python3 $SCRIPT_PATH"
echo ""
echo "テスト実行 (投稿せず確認):"
echo "  python3 $SCRIPT_PATH --dry-run"
echo ""
echo "自動実行を停止する場合:"
echo "  launchctl unload $PLIST_PATH"
