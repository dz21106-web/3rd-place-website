# リリース前チェックリスト

最終更新: 2026-04-13

## 1. 設定確認
- [ ] `lib/site.ts` の `EXTERNAL_LINKS` が最新
- [ ] `hubPublic` が意図した値
- [ ] `japanFormPublic` が意図した値

## 2. 画面確認
- [ ] トップ `/` で主要CTAが正しく遷移
- [ ] `/japan` のCTAが意図どおり（Form or Instagram）
- [ ] `hubPublic: false` の場合、`/hub` が404表示
- [ ] ナビ/フッターに不要なHub導線が出ていない
- [ ] SNS補助導線の注意文（ログインが必要な場合あり）が表示されている

## 3. 品質確認
- [ ] `npm run build` が成功
- [ ] 主要リンクに `target="_blank"` + `rel="noopener noreferrer"` を維持
- [ ] 作業は `main` 直pushではなく、作業ブランチ + PRで進める

## 4. 公開後確認
- [ ] 本番URLで `/`, `/japan` 表示確認
- [ ] 外部リンク（LINE/Instagram/Facebook）が本番で有効
- [ ] 404ページ（/hub含む）が意図どおり
