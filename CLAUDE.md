# 3rd Place Webサイト — CLAUDE.md

## 📘 事業コンテキストが必要なとき
このファイルは **Webサイト/アプリのコード規約** に特化している。
ビジネスモデル・法務NGワード・KPI・チーム体制・サービス設計など **事業全体の前提** が必要な相談（LPコピー・SNS案・サービス改善提案等）では、先に別リポの `3rd_place_private/docs/3rdplace-core.md`（3rd Place コアナレッジベース v3.0）を参照すること。ローカルでは `../3rd_place_private/docs/3rdplace-core.md` に配置されている想定。

## 🚦 作業ルール（このリポで作業する全員・全エージェント必読）

複数人がそれぞれの Claude Code で編集する。人間向けの図解つき手順書は `docs/operations/onboarding.md`。
以下はエージェントが **毎回必ず守る** ルール。迷ったら作業を止めて作業者に聞く。

### 作業の手順（この順番を飛ばさない）
1. **最新化してブランチを切る**: `git fetch origin main` → `git switch -c <種類>/<内容> origin/main`
   - 種類: `content/`（文言・日程・写真） `feat/`（機能追加） `fix/`（修正） `docs/`（文書）
   - 今いるブランチに作業中の変更がある場合は、勝手に stash / 破棄せず作業者に確認する
   - **既存の PR を直す場合は新しいブランチを作らない**: その PR のブランチに `git switch` → `git pull` してから作業し、同じブランチに push する（PR に自動で追加される）
2. **計画を伝えて合意を取る**: 「どのファイルの、どこを、どう変えるか」を作業者に日本語で説明し、OK をもらってから編集する
3. **編集する**: 下の「禁止事項」と、このファイルのデザインルール・多言語ルールに従う
4. **ビルド確認**: dev サーバーを止めてから `npm run build` を実行し、成功を確認する。失敗したら直してから次へ
5. **差分を見せる**: `git status` と `git diff` の要点を作業者に説明し、OK をもらう
6. **コミット**: ファイル名を指定して `git add <ファイル>`（`git add .` / `-A` は使わない）→ `git commit`
7. **push と PR 作成**: `git push -u origin <ブランチ>` → `gh pr create --base main`。PR 本文に「何を・なぜ・確認したこと」を書き、PR の URL を作業者に返す
8. **マージは人間がする**: エージェントは PR をマージしない。別の人の承認後、GitHub 上で人間がマージする
   - 承認後に追加で push すると承認は自動で取り消される。もう一度承認が必要なことを作業者に伝える

### 禁止事項
| 禁止 | 理由 |
|---|---|
| `main` で直接作業・commit・push する | main は本番の元。管理者を含め全員、承認済み PR 以外では main に入れられない設定になっている |
| `git push --force` / `git reset --hard` / `git clean` / `git branch -D` | 自分や他人の作業が消えて戻せなくなる |
| `gh pr merge` など、承認前に main へ取り込む操作 | 他の人の確認を飛ばして本番に出てしまう |
| 個人情報（名前・連絡先・写真の出どころ等）、`.env`、APIキーを読む／コミットする | このリポは **公開リポジトリ**。コミットした内容は世界中から見え、履歴にも残る |
| 作業者の合意なしに `package.json`（依存追加）・`lib/site.ts` の `FEATURE_FLAGS`・`next.config.mjs`・`.claude/`・`.github/`・Vercel 設定を変える | サイト全体や公開範囲、他の人の作業環境に影響する |
| npm scripts や `scripts/` に `rm -rf`・`lsof` などの Mac/Linux 専用コマンドを書く | 編集メンバーに Windows ユーザーがいる。Mac/Windows 両方で動く Node.js スクリプトで書く |
| フック（`.claude/hooks/guard-git.mjs`）に止められた操作を、別の書き方で再実行する | フックは上の禁止事項を機械的に止めている。止められたら回避せず、作業者に理由を報告する |
| `/hub` や Hub 関連セクションを復元する | 運営判断で非公開中（下の「ページ構成」参照） |
| `out/` `.next/` を直接編集する | build で自動生成されるため、次の build で消える |
| 頼まれていないファイルの「ついで修正」 | 他の人の作業と衝突する。気づいた点は報告だけする |

### 作業を止めて作業者に聞くとき
- 頼まれた変更が上の禁止事項に触れそうなとき
- `npm run build` のエラーが、自分が触っていないファイルで出ているとき
- `git pull` / `git rebase` でコンフリクトが出たとき
- 公開して問題ない情報か判断できないとき（`docs/operations/public-repo-policy.md`）

## プロジェクト概要
メルボルンの日系コミュニティ「3rd Place」の公式Webサイト。Next.js 14 App Router + Tailwind CSS + TypeScript。静的エクスポート。

## 技術スタック
- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS（カスタムトークン定義済み）

