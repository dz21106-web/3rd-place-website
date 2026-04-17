# リンク運用ポリシー

最終更新: 2026-04-13

## 原則
- 外部リンクは `lib/site.ts` の `EXTERNAL_LINKS` だけで管理する。
- `app/` と `components/` に URL 直書きをしない。
- LINE を主要導線、Instagram/Facebook を補助導線として扱う。

## 例外
- 外部フォント読み込み（`app/globals.css`）は例外として許可。
- 例外を増やす場合はこのファイルに追記する。

## 更新ルール
1. URL変更は `lib/site.ts` のみ更新
2. 変更理由をPR説明に記載
3. `npm run build` 実行
4. 主要リンク動作確認

## フラグと連動する導線
- `hubPublic`: `/hub` の公開状態とHub導線表示を制御
- `japanFormPublic`: Japan CTAの Form/Instagram 表示を制御

## SNSリンクの注意
- Instagram/Facebook は未ログイン時にログイン画面へ遷移する場合がある。
- SNS導線の近くに「ログインが必要な場合あり」の注意文を表示する。
