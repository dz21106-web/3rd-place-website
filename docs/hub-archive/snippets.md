# Hub関連スニペット（削除前の抜粋）

2026-04-14 の削除時点で各ファイルから取り除いたHub関連コードの記録。復元するときはこのファイルを参照。

---

## 1. `components/Navbar.tsx`

### `NavbarProps.page` 型に `'hub'` を追加
```ts
page?: 'melbourne' | 'japan' | 'hub'
```

### `PageKey` 型
```ts
type PageKey = 'melbourne' | 'japan' | 'hub'
```

### `pageConfig` の `hub` エントリ
```ts
hub: { path: '/hub', ja: '渡航サポート', en: 'Hub' },
```

### `subLinks` の `hub` エントリ
```ts
hub: [
  { href: '#features', ja: 'サービス内容', en: 'Features' },
  { href: '#apply', ja: '料金', en: 'Pricing' },
],
```

### `ctaConfig` の `hub` エントリ
```ts
hub: { href: '#apply', ja: '通知を受け取る', en: 'Get Notified' },
```

---

## 2. `components/SubFooter.tsx`

### `page` 型に `'hub'` を追加
```ts
page: 'japan' | 'hub'
```

### `pageName` 判定
```ts
const pageName = page === 'japan' ? 'Japan' : 'Hub'
```

### Hub/Japan クロスリンク
```tsx
{page === 'japan' && (
  <Link href="/hub" className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
    3rd Place Hub
  </Link>
)}
{page === 'hub' && (
  <Link href="/japan" className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
    3rd Place Japan
  </Link>
)}
```

---

## 3. `app/page.tsx`

### FAQ項目（JA）
```ts
{ q: '3rd Place HubとLINEグループは別ですか？', a: 'はい、別物なんです。LINEグループは誰でも無料で入れるコミュニティ、3rd Place Hubは仕事・住居サポートの有料サービス（現在開発中）です。' },
```

### FAQ項目（EN）
```ts
{ q: 'Is 3rd Place Hub different from the LINE group?', a: 'Yep, two different things! The LINE group is a free community anyone can join. 3rd Place Hub is a paid job/housing support service, currently being built.' },
```

### はじめかたセクション Step 4 ブロック
```tsx
{/* Step 4: Hub（開発中） */}
<div className="bg-navy rounded-2xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-6">
  <div className="flex items-center gap-3 flex-shrink-0">
    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 font-bold text-sm">
      4
    </div>
    <div className="inline-block bg-orange/20 text-orange text-xs font-bold px-3 py-1 rounded-full">
      {s('開発中', 'Coming Soon', l)}
    </div>
  </div>
  <div className="flex-grow text-center md:text-left">
    <h4 className="font-heading text-lg font-bold text-white mb-1">
      {s('もっと本格的に準備したい人へ — 3rd Place Hub', 'For serious preparation — 3rd Place Hub', l)}
    </h4>
    <p className="text-white/50 text-sm">
      {s(
        '先輩たちの引き継ぎノート、渡航前Zoom、推薦状、到着後のフォローまで全部セットの有料パッケージ。「自分で動ける状態」を一緒に作っていきますよ。',
        'A paid package with senpai handover notes, pre-departure Zoom, a recommendation letter, and post-arrival support. We\'ll get you ready to stand on your own two feet.',
        l
      )}
    </p>
  </div>
  <Link href="/hub" className="bg-white/10 text-white/80 font-medium px-6 py-3 rounded-xl hover:bg-white/15 transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex-shrink-0">
    {s('詳しく見る →', 'Learn more →', l)}
  </Link>
</div>
```

### Final CTA カード2の Hub ボタン
```tsx
<Link href="/hub"
  className="bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-center hover:bg-white/30 transition-colors duration-200 text-sm cursor-pointer">
  {s('渡航サポート（3rd Place Hub）を見る', 'See 3rd Place Hub', l)}
</Link>
```

### フッター Hub リンク
```tsx
<Link href="/hub" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">3rd Place Hub</Link>
```

---

## 4. `app/japan/page.tsx`

### Hub 渡航前パッケージセクション（全ブロック）
```tsx
{/* ── Hub pre-departure ── */}
<section className="py-28 bg-navy">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-orange text-xs font-semibold uppercase tracking-widest">
          {s('有料サービス', 'Paid Service', l)}
        </span>
        <h2 className="font-heading text-4xl font-bold text-white mt-4 mb-2 leading-tight">
          3rd Place Hub
        </h2>
        <p className="text-orange font-semibold mb-6">A$150〜200</p>
        <p className="text-white/60 leading-relaxed mb-8">
          {s(
            'イベントで話を聞くだけでなく、もっと本格的に渡航準備をしたい方のためのパッケージ。先輩が書いた「引き継ぎノート」で仕事・住居の情報を事前にインプットし、渡航前Zoomブリーフィング・推薦状発行・到着後1ヶ月フォローまで含む。',
            'For those who want to go beyond the event and seriously prepare for their move. Access senior members\' handover notes on jobs and housing, join a pre-departure Zoom briefing, get a recommendation letter, and receive 1 month of post-arrival support.',
            l
          )}
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {tags(
            ['引き継ぎノート閲覧', '渡航前Zoom', '公認推薦状', '到着後1ヶ月フォロー', 'キャッシュバック最大A$100'],
            ['Handover Notes', 'Pre-departure Zoom', 'Rec. Letter', '1-month Follow-up', 'Up to A$100 Cashback'],
            l
          ).map((tag, i) => (
            <span key={i} className="bg-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="inline-block bg-orange/20 text-orange text-sm font-bold px-4 py-2 rounded-full">
          {s('開発中 — 近日公開', 'Coming Soon', l)}
        </div>
      </div>
      <div className="bg-navy-light rounded-2xl p-10 border border-white/10">
        <h3 className="font-heading text-xl font-bold text-white mb-6">
          {s('パッケージに含まれるもの', 'What\'s included', l)}
        </h3>
        {/* 4項目: 引き継ぎノート / 渡航前Zoom / 公認推薦状 / 到着後1ヶ月フォロー
            詳細は hub-page.tsx.txt を参照 */}
      </div>
    </div>
  </div>
</section>
```

---

## 5. `app/hub/page.tsx`（全文）

`hub-page.tsx.txt` にフルコピーあり。復元時はそれをベースに `app/hub/page.tsx` として再配置。