## 運用前提
- このリポジトリは公開前提で運用する
- 個人情報、社内メモ、作業ログ、未公開資料はコミットしない
- 公開運用ルールと後で棚卸しする資料は `docs/operations/public-repo-policy.md` を参照する

## デザイントークン（tailwind.config.ts）
```
colors: navy, navy-light, orange, orange-dark, cream, cream-dark, ink
fontFamily:
  sans: ['Noto Sans JP', 'Inter', 'sans-serif']
  heading: ['Noto Serif JP', 'Inter', 'serif']
```
- **hex直書き禁止** — 必ずトークン名（`text-navy`, `bg-orange`等）を使う
- **opacity**: 標準スケール（/5, /10, /15...）を使う。`/6`, `/8` 等の非標準値は避ける

## ページ構成
| パス | 内容 |
|------|------|
| `/` (app/page.tsx) | トップページ — Hero, Stats, About, Founder, Gallery, Team, FAQ, Final CTA, Footer |
| `/japan` (app/japan/page.tsx) | 3rd Place Japan — 東京での月1イベント（¥1,000） |

> **⚠️ 3rd Place Hub は現在非公開（2026-04-14〜）**
> 運営判断により `/hub` ページおよびHub関連セクションは全てサイトから削除済み。サイト上には「渡航サポートサービス開発中・LINEグループで随時公開予定」の一言のみ残している。サービス内容が確定するまで復元しないこと。アーカイブは `docs/hub-archive/` に保存（hub-page.tsx.txt / README.md）。

## 共通コンポーネント
| コンポーネント | 用途 |
|--------------|------|
| `components/Navbar.tsx` | **全2ページ共通**の統一ナビバー。propsの`page`（melbourne / japan）でページ判定。ドロップダウン式サブメニュー付き。トップページは透明→白スクロール変化、Japanは常時白 |
| `components/SubFooter.tsx` | Japan用フッター（bg-ink、トップへの戻りリンク付き） |
| `components/FAQ.tsx` | FAQ アコーディオン（全ページ共通で使う） |
| `components/GallerySection.tsx` | トップページのギャラリー。カテゴリ別セクション（カレー会：横スクロール、特別イベント：4列グリッド、ワークショップ：2列グリッド） |
| `components/ScrollReveal.tsx` | スクロール時のフェードインアニメーション（IntersectionObserver） |

## 多言語対応
- `useState<Lang>('ja')` + `const s = (ja, en, l) => l === 'ja' ? ja : en` ヘルパー
- **`s()` は必ず3引数（ja, en, l）で呼ぶ** — 2引数だとTypeScriptビルドエラーになる

## デザインルール
- **SVGアイコンのみ** — 絵文字をUIアイコンとして使わない（国旗絵文字はコンテンツ表示として許容）
- **cursor-pointer** — 全クリッカブル要素に付与
- **transition-colors duration-200** — ホバー効果のトランジションに一貫して使用
- **font-heading** — 見出し（h1, h2, h3）に使用。本文はデフォルトsans
- **テキストコントラスト** — ミュートテキストは `text-slate-600` 以上を確保

## エージェントレビューシステム
`agents/` ディレクトリに6体のレビューエージェント定義がある。
- agent1: 日本在住・渡航検討者ペルソナ
- agent2: メルボルン在住・未参加者ペルソナ
- agent3: 既存メンバー・未参加者ペルソナ
- agent4: 信頼構築チェッカー
- agent5: 行動導線チェッカー
- agent6: デザイン品質レビュアー
- orchestrator.md: 統合レポートフォーマット
- report.md: 最新のレビュー結果

**使い方**: 「サイトをレビューして」で6エージェントを並列実行 → 統合レポートを `agents/report.md` に出力

## 関連リポジトリ
- **Hub App**: `dz21106-web/3rd_place_hub`（Private, Vercelデプロイ） — 単体HTMLアプリ。このリポには含めない
- **運営内部資料**: `3rd_place_private`（Private） — ビジネスモデル、戦略、個人情報等

## イベント写真（public/images/events/）
| カテゴリ | パス | 枚数 |
|---------|------|------|
| カレー会 | `curry/` | 18枚（curry3〜curry19, curry-food） |
| 特別イベント | `special/` | 8枚（bbq, cafe, christmas, drive, nabe1-2, newyear1-2） |
| ワークショップ | `workshop/` | 4枚（udon1-2, ikebana1-2） |
| Japan用 | `../japan/` | 5枚（japan-event1/2/4, farewell-new1/2） |

※ `events/` 直下にも旧写真あり（curry1-8, bbq, cafe, nabe, curry2）— GallerySectionはサブフォルダを参照

