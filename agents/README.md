# 3rd Place サイト改善エージェント

## 使い方

Claude Codeに以下の一言を言うだけ：

```
サイトをレビューして
```

それだけで6体のエージェントが並列で動いて、`report.md` が生成されます。

---

## エージェント構成

| ファイル | 役割 |
|---------|------|
| `agent1-japan-persona.md` | 日本在住・渡航検討者の視点 |
| `agent2-melbourne-persona.md` | メルボルン在住・未参加者の視点 |
| `agent3-member-persona.md` | 既存メンバー・未参加者の視点 |
| `agent4-trust.md` | 信頼構築の横断チェック |
| `agent5-conversion.md` | 行動導線の横断チェック |
| `agent6-design.md` | デザイン品質の横断チェック |
| `orchestrator.md` | 統合レポートのフォーマット定義 |

---

## 出力

`agents/report.md` に統合レポートが生成されます。

---

## エージェントの内容を変えたいとき

各 `.md` ファイルを直接編集してください。
観点・ペルソナ・スコア項目はすべて自由に変更できます。
