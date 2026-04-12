# 3rd Place Webサイト — CLAUDE.md

## プロジェクト概要
メルボルンの日本人コミュニティ「3rd Place」の公式Webサイト。Next.js 14 App Router + Tailwind CSS + TypeScript。静的エクスポート。

## 技術スタック
- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS（カスタムトークン定義済み）

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
| `/japan` (app/japan/page.tsx) | 3rd Place Japan — 東京での月1イベント（¥500） |
| `/hub` (app/hub/page.tsx) | 3rd Place Hub — 有料渡航サポートパッケージ（A$150〜200、**現在開発中**） |

## 共通コンポーネント
| コンポーネント | 用途 |
|--------------|------|
| `components/Navbar.tsx` | トップページ用ナビバー（透明→白のスクロール変化） |
| `components/SubNavbar.tsx` | Japan/Hub用ナビバー（常時白、モバイルハンバーガーメニューあり） |
| `components/SubFooter.tsx` | Japan/Hub用フッター（bg-ink、クロスリンク付き） |
| `components/FAQ.tsx` | FAQ アコーディオン（全ページ共通で使う。hub独自実装はNG） |

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

## Hub App エージェントレビューシステム
`agents/hub-app/` ディレクトリに6体のエージェント（品質3＋改善3）定義がある。
**品質レビュー（現状評価）**
- agent1: UX & デザインレビュアー
- agent2: データ＆コンテンツレビュアー
- agent3: 購入者体験シミュレーター
**改善提案（次にやること）**
- agent4: デザイン改善エージェント（ui-ux-pro-max使用）
- agent5: コンテンツ強化エージェント
- agent6: 機能アイデアジェネレーター
- orchestrator.md: 統合レポートフォーマット
- report.md: 最新のレビュー結果

**使い方**: 「Hub appをレビューして」で6エージェントを並列実行 → 統合レポートを `agents/hub-app/report.md` に出力

## 保留事項（実装しないでおくもの）
- **CTA の LINE URL**: 現在 `https://line.me` はプレースホルダー。本番URLが決まるまで変更不要
- **Hub のダミーテスティモニアル**: 実際の参加者の声が集まるまで置き換えない
- **GitHub Pages デプロイ**: 未実施

---

## プロジェクト2: 3rd Place Hub（単体HTMLアプリ）

### ファイル構成
```
hub-app/
  3rdplace_app.html   ← メインアプリ（HTML + CSS + JS 全て1ファイル）
  logo.png            ← 3rd Placeロゴ（ヘッダーに表示）
```

### アーキテクチャ
- **単体HTMLファイル**（バックエンドなし・サーバーなし）
- **データ保存**: localStorage のみ（他ユーザーとの共有不可 → Phase 2 以降でSupabase等に移行予定）
- **外部ライブラリ**: Leaflet.js 1.9.4（地図）・Font Awesome 6.5.0（アイコン）
- **現状**: プロトタイプ・デモ用途。複数人が使えるWebサービスにするには別途バックエンドが必要

### CSSデザイントークン（CSS変数）
```css
--navy: #1B2D5B      /* メインカラー */
--coral: #E8583A     /* アクセント・CTA */
--amber: #E8A838     /* 警告・ハイライト */
--sage: #4A7A58      /* 緑・引き継ぐ系 */
--bg: #F5F1ED        /* 背景 */
--surface: #FFFFFF   /* カード背景 */
--text: #1A0E06      /* 本文 */
--text-2: #7A6858    /* サブテキスト */
--text-3: #B0A090    /* ミュートテキスト */
--border: #EAE0D6    /* ボーダー */
--fresh: #4A7A58     /* 鮮度タグ：確認済み（3ヶ月以内） */
--stale: #C4B8A8     /* 鮮度タグ：要確認（3〜6ヶ月） */
--old: #D4A574       /* 鮮度タグ：古い可能性（6ヶ月以上） */
```

### タブ構成（4タブ）
| タブ | ID | 内容 |
|------|-----|------|
| はじめに | sectionGuide | 使い方・できること・無料 vs パッケージ |
| 知る | sectionLearn | 業界別ガイド（集合知）・週1 Zoomイベント一覧 |
| 探す | sectionExplore | 職場・住居の一覧/地図・フィルター検索 |
| 引き継ぐ | sectionHandover | 引き継ぎノート投稿フォーム・キャッシュバック説明 |

### 実装済み主要機能
- 業界別ガイド（カフェ・ジャパレス・クリーニング・マッサージ）
- 職場・住居カード一覧 + 地図表示（Leaflet）
- フィルター検索（住居：家賃・最低滞在期間・部屋タイプ等 / 仕事：業種・時給・シフト時間帯等）
- お気に入り機能（localStorage）
- 情報鮮度システム（lastUpdated → fresh/stale/old の3段階）
- プログレッシブブラー（引き継ぎノートのロック表示）
- アプリ内投稿フォーム（5ステップ・職場/住居）
- 同意チェックボックス（投稿フォームStep 5）
- 管理パネル（申請レビュー・承認/却下）
- 週1 Zoomイベント一覧

### データ設計
```javascript
housingData[]   // 住居データ（localStorage: '3p_housing'）
jobData[]       // 仕事データ（localStorage: '3p_jobs'）
pendingSubmissions[]  // 承認待ち申請（localStorage: '3p_pending'）
favorites       // お気に入りID Set（localStorage: '3p_favs'）
```

**住居データの主要フィールド**: id / status / type / area / address / rent / roomType / addressVisibility / billsIncluded / wifiIncluded / furnished / jpHousemate / minStay / lastUpdated / lockedOwnerTips / lockedHousemateTips / lockedFirstWeek

**仕事データの主要フィールド**: id / status / name / industry / area / hourlyPay / payRange / shift / shiftTime / shiftFreq / englishLevel / mealsProvided / weekendOff / lastUpdated / ownerPersonality / firstWeekTips / warnings

### 段階的情報開示の方針
| 情報 | 無料 | 有料（パッケージ） |
|------|------|-----------------|
| 職場カード/モーダル | 業種＋エリアのみ（例：カフェ（CBD））| 店名・引き継ぎノート全文 |
| 住居カード/モーダル | エリア＋投稿者が選んだ住所範囲 | 引き継ぎノート全文 |

住所公開範囲は投稿者が選択：`area`（エリアのみ）/ `street`（大通り名まで）/ `building`（建物名まで）。部屋番号は非公開固定。

### 重要な設計判断
- **求人斡旋はしない**: 「情報・武器・繋がり」の提供のみ。マッチング確約・トライアル確約という言葉は使わない
- **カレー会は永続無料**: 有料化提案は絶対NG
- **口コミサイト化しない**: 店舗名指し批判は運営が削除。「Facebookの延長線上くらいのライトな気持ち」
- **情報提供者はメンバー限定**: 外部開放すると信頼性がゼロになる
- **第三者のプライバシー**: オーナー・ルームメイト情報を含むため、弁護士確認予定。フォームに「個人特定情報を含まない」旨の同意チェックあり

### 開発ルール（重要）
- **実装前に必ず内容をまとめてユーザーの許可を取ること**
- hex直書き禁止 → 必ずCSS変数（`var(--navy)`等）を使う
- 絵文字をUIアイコンとして使わない → Font Awesome アイコンを使う
- 新しいフィールドを追加する場合、既存データへのデフォルト値設定も忘れずに行う

---

## 直近の改善実装履歴（2026-04-06）
レポート第2回の改善1〜8を全て実装済み:
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
