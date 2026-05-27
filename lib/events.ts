export type EventCategory = 'curry' | 'workshop' | 'special'

export type Bilingual = { ja: string; en: string }

export type EventItem = {
  id: string
  category: EventCategory
  /** ISO yyyy-mm-dd in Melbourne local time */
  date: string
  /** e.g. '18:00〜22:00' — same string for both languages */
  time?: string
  title: Bilingual
  location: Bilingual
  /** 1〜2行の短い紹介。カードに表示 */
  summary: Bilingual
  /** モーダルで表示する詳細説明 */
  description: Bilingual
  /** /public 配下のパス */
  image: string
  /** 任意。'無料' や '$15' などの料金バッジ */
  fee?: Bilingual
}

export const CATEGORY_LABELS: Record<EventCategory, Bilingual> = {
  curry: { ja: 'カレー会', en: 'Curry Night' },
  workshop: { ja: 'ワークショップ', en: 'Workshop' },
  special: { ja: '特別イベント', en: 'Special Event' },
}

// 新しいイベントは date 昇順で追加してください。
// 過去日付のイベントは EventsSection が自動で非表示にします。
export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'winery-drive-2026-05-31',
    category: 'special',
    date: '2026-05-31',
    time: '12時集合〜17時解散',
    title: { ja: 'ワイナリードライブ@ヤラバレー', en: 'Winery Drive @ Yarra Valley' },
    location: { ja: 'ヤラバレー（集合場所はシティ周辺）', en: 'Yarra Valley (meet near the city)' },
    fee: { ja: '試飲会$15-18＋ガソリン代折半', en: 'Tasting $15-18 + petrol split' },
    summary: {
      ja: '今週日曜、ヤラバレーのワイナリーに行って試飲をするドライブイベント🚗🍷 5名までの少人数開催です。',
      en: 'This Sunday — a drive out to Yarra Valley wineries for a tasting trip. Capped at 5 people.',
    },
    description: {
      ja: `【ワイナリードライブ🚗🍷@ヤラバレー】\n\n直近ですが、今週の日曜日にヤラバレーのワイナリーに行って試飲をするイベントを開催します✨\n\n📅 日にち： 5/31（日）\n⏰時間：12時集合17時解散\n📍 場所： ヤラバレー\n💰 費用： 試飲会($15-18) +ガソリン代(折半)\n\n※5人まで参加です🉑！\n※待ち合わせ場所は参加者が決まり次第決定しますが、シティ周辺`,
      en: `【Winery Drive 🚗🍷 @ Yarra Valley】\n\nShort notice — this Sunday we're driving out to Yarra Valley for a winery tasting trip ✨\n\n📅 Date: Sun May 31\n⏰ Time: Meet 12:00, finish ~17:00\n📍 Where: Yarra Valley\n💰 Cost: Tasting (~$15-18) + petrol split between everyone\n\n※ Capped at 5 people 🉑\n※ Meeting spot will be confirmed once participants are set — somewhere near the city`,
    },
    image: '/images/events/special/winery-yarra.jpg',
  },
  {
    id: 'pasta-night-2026-05-31',
    category: 'special',
    date: '2026-05-31',
    time: '19時ごろ',
    title: { ja: 'パスタ会@みんなの館', en: 'Pasta Night @ Minna no Yakata' },
    location: { ja: 'みんなの館', en: 'Minna no Yakata' },
    fee: { ja: '$5', en: '$5' },
    summary: {
      ja: 'ヤラバレードライブのあと、まささんがパスタを振る舞ってくださいます🍝 夜ご飯会だけの参加もOK！',
      en: 'After the Yarra Valley drive, Masa-san will cook pasta for the group 🍝 Dinner-only guests welcome!',
    },
    description: {
      ja: `【パスタ会のお知らせ🍝】\n\n同日ヤラバレーのドライブ後にみんなの館でまささんがパスタを振る舞ってくださいます🤭\n\n📆日にち：5月31日(日)\n⏰時間：19時ごろ\n📍場所：みんなの館\n💰費用：$5ドル\n\n※夜ご飯会だけの参加も🙆🏼‍♀️\n※人数次第でドライブ参加の方を優先していただくことがあります🙇🏻‍♀️`,
      en: `【Pasta Night 🍝】\n\nAfter the Yarra Valley drive, Masa-san will be cooking pasta for everyone at Minna no Yakata 🤭\n\n📆 Date: Sun May 31\n⏰ Time: From around 19:00\n📍 Where: Minna no Yakata\n💰 Cost: $5\n\n※ Dinner-only guests are very welcome 🙆🏼‍♀️\n※ Depending on numbers, drive participants may get priority 🙇🏻‍♀️`,
    },
    image: '/images/events/special/pasta-night.jpg',
  },
  {
    id: 'parkrun-2026-05-30',
    category: 'special',
    date: '2026-05-30',
    time: '7:45集合',
    title: { ja: 'みんなでparkrun（5kmウォーク＆ラン）', en: 'Group parkrun (5km Walk & Run)' },
    location: { ja: 'Parkville parkrun', en: 'Parkville parkrun' },
    fee: { ja: '無料', en: 'Free' },
    summary: {
      ja: '5月30日にみんなで parkrun（5kmウォーク＆ラン）に参加してみませんか？✨ 毎週土曜日に世界中で開催されている無料の5kmイベントです😊',
      en: 'Join us at parkrun on May 30 — a free 5km walk & run held every Saturday in cities worldwide. Go at your own pace.',
    },
    description: {
      ja: `メルボルンの皆さん、こんにちは！☀️

5月30日にみんなで parkrun（5kmウォーク＆ラン） に参加してみませんか？✨

parkrunは、毎週土曜日に世界中で開催されている無料の5kmイベント！
走ってもOK、歩いてもOK、自分のペースで参加できます😊

今回は city近くで参加しやすい
📍 Parkville parkrun に行きます！

https://maps.app.goo.gl/tKsU7hEowK7iEWRq5?g_st=ic

Flatなコースで走りやすく、
公園の周りを2周するコースです！
トイレもあります👌

【みんなでparkrun参加！】
📅 日時： 5月30日(土)7:45集合
📍 場所： Parkville parkrun
💰 参加費： 無料

⸻

当日の流れ

🕢 7:45〜
3rdplaceメンバーで集合！（イベント参加の方もぜひ！）

🏃 8:00〜
parkrunスタート！

速い人は30分くらい、
ゆっくり歩く人でも1時間くらいを想定しています😊

☕ 9:00頃〜
近くのカフェでコーヒー飲んだり、
朝ご飯を食べながら交流タイム！

頃合いをみて解散予定です🌿

事前準備

parkrun公式サイトで事前登録をお願いします！

（記録を残さない場合は登録なしでも参加できますが、登録推奨です👌）

登録後にバーコード（QRコード）が発行されるので、当日持参してください✨

⚠️ parkrunは外部の公開イベントです！

3rdplaceとして団体参加する形ではなく、「それぞれ個人で登録して、同じ場所に集まる」イメージになります😊

初参加の方向け説明（ブリーフィング）がある場合もあるので、初めての人も安心して参加できます✨`,

      en: `Hi Melbourne crew! ☀️

Want to join us at parkrun (5km walk & run) on May 30? ✨

parkrun is a free 5km event held every Saturday in cities all over the world!
Run or walk — go at your own pace 😊

This time we're heading to a spot that's easy to get to from the city:
📍 Parkville parkrun

https://maps.app.goo.gl/tKsU7hEowK7iEWRq5?g_st=ic

Flat and runnable, two laps around the park.
Toilets on site 👌

【parkrun together!】
📅 When: Sat May 30, meet at 7:45
📍 Where: Parkville parkrun
💰 Cost: Free

⸻

On the day

🕢 7:45 —
3rd Place members meet up (event guests welcome too!)

🏃 8:00 —
parkrun starts!

Fast runners take ~30 min; walkers around an hour 😊

☕ ~9:00 —
Coffee and breakfast at a nearby cafe — hang out and chat!

We'll wrap up whenever feels right 🌿

Before you go

Please register on the official parkrun site in advance!

(You can join without registering if you don't need a time recorded, but registering is recommended 👌)

After signing up you'll get a barcode (QR code) — bring it with you on the day ✨

⚠️ parkrun is a public event run by others!

We're not signing up as a 3rd Place group — everyone registers individually and we just meet at the same spot 😊

There's sometimes a briefing for first-timers, so newcomers can join with peace of mind ✨`,
    },
    image: '/images/events/special/parkrun.jpg',
  },
  {
    id: 'curry-2026-06-06',
    category: 'curry',
    date: '2026-06-06',
    time: '18:00〜22:00',
    title: { ja: '6月のカレー会', en: 'June Curry Night' },
    location: { ja: 'みんなの館', en: 'Minna no Yakata' },
    fee: { ja: '無料', en: 'Free' },
    summary: {
      ja: '毎月恒例、みんなで囲むあったかいカレーの夜。初参加もひとり参加も大歓迎です。',
      en: 'Our monthly curry night — warm food, warmer people. First-timers and solo guests very welcome.',
    },
    description: {
      ja: '3rd Place を代表する毎月恒例イベント。30〜40人ほどの日本人メンバーが集まり、カレーを囲みながらお互いの近況や情報を交換します。毎回5〜10人ほど初参加の方がいて、ほぼ全員ひとりで来てくれているので、知り合いがいなくても安心して飛び込んでください。住所は参加申請後にLINEグループでお知らせします。',
      en: 'Our flagship monthly gathering. 30–40 Japanese members come together over curry to swap stories, tips, and updates. Every event has 5–10 first-timers, almost all of whom show up solo — so please don\'t hesitate to drop in. We\'ll share the exact address in the LINE group after your application is approved.',
    },
    image: '/images/events/curry/curry12.jpg',
  },
]
