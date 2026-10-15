# 3rd Place Webサイト — CLAUDE.md

## 📘 事業コンテキストが必要なとき
このファイルは **Webサイト/アプリのコード規約** に特化している。
ビジネスモデル・法務NGワード・KPI・チーム体制・サービス設計など **事業全体の前提** が必要な相談（LPコピー・SNS案・サービス改善提案等）では、先に別リポの `3rd_place_private/docs/3rdplace-core.md`（3rd Place コアナレッジベース v3.0）を参照すること。ローカルでは `../3rd_place_private/docs/3rdplace-core.md` に配置されている想定。

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
| `/` (app/page.tsx → app/HomePageClient.tsx) | トップページ — Hero（フライヤー6枚 + Instagram / TikTok）, 01 目的, 02 どんな人がいる？, 03 参加者の声, 04 3rdPlace hub（特長3つ + 登録の流れ）, 05 創設者の想い, 06 FAQ, 07 Join Us, Footer。背景は cream / sumi / orange をスクロールで切り替え |
| `/japan` (app/japan/page.tsx) | 3rd Place Japan — 東京での月1イベント（¥1,000）。HUB導線の対象外（従来のフォームのまま）。東京イベントは現在休止中で、トップからはリンクしていない（旧デザインのまま。整理は別PR） |

> **HUB（コミュニティアプリ）への一本化（2026-10〜）**
> WEBの役割は「3rd Placeの目的と、どんな人がいるかを事前に知ってもらい、HUBへ送る」こと。イベントは目的ではなく「つながるきっかけ」として見せる。
> - HUB: `EXTERNAL_LINKS.hub`（https://3rd-place-hub.vercel.app/）。Melbourne の参加CTAはすべてここ。
> - 「どんな人がいる？」は属性（ワーホリ・留学・駐在・永住者）だけ。個人の趣味・関心ごとは HUB の自己紹介の役割。
> - イベント日程はWEBに載せず HUB に任せる（`EventsSection` などは削除済み。`lib/events.ts` はデータだけ残っている）。
> - 旧「渡航サポートとしての Hub」ページ（`/hub`、`FEATURE_FLAGS.hubPublic`）は引き続き非公開。アーカイブは `docs/hub-archive/`。

## 共通コンポーネント
| コンポーネント | 用途 |
|--------------|------|
| `components/SiteMenu.tsx` | トップの右上の三本線メニュー（目次・hub への登録ボタン・SNS） |
| `components/SlideUpText.tsx` | 見出しの文字が1文字（1単語）ずつ下からせり上がる演出（ヒーロー） |
| `components/SmoothScroll.tsx` | なめらかスクロール（`lenis`）。トップだけで使う |
| `components/motion/FloatingPhoto.tsx` | ヒーローで浮かびながら流れるフライヤー写真 |
| `components/motion/ScrollPhotoRow.tsx` | 「どんな人がいる？」で横に流れる写真の帯 |
| `components/motion/StickyPhoneSteps.tsx` | hub のアプリ画面を固定し、スクロールに合わせてスマホ本体ごと各特長の部分へズームする。1ステップのスクロール量は `STEP_SCROLL` |
| `components/Navbar.tsx` | `/japan` のナビバー（トップは HomePageClient 内のヘッダー + SiteMenu） |
| `components/SubFooter.tsx` | Japan用フッター（bg-ink、トップへの戻りリンク付き） |
| `components/FAQ.tsx` | FAQ アコーディオン（トップ・Japan 共通） |
| `components/ScrollReveal.tsx` | スクロール時のフェードインアニメーション（IntersectionObserver） |

### トップページ（`.design-a`）の文字のルール
- 地の文字は「白 + 黒フチ」（`app/globals.css` の `.design-a` の text-shadow）
- セクションの頭は `SectionLabel`（丸い番号 + オレンジの英語 + 線）+ 日本語の大見出し。**全セクション左詰め**
- 見出しは `font-heading font-bold`（明朝体）。本文は `.body-text`（普通の太さ・フチなし。地がオレンジ / クリームのときは墨色）
- クリームの地の見出しは墨色・フチなし（明朝体の細い線にフチを付けると中が抜けて見えるため）
- iPhone ではタップ後も hover の色が残るので、必要なボタンは `[@media(hover:hover)]:hover:` と `active:` を使い分ける

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

※ `events/` 直下にも旧写真あり（curry1-8, bbq, cafe, nabe, curry2）。ヒーローのフライヤーは `events/flyers/`、トップの「目的」の写真はリンクのサムネイル（OGP）と同じ `curry/curry12.jpg`

## 参加申込フロー
- **Melbourne CTA**: `EXTERNAL_LINKS.hub`。フロー: SNS → WEB → hub に LINE でログイン → かんたんな質問に答える（自己紹介を含む）→ 運営が確認 → hub の全機能が使えるようになり、コミュニティの LINE グループにも招待される。hub のスタート画面（`3rd_place_hub` の `js/features/onboarding.js`）の3ステップと文言をそろえる
- 旧Googleフォーム（`melbourneApplyForm`）は廃止。フォームの質問はHUB登録時の確認事項に移植済みで、スクリーニングはHUBの自己紹介で行う。
- **Japan CTA**: `EXTERNAL_LINKS.japanApplyForm`（Japan側の既存フォーム、変更なし）。

## 保留事項（実装しないでおくもの）
- **hub のメンバー・家探しページのスクリーンショット**: 用意できたら、ズーム後にそのページの画面へ切り替える演出を追加する（`StickyPhoneSteps`）
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

### トップページを新デザインに置き換え（2026-10-15, PR #18）
- 試作 `/design-a` を `/` に置き換え（`app/design-a/` は削除）。参加CTAはすべて 3rdPlace hub へ
- hub セクション: 特長3つ（気の合う仲間が見つかる / メルボルンのリアルがわかる / イベントにすぐ参加）をアプリ画面のズームで説明 + 登録の流れ3ステップ（hub のスタート画面とそろえる）
- 項目名を大きく（丸い番号 + オレンジの英語 + 線）して全セクション左詰め。見出しは明朝体、本文はフチなし
- ヒーロー: Instagram と TikTok のボタン、スマホでもフライヤー6枚を表示
- 旧トップ専用の部品（GallerySection / Lightbox / EventsSection / EventCard / EventDetailModal）と、使わなくなった演出（ScaleReveal / HorizontalGallery / HoverImageList）・動画を削除

## Git履歴
```
a781b90 ナビバーを3ページ共通のドロップダウン式に統一
f3e4886 第4回レビュー実施 & ギャラリー全面リニューアル + 3ページ演出統一
5639392 第3回レビュー実施 & 改善実装（S-1〜S-3 + 競合分析）
442b29a Add Instagram and Facebook links to all footers
fb7f443 Initial commit (Clean)
```