## 参加申込フロー
- **Melbourne CTA**: `EXTERNAL_LINKS.melbourneApplyForm`（`https://forms.gle/RTyR2oJR8jB6dC3z9`）。全CTAがこのGoogleフォーム直結。
- **Japan CTA**: `EXTERNAL_LINKS.japanApplyForm`（Japan側の既存フォーム）。
- **フロー**: サイトCTA → 参加申請フォーム回答 → 運営が内容を確認（スクリーニング目的） → 承認後、運営がコミュニティLINEグループへ招待。
- **フォーム内にLINE友だち追加URL欄が必須項目**として含まれており、運営はその情報を使って個人LINEで招待を送る。
- 公式LINEアカウント（`lin.ee/U8PVapG`）は告知配信用に運用継続中だが、**サイトCTAからは外している**（スクリーニング経由に一本化するため）。

## 保留事項（実装しないでおくもの）
- **Hub のダミーテスティモニアル**: 実際の参加者の声が集まるまで置き換えない
- **GitHub Pages デプロイ**: 未実施

---

## 改善実装履歴

### 第2回レビュー改善（2026-04-06）
- 中間セクション（Founder/Gallery末尾）にインラインCTA追加
- 「初参加でも大丈夫」メッセージ + カレー会タイムラインをGallery内に追加
- ヒーロー「日本から〜」リンクをピルボタン化（視認性向上）
- FAQ.tsx / Navbar.tsx のハードコード色をトークンに統一
- Hub のインラインFAQ → FAQSection コンポーネントに統一
- SubNavbar にモバイルハンバーガーメニュー追加
- Navbar: ロゴを `<Link href="/">`、h-16統一、Japan→「東京イベント」Hub→「渡航サポート」ラベル改善
- Hub ヒーローに「開発中」バッジ追加 + CTA文言を「LINEで通知を受け取る」に変更
- CTAボタンに hover:-translate-y-0.5 hover:shadow-lg マイクロインタラクション
- コピーライト年 2025→2026

### 第4回レビュー改善（2026-04-13）
- **ギャラリー全面リニューアル**: タブ式→カテゴリ別セクション（カレー会横スクロール＋特別イベント4列グリッド＋ワークショップ2列グリッド）。初参加バッジ・リクエスト歓迎メッセージ付き
- **イベント写真30枚追加**: curry/18枚、special/8枚、workshop/4枚をpublic/images/events/に整理
- **Japan/Hub Hero演出強化**: グロー効果（bg-orange/10 blur-[100px]）＋フェードイン・フェードアップアニメーション追加
- **Hub→Japan導線追加**: Hub Final CTAの2ボタン目を「東京イベントはこちら →」（/japanリンク）に変更
- **FAQ追加**: 「初めてで一人でも大丈夫？」をトップページFAQの最初に追加
- **globals.css**: `.scrollbar-hide` ユーティリティ追加（横スクロール用）

### ナビバー統一（2026-04-13）
- **SubNavbar廃止** → Navbar.tsxにドロップダウン式メニューを統合
- propsの`page`（melbourne / japan）でページ判定
- 2タブ構成: コミュニティ / 東京イベント
- ホバーでサブメニュー表示（デスクトップ）、アコーディオン式（モバイル）
- ページごとにCTAボタン文言が変化（参加する / 申し込む）

### Hub非公開化 & リポ分離（2026-04-14〜2026-04-21）
- `/hub` ページと関連セクションをサイトから削除（`app/hub/page.tsx` は feature flag で404返却のみ）
- Hub Appの実装は別リポ `dz21106-web/3rd_place_hub` に分離
- 運営内部資料は別リポ `dz21106-web/3rd_place_private` に分離

### 参加申込フロー刷新（2026-04-23）
- **CTA差し替え**: MelbourneサイトのCTAを公式LINE（`lin.ee/U8PVapG`）→ 参加申請フォーム（`forms.gle/RTyR2oJR8jB6dC3z9`）に全面変更
- `EXTERNAL_LINKS.lineGroup` を `EXTERNAL_LINKS.melbourneApplyForm` にリネーム（`lib/site.ts`）
- Hero/次回カレー会バナー/はじめかたStep1/Melbourneカード/Heading to Melbourneカードの計5箇所のCTAボタンコピーを「LINEを追加」系→「参加を申し込む」系に統一
- FAQとMelbourneカードの説明文を新フロー（フォーム回答 → 運営が確認 → LINEグループ招待）に書き換え
- 運用: フォームに「LINE友だち追加URL」必須欄を設置。運営がフォーム内容でスクリーニング後、個人LINEからグループに招待
- 公式LINEは廃止せず、告知配信専用として運用継続（サイトCTAからは外す）

## Git履歴
```
a781b90 ナビバーを3ページ共通のドロップダウン式に統一
f3e4886 第4回レビュー実施 & ギャラリー全面リニューアル + 3ページ演出統一
5639392 第3回レビュー実施 & 改善実装（S-1〜S-3 + 競合分析）
442b29a Add Instagram and Facebook links to all footers
fb7f443 Initial commit (Clean)
```
