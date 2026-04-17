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
- `/hub` は `app/hub/page.tsx` で公開判定し、実体は `app/hub/HubPageClient.tsx`
- `main` 直pushは禁止。作業ブランチを切ってPRで反映する
