# 3rd Place 運用ランブック

最終更新: 2026-04-13

## 目的
このドキュメントは、Webサイト公開時の運用ルールを統一するための手順書です。

## 単一の設定ファイル
- 外部リンクと公開フラグは `lib/site.ts` で管理する。
- ページやコンポーネントに URL を直書きしない。

## 外部リンク運用
`lib/site.ts` の `EXTERNAL_LINKS` を更新する。

- `lineGroup`: LINEグループURL
- `instagram`: Instagram URL
- `facebook`: Facebook URL
- `japanApplyForm`: Japan申込フォームURL

変更手順:
1. `lib/site.ts` を修正
2. `npm run build` を実行
3. 対象ページでリンク遷移を確認

補足:
- Instagram/Facebook は未ログイン時に閲覧制限やログイン画面へ遷移する場合がある。
- 主要導線は LINE を維持し、SNS は補助導線として扱う。

## 公開フラグ運用
`lib/site.ts` の `FEATURE_FLAGS` を使って公開状態を切り替える。

- `hubPublic`
  - `false`: `/hub` は 404（非公開）。ビルド後に `out/hub.html` / `out/hub.txt` も自動削除する
  - `true`: `/hub` を公開
- `japanFormPublic`
  - `false`: JapanページCTAは Instagram誘導
  - `true`: JapanページCTAは Google Form誘導

## よくある変更
- Hubを公開する: `hubPublic: true`
- フォーム導線を有効にする: `japanFormPublic: true`
- SNSリンク更新: `EXTERNAL_LINKS` のみ修正

## Git運用ルール
- `main` への直pushは禁止
- 必ず作業ブランチを切ってPR経由で反映する
- ブランチ命名例:
  - `feat/...`
  - `fix/...`
  - `chore/...`

## 注意
- `out/` はビルド生成物。直接編集しない。
- 変更後は必ず `npm run build` を通す。
