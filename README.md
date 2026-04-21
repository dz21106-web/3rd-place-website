# 3rd Place Website

## セットアップ
```bash
npm install
```

## 開発サーバー
```bash
npm run dev
```

## ビルド
```bash
npm run build
```

## 仕様書と運用ドキュメント
- 仕様書: `CLAUDE.md`
- 運用メモ: `docs/operations/runbook.md`
- リリースチェック: `docs/operations/release-checklist.md`
- リンク方針: `docs/operations/link-policy.md`

## 重要な運用ポイント
- 外部リンクと公開フラグは `lib/site.ts` で一元管理
- `/hub` は現在非公開。`app/hub/page.tsx` が feature flag で判定し、無効時は404を返す
- Hub Appの実装は別リポ（`dz21106-web/3rd_place_hub`）で管理
- `main` 直pushは禁止。作業ブランチを切ってPRで反映する
- 作業開始前とPR前に `git fetch origin main` を実行し、最新の `origin/main` を確認する

## 公開リポジトリ運用
- このリポジトリは公開前提で扱う
- 個人情報、社内メモ、作業ログ、未公開資料はコミットしない
- 非公開資料は `docs/private/` または外部ストレージで管理する
- 詳細ルールは `docs/operations/public-repo-policy.md` を参照

## GitHub CLI と自動PR作成
- `gh` ローカル導入: `npm run gh:install`
- この環境では `gh` をローカル配置で利用: `.tools/gh/bin/gh`
- 初回のみ認証: `.tools/gh/bin/gh auth login`
- PR自動作成: `npm run pr:create`
- 既定のベースブランチは `main`。変更する場合は `BASE_BRANCH=develop npm run pr:create`
