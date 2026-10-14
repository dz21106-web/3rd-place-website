'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SmoothScroll from '../../components/SmoothScroll'
import SlideUpText from '../../components/SlideUpText'
import ScrollReveal from '../../components/ScrollReveal'
import FloatingPhoto from '../../components/motion/FloatingPhoto'
import ScaleReveal from '../../components/motion/ScaleReveal'
import ScrollPhotoRow from '../../components/motion/ScrollPhotoRow'
import StickyPhoneSteps from '../../components/motion/StickyPhoneSteps'
import CountUp from '../../components/CountUp'
import FAQSection from '../../components/FAQ'
import SiteMenu from '../../components/SiteMenu'
import { EXTERNAL_LINKS } from '../../lib/site'
import { img } from '../../lib/images'

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en

/**
 * 背景色のテーマ。各セクションに data-theme を付けておくと、
 * 画面の中央線にかかったセクションの色へページ全体の背景がなめらかに切り替わる。
 */
type Theme = 'cream' | 'sumi' | 'orange'
const themeClass: Record<Theme, string> = {
  cream: 'bg-cream text-white',
  sumi: 'bg-sumi text-white',
  orange: 'bg-orange text-white',
}
/** ヘッダー用: 同じ色を半透明にして、後ろの写真や光が透けて見えるようにする */
const glassClass: Record<Theme, string> = {
  cream: 'bg-cream/60 text-white',
  sumi: 'bg-sumi/50 text-white',
  orange: 'bg-orange/60 text-white',
}

const Arrow = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
)

/** 参加者の声の中の、印象的な言葉（オレンジ・少し大きく） */
const Em = ({ children }: { children: React.ReactNode }) => (
  <span className="text-orange text-[1.2em]">{children}</span>
)

/** セクション見出しの小さなラベル: (01) Our Purpose */
const SectionLabel = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <p className="font-display-en text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
    <span className="text-orange">({n})</span> <span className="opacity-70">{children}</span>
  </p>
)

export default function DesignAClient() {
  const [lang, setLang] = useState<Lang>('ja')
  const [theme, setTheme] = useState<Theme>('cream')
  const l = lang

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-theme]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setTheme(entry.target.getAttribute('data-theme') as Theme)
        })
      },
      // 画面の縦中央の1本の線にかかったセクションだけを「現在」とみなす
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const rowTop = [
    '/images/events/curry/curry5.jpg', '/images/events/special/cafe.jpg', '/images/events/curry/curry9.jpg',
    '/images/events/special/newyear2.jpg', '/images/events/curry/curry14.jpg', '/images/events/workshop/ikebana2.jpg',
    '/images/events/curry/curry7.jpg',
  ]
  const rowBottom = [
    '/images/events/curry/curry15.jpg', '/images/events/special/nabe1.jpg', '/images/events/curry/curry-food.jpg',
    '/images/events/special/bbq.jpg', '/images/events/curry/curry17.jpg', '/images/events/special/christmas.jpg',
    '/images/events/curry/curry11.jpg',
  ]

  const memberTypes = [s('ワーホリ', 'Working Holiday', l), s('留学生', 'Students', l), s('駐在員', 'Expats', l), s('永住者', 'Residents', l)]

  const stats = [
    { num: '2', unit: s('年', 'yrs', l), label: s('コミュニティ運営', 'Running', l) },
    { num: '380', unit: s('人', '', l), label: s('メンバー数', 'Members', l) },
    { num: '20', unit: '+', label: s('カレー会開催', 'Curry Nights held', l) },
    { num: '20〜40', unit: s('人', '', l), label: s('毎月のカレー会', 'Monthly attendance', l) },
  ]

  // 実際の参加者アンケート・感想から抜粋（言い回しは本人のまま。日付などの文脈に依存する言葉だけ整えた）
  const voices = [
    {
      who: s('初参加（参加前は「知り合いがいなくて浮かないか」が不安だった）', 'First-timer (was worried about not knowing anyone)', l),
      text: s(<><Em>不安が晴れた！</Em>最高でした！</>, <>My <Em>worries disappeared</Em> — it was the best!</>, l),
    },
    {
      who: s('学生・男性', 'Student · Male', l),
      text: s(
        <>国内外の友達が増えることで、一緒に経験したいことが増えて、相談相手が増えて、できることや考え方が増える。<Em>これからが楽しみ</Em>になりました。</>,
        <>As I make more friends in Japan and abroad, there are more things I want to experience together, more people to talk things through with, and more I can do and think. <Em>I&apos;m excited for what&apos;s ahead.</Em></>,
        l
      ),
    },
    {
      who: s('6回以上参加している常連メンバー', 'Regular (6+ events)', l),
      text: s(
        <>自分たちの経験が、ワーホリに来て間もない人たちに<Em>有益な情報</Em>として話題になったこと。</>,
        <>Our own experiences turned into <Em>useful tips</Em> for people who&apos;d just arrived on a working holiday.</>,
        l
      ),
    },
    {
      who: s('社会人・女性', 'Working professional · Female', l),
      text: s(
        <>行動してるのがすごいなって思って、私自身頑張らないとって<Em>後押し</Em>された気もしてます！</>,
        <>Seeing everyone actually taking action was amazing — it felt like <Em>a push</Em> for me to step up too!</>,
        l
      ),
    },
    {
      who: s('参加2〜3回目（英語漬けの毎日から一息つきたくて参加）', '2nd–3rd time (came for a break from speaking English all day)', l),
      text: s(<><Em>年齢も様々</Em>、沢山の日本人に会えました。</>, <><Em>People of all ages</Em> — I got to meet so many Japanese people.</>, l),
    },
  ]

  const hubFeatures = [
    {
      title: s('関心ごとが見える', 'See shared interests', l),
      desc: s('趣味や関心ごと、やりたいこと。LINEでは見えない「その人らしさ」が自己紹介でわかります。', 'Hobbies, interests, goals — the things LINE can\'t show, visible through introductions.', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
    },
    {
      title: s('気の合う仲間が見つかる', 'Find your people', l),
      desc: s('関心の近いメンバーとつながれるから、イベントの後も関係が続きます。', 'Connect with people who share your interests, so the friendship continues after the event.', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      title: s('イベントにすぐ参加', 'Join events in a tap', l),
      desc: s('開催予定をHUBでチェックして、参加ボタンを押すだけ。', 'Check what\'s coming up on HUB and tap to join.', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    },
  ]

  const hubSteps = [
    {
      n: '01',
      title: s('HUBに登録', 'Sign up for HUB', l),
      desc: s('確認事項を読んで同意し、LINEを登録します。安心できるコミュニティのために、全員にお願いしています。', 'Read and agree to our guidelines, then connect your LINE. We ask everyone, to keep this a safe community.', l),
      screenLabel: s('3rd Placeの仲間', 'Your community', l),
      // スクリーンショット（848×1928）上の位置を % で指定: ホーム上部の「380+ の仲間」
      spot: { top: 9.5, height: 23 },
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
    },
    {
      n: '02',
      title: s('自己紹介を書く', 'Write your intro', l),
      desc: s('趣味や関心ごと、メルボルンでやりたいことを書いてみよう。それが、仲間とつながるきっかけになります。', 'Share your hobbies, interests, and what you want to do in Melbourne — it\'s how people find you.', l),
      screenLabel: s('メンバーの自己紹介', 'Member intros', l),
      // 「メンバーを見る — 自己紹介を読む」カード
      spot: { top: 34.2, height: 9.2, left: 4, width: 92 },
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
    },
    {
      n: '03',
      title: s('イベントに参加', 'Join an event', l),
      desc: s('気になるイベントの「参加」ボタンを押すだけ。みんな一人で来る人ばかりなので、安心してね。', 'Tap "Join" on any event that catches your eye. Almost everyone comes solo, so no worries.', l),
      screenLabel: s('今月のイベント', "This month's events", l),
      // 「今月のイベント」
      spot: { top: 64, height: 35.5 },
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
  ]

  const faqItems = {
    ja: [
      { q: 'どうやって参加すればいいですか？', a: 'コミュニティアプリ「HUB」に登録して、自己紹介を書くだけです。登録後は、HUBから気になるイベントに参加できます。' },
      { q: 'なぜ自己紹介が必要なんですか？', a: 'メンバー同士が、趣味や関心ごとの近い仲間を見つけやすくするためです。お互いを知ったうえでつながれる、安心できるコミュニティを保つためにも、全員にお願いしています。' },
      { q: '初めてで一人なのですが、大丈夫ですか？', a: '全然大丈夫です！毎回5〜10人くらい初参加の方がいて、ほぼみんな一人で来てますよ。HUBで事前にメンバーの自己紹介を見られるので、話のきっかけも見つけやすいです。' },
      { q: '英語が話せなくても大丈夫ですか？', a: '全然問題ないです！コミュニティ内は基本日本語なので安心してください。英語交流の機会もあるけど、もちろん参加は自由です。' },
      { q: 'メルボルンに着いてからでも参加できますか？', a: 'もちろん！渡航前でも到着直後でも、滞在中でも帰国前でも、どんなタイミングでも歓迎ですよ。' },
      { q: 'カレー会の参加費はかかりますか？', a: 'カレー会は完全無料！まごころ精神のもと、これからもずっと無料でやっていきます。' },
      { q: '運営に参加したい場合はどうすればいいですか？', a: <>ぜひぜひ！メルボルン現地の運営メンバーを絶賛募集中です。<a href={EXTERNAL_LINKS.melbourneStaffApplyForm} target="_blank" rel="noopener noreferrer" className="text-orange underline hover:text-orange-dark transition-colors duration-200 cursor-pointer">こちらのフォーム</a>からお気軽にご応募ください。</> },
    ],
    en: [
      { q: 'How do I join?', a: 'Sign up for our community app, HUB, and write a short self-introduction. After that, you can join any event right from HUB.' },
      { q: 'Why do I need to write a self-introduction?', a: 'It helps members find people with similar interests, and keeps this a safe community where people connect knowing a little about each other.' },
      { q: 'Is it okay to come alone for the first time?', a: 'Totally fine! Every event has 5–10 first-timers, and almost everyone shows up solo. You can read members\' introductions on HUB beforehand, too.' },
      { q: 'Is it okay if I can\'t speak English?', a: 'No problem at all! The community runs mostly in Japanese. There are English exchange opportunities too, but it\'s totally up to you.' },
      { q: 'Can I join after arriving in Melbourne?', a: 'Yep, anytime works! Before you leave, right after you land, mid-stay, or right before heading home.' },
      { q: 'Is there a fee for the Curry Night?', a: 'Curry Night is completely free — always has been, always will be. That\'s the spirit of magokoro.' },
      { q: 'How can I get involved in operations?', a: <>Please do! We&apos;re always looking for local Melbourne members to help run things. Apply via <a href={EXTERNAL_LINKS.melbourneStaffApplyForm} target="_blank" rel="noopener noreferrer" className="text-orange underline hover:text-orange-dark transition-colors duration-200 cursor-pointer">this form</a>.</> },
    ],
  }

  return (
    // isolate: 背景の光（-z-10）を main の背景色より上・中身より下に描くため
    <main className={`design-a relative isolate overflow-x-clip transition-colors duration-700 ease-out ${themeClass[theme]}`}>
      <SmoothScroll />
      <div className="grain-overlay" aria-hidden="true" />

      {/* 背景にゆっくり漂う光。テーマに合う1枚だけを表示する */}
      {(['cream', 'sumi', 'orange'] as Theme[]).map(t => (
        <div key={t} aria-hidden="true" className={`ambient ambient-${t} animate-drift ${theme === t ? 'opacity-100' : 'opacity-0'}`} />
      ))}

      {/* ── HEADER（すりガラス。背景色に合わせて色が変わる）── */}
      <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-700 ease-out ${glassClass[theme]}`}>
        <span className="absolute bottom-0 inset-x-0 h-px bg-current opacity-10" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
          <Link href="/design-a" className="flex items-center gap-3 cursor-pointer">
            <Image src={img('/images/3rd-place-melbourne.jpg', 'thumb')} alt="3rd Place" width={32} height={32} className="rounded-lg object-contain" />
            <span className="font-display-en font-extrabold tracking-tight text-lg">3rd Place</span>
          </Link>
          <nav className="flex items-center gap-4 md:gap-8">
            <a href="#purpose" className="hidden md:inline font-display-en text-sm font-bold hover:text-orange transition-colors duration-200 cursor-pointer">About</a>
            <a href="#hub" className="hidden md:inline font-display-en text-sm font-bold hover:text-orange transition-colors duration-200 cursor-pointer">How to Join</a>
            <a href="#faq" className="hidden md:inline font-display-en text-sm font-bold hover:text-orange transition-colors duration-200 cursor-pointer">FAQ</a>
            <button onClick={() => setLang(l === 'ja' ? 'en' : 'ja')} className="font-display-en text-xs font-bold opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
              {l === 'ja' ? 'EN' : 'JA'}
            </button>
            <a
              href={EXTERNAL_LINKS.hub}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer ${theme === 'sumi' ? 'bg-orange text-white hover:bg-white hover:ring-1 hover:ring-black' : 'bg-sumi text-white hover:bg-white hover:ring-1 hover:ring-black'}`}
            >
              {s('HUBで参加', 'Join on HUB', l)}
            </a>
            <SiteMenu
              items={[
                { href: '#purpose', label: s('わたしたちの目的', 'Our purpose', l) },
                { href: '#who', label: s('どんな人がいる？', "Who's here", l) },
                { href: '#voices', label: s('参加者の声', 'Voices', l) },
                { href: '#hub', label: s('HUBで参加する', 'How to join', l) },
                { href: '#founder', label: s('創設者の想い', 'Our founder', l) },
                { href: '#faq', label: s('よくある質問', 'FAQ', l) },
              ]}
              hubLabel={s('HUBに登録して参加する', 'Sign up on HUB', l)}
              japanLabel={s('日本にいる方は → 東京イベント', 'In Japan? → 3rd Place Japan', l)}
            />
          </nav>
        </div>
      </header>

      {/* ── HERO: 浮かぶ写真 ─────────────────── */}
      <section data-theme="cream" className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-16">
        {/* 写真ごとに違う速さで上へ流れる。素材はイベント告知のフライヤー（3:4）なので、文字が切れないよう枠も 3:4 に揃える */}
        <FloatingPhoto src="/images/events/flyers/curry-melbourne.jpg" alt={s('カレー会のフライヤー', 'Curry Talk flyer', l)} className="top-[9%] left-[3%] md:left-[5%] w-[34vw] md:w-[17vw] aspect-[3/4]" speed={0.35} rotate={-6} delay={300} />
        <FloatingPhoto src="/images/events/flyers/runclub-melbourne.jpg" alt={s('ランクラブのフライヤー', 'Park Run flyer', l)} className="top-[12%] right-[4%] md:right-[9%] w-[28vw] md:w-[13vw] aspect-[3/4]" speed={0.2} rotate={5} delay={450} />
        <FloatingPhoto src="/images/events/flyers/futsal-melbourne.jpg" alt={s('フットサルのフライヤー', 'Futsal Club flyer', l)} className="bottom-[8%] left-[8%] md:left-[15%] w-[30vw] md:w-[14vw] aspect-[3/4]" speed={0.55} rotate={4} delay={600} />
        <FloatingPhoto src="/images/events/flyers/picnic-melbourne.jpg" alt={s('ピクニックのフライヤー', 'Picnic flyer', l)} className="bottom-[6%] right-[3%] md:right-[5%] w-[34vw] md:w-[17vw] aspect-[3/4]" speed={0.3} rotate={-3} delay={750} />
        <FloatingPhoto src="/images/events/flyers/wine-melbourne.jpg" alt={s('ワイン会のフライヤー', 'Winery Tour flyer', l)} className="hidden md:block top-[40%] left-[27%] w-[10vw] aspect-[3/4]" speed={0.7} rotate={8} delay={900} />
        <FloatingPhoto src="/images/events/flyers/workhori-talk-tokyo.jpg" alt={s('東京ワーホリトークのフライヤー', 'Working Holiday Chat Tokyo flyer', l)} className="hidden md:block top-[18%] right-[28%] w-[10vw] aspect-[3/4]" speed={0.8} rotate={-9} delay={1050} />

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <SectionLabel n="00">Melbourne · Japanese Community</SectionLabel>
          <SlideUpText
            as="h1"
            delay={200}
            className="mt-6 font-black tracking-tight leading-[1.15] text-[clamp(2.1rem,7.5vw,6rem)] drop-shadow-sm"
            lines={s(
              ['メルボルンで、', [{ text: '仲間', className: 'text-orange' }, 'と出会い、'], '自分を広げる場所。'],
              [[{ text: 'Meet friends.', className: 'text-orange' }], 'Grow yourself.', 'In Melbourne.'],
              l
            )}
            split={l === 'ja' ? 'char' : 'word'}
          />
          <ScrollReveal>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="#purpose" className="group inline-flex items-center gap-3 bg-sumi text-white font-bold px-7 py-4 rounded-full hover:bg-orange transition-colors duration-200 cursor-pointer">
                {s('3rd Placeについて知る', 'Learn about 3rd Place', l)}
                <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              {/* イベントの様子は Instagram に任せる */}
              <a href={EXTERNAL_LINKS.instagramMelbourne} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-white/40 backdrop-blur-md ring-1 ring-black text-white font-bold px-7 py-4 rounded-full hover:bg-orange transition-colors duration-200 cursor-pointer">
                {/* Instagram 本来のグラデーションのアイコン（白一色だと背景に溶けるため） */}
                <span className="instagram-gradient w-8 h-8 -my-1 rounded-[0.6rem] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={2} /><circle cx="12" cy="12" r="4" strokeWidth={2} /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                </span>
                {s('普段の様子はInstagram', "See what we're up to on Instagram", l)}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 写真が画面いっぱいに広がる ─────────── */}
      <div data-theme="cream">
        <ScaleReveal video="/videos/curry-night.mp4" alt={s('カレー会の様子（動画）', 'Curry Night (video)', l)}>
          <p className="text-white text-center font-black tracking-tight leading-[1.2] text-[clamp(1.8rem,6vw,5.5rem)]">
            {s(
              <>メルボルン最大級の<br /><span className="text-orange">日本人コミュニティ</span>へ<br />ようこそ</>,
              <>Welcome to one of<br /><span className="text-orange">Melbourne&apos;s largest</span><br />Japanese communities</>,
              l
            )}
          </p>
        </ScaleReveal>
      </div>

      {/* ── PURPOSE（ネイビー）─────────────────── */}
      <section id="purpose" data-theme="sumi" className="py-28 md:py-44">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionLabel n="01">Our Purpose</SectionLabel>
            </div>
          </div>
          <div className="md:col-span-8 space-y-16 md:space-y-20">
            <ScrollReveal>
              <h2 className="font-black tracking-tight leading-[1.15] text-4xl md:text-6xl">{s('第3の場所', 'A third place', l)}</h2>
              <p className="mt-6 text-lg md:text-2xl leading-relaxed md:leading-relaxed font-bold">
                {s(
                  '同じメルボルンに暮らしていても、永住者、ワーホリ、留学生、駐在員と、立場が違うと出会う機会は意外と少ないもの。だからこそ、家でも職場でもない「第3の居場所」をメルボルンにつくりたい。',
                  'Even in the same city, permanent residents, working holidaymakers, students, and expats rarely get the chance to meet. That\'s why we wanted to build a "third place" in Melbourne — somewhere that isn\'t home and isn\'t work.',
                  l
                )}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-black tracking-tight leading-[1.15] text-4xl md:text-6xl">{s(<>つながり、<br className="md:hidden" />助け合い、<br className="md:hidden" />高め合い</>, <>Connect, support,<br className="md:hidden" /> grow together</>, l)}</h2>
              <p className="mt-6 text-lg md:text-2xl leading-relaxed md:leading-relaxed font-bold">
                {s(
                  <>ただ、イベントはあくまで<span className="text-orange opacity-100">きっかけ</span>。ここで出会った仲間と新しいことを始め、高め合い、助け合える。そんな関係が自然と生まれる場所をつくることが、わたしたちの目的です。</>,
                  <>But events are only the <span className="text-orange">starting point</span>. Starting things together, growing together, helping each other — that&apos;s what we&apos;re here for.</>,
                  l
                )}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── WHO（オレンジ）: 逆方向に流れる写真の帯 ── */}
      <section id="who" data-theme="orange" className="py-28 md:py-40 overflow-hidden">
        <ScrollPhotoRow photos={rowTop} direction={-1} />
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 text-center">
          <SectionLabel n="02">Who&apos;s Here</SectionLabel>
          <p className="mt-8 font-black tracking-tight leading-tight text-[clamp(2rem,6vw,5rem)]">
            {memberTypes.map((m, i) => (
              <span key={m}>
                {m}
                {i < memberTypes.length - 1 && <span className="text-white no-outline mx-2 md:mx-4">/</span>}
              </span>
            ))}
          </p>
          <p className="mt-6 opacity-70 md:text-lg">
            {s('年齢も立場もさまざま。メルボルンでの毎日を、もっと豊かにしたい人たちが集まっています。', 'All ages, all backgrounds — people who want more from life in Melbourne.', l)}
          </p>

          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="font-display-en font-extrabold tracking-tight text-5xl md:text-7xl">
                  <CountUp value={stat.num} />
                  <span className="text-white no-outline text-2xl md:text-3xl ml-1">{stat.unit}</span>
                </p>
                <p className="mt-2 text-sm opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
        <ScrollPhotoRow photos={rowBottom} direction={1} />
      </section>

      {/* ── VOICES（クリーム）: 積み重なるカード ── */}
      <section id="voices" data-theme="cream" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionLabel n="03">Voices</SectionLabel>
              <h2 className="mt-6 font-black tracking-tight leading-[1.15] text-5xl md:text-7xl">
                {s('参加者の声', <>What members<br />say</>, l)}
              </h2>
            </div>
          </div>

          {/* カードは sticky で少しずつずれて重なっていく */}
          <div className="md:col-span-7 space-y-8 md:space-y-0">
            {voices.map((v, i) => (
              <figure
                key={i}
                className="md:sticky md:mb-[25vh] md:last:mb-0"
                style={{ top: `calc(7rem + ${i * 2}rem)` }}
              >
                <div
                  className={`relative bg-white/60 backdrop-blur-xl ring-1 ring-black text-white rounded-3xl p-7 md:p-10 shadow-xl shadow-sumi/10 ${i % 2 === 0 ? 'md:-rotate-2' : 'md:rotate-2'}`}
                >
                  <svg className="w-10 h-10 text-orange" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.41A1.76 1.76 0 017.17 9.4V6zm10 0A5.17 5.17 0 0012 11.17V18h6.83v-6.83h-3.42a1.76 1.76 0 011.76-1.77V6z" /></svg>
                  <blockquote className="mt-5 text-lg md:text-2xl font-bold leading-relaxed">{v.text}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-orange flex-shrink-0" aria-hidden="true" />
                    <span className="font-bold text-sm">{v.who}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUB（墨色）: 見出し → アプリ画面 → 説明 → 特長 → 3ステップ ── */}
      <section id="hub" data-theme="sumi" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="max-w-4xl">
            <SectionLabel n="04">How to Join</SectionLabel>
            <h2 className="mt-6 font-black tracking-tight leading-[1.15] text-[clamp(2.2rem,6vw,5rem)]">
              {s(<>仲間とつながる、<br />コミュニティアプリ<span className="text-orange">「HUB」</span></>, <>HUB — the app that<br /><span className="text-orange">connects our community.</span></>, l)}
            </h2>
          </div>

          {/* 説明より先にアプリ画面を見せる。PC では画面を左に固定し、右で説明 → 特長 → 手順と読み進める */}
          <div className="mt-14 md:mt-20">
            <StickyPhoneSteps
              steps={hubSteps}
              screen="/images/hub/app-home.jpg"
              screenRatio={848 / 1928}
              screenAlt={s('HUBアプリのホーム画面', 'HUB app home screen', l)}
              intro={
                <>
                  <p className="text-base md:text-xl leading-relaxed opacity-70">
                    {s(
                      '3rd Placeへの参加は、HUBへの登録から始まります。メンバーの趣味や関心ごとが自己紹介で見えるから、気の合う仲間が見つけやすく、イベントにもHUBから参加できます。',
                      "Joining 3rd Place starts with HUB. Self-introductions make members' interests visible, so it's easier to find people you click with — and you can join events right from the app.",
                      l
                    )}
                  </p>
                  <div className="mt-10 grid gap-4">
                    {hubFeatures.map((f, i) => (
                      <ScrollReveal key={i}>
                        <div className="group flex gap-5 rounded-3xl p-6 md:p-7 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md ring-1 ring-black hover:bg-orange hover:-translate-y-1 transition-all duration-500">
                          <div className="w-12 h-12 rounded-2xl bg-orange/15 text-orange flex items-center justify-center flex-shrink-0 group-hover:bg-sumi group-hover:text-white transition-colors duration-500">
                            {f.icon}
                          </div>
                          <div>
                            <h3 className="font-black text-lg md:text-xl">{f.title}</h3>
                            <p className="mt-2 text-sm md:text-base leading-relaxed opacity-70 group-hover:opacity-100">{f.desc}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </>
              }
            />
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <a href={EXTERNAL_LINKS.hub} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-orange text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-white hover:ring-1 hover:ring-black transition-colors duration-200 cursor-pointer">
              {s('HUBに登録して参加する', 'Sign up on HUB', l)}
              <Arrow className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOUNDER（オレンジ）──────────────────── */}
      <section id="founder" data-theme="orange" className="py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 flex justify-center">
              {/* 元写真が顔のアップなので、拡大・切り抜きはせず元の比率（564×649）のまま小さめに見せる */}
              <div className="relative w-full max-w-[16rem] md:max-w-xs aspect-[564/649] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black md:-rotate-2">
                <Image src={img('/images/team/masa.jpg', 'full')} alt={s('創設者 野口まさ', 'Founder Masa Noguchi', l)} fill sizes="(max-width: 768px) 256px, 320px" className="object-cover" />
              </div>
            </div>
            <div className="md:col-span-7">
              <SectionLabel n="05">Founder</SectionLabel>
              <blockquote className="mt-6 font-black tracking-tight leading-snug text-2xl md:text-4xl">
                {s(
                  '「肩書きや立場を気にせず、ありのままの自分でいられる居場所を。世代や立場を超えて、誰もが気軽につながれる場所を、メルボルンにつくりたかった。」',
                  '"A place where you can just be yourself, whatever your title or status. I wanted to create somewhere in Melbourne where anyone can connect easily, across generations and backgrounds."',
                  l
                )}
              </blockquote>
              <p className="mt-6 font-bold">{s('野口 まさ — 創設者 · メルボルン在住大学教授', 'Masa Noguchi — Founder · University Professor in Melbourne', l)}</p>
            </div>
          </div>

          {/* 創設の経緯（創設者本人に確認済みの内容） */}
          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-5 items-start">
            {/* 1. はじまり（長いので左の列を1枚で使う） */}
            <ScrollReveal>
              <article className="bg-sumi/80 backdrop-blur-xl ring-1 ring-black text-white rounded-3xl p-7 md:p-9 shadow-xl shadow-sumi/20">
                <p className="font-display-en text-xs font-bold tracking-[0.2em] uppercase text-orange">01 · Origin</p>
                <h3 className="mt-3 font-black text-xl md:text-2xl">{s('3rd Placeのはじまり', 'How 3rd Place began', l)}</h3>
                <div className="mt-4 space-y-4 text-sm md:text-base leading-relaxed opacity-90">
                  <p>
                    {s(
                      '2024年、メルボルン大学建築・建設・計画学部の学生展示会「MSDx Winter」に、Facebookを通じて日系コミュニティの皆さんを招待したことがきっかけでした。そこでみんなから付けてもらったニックネームは「ボス」。翌日、CBDでラーメンを食べに行くと、遠くから「ボス！」と呼ぶ声が。振り返ると、展示会に来てくれた仲間たちが集まっていました。',
                      "It began in 2024, when Masa invited the Japanese community via Facebook to MSDx Winter, the student exhibition of the University of Melbourne's Faculty of Architecture, Building and Planning. There, everyone gave him a nickname: \"Boss.\" The next day, on his way to get ramen in the CBD, he heard someone shout \"Boss!\" from down the street. He turned around to find the friends he'd met at the exhibition.",
                      l
                    )}
                  </p>
                  <p>
                    {s(
                      'そのまま一緒にカフェへ行き、語り合う中で見えてきたのは、永住者とワーキングホリデーの人たちの接点が少ないこと、そして日系コミュニティ同士の横のつながりが意外と弱いことでした。「それなら、世代や立場を超えて、誰もが気軽につながれる場所を作ろう」。そうして3rd Placeが生まれました。',
                      "They headed to a café together, and as they talked, two things became clear: permanent residents and working holidaymakers rarely cross paths, and the ties between Japanese communities were surprisingly weak. \"Then let's build a place where anyone can connect, across generations and backgrounds.\" That's how 3rd Place was born.",
                      l
                    )}
                  </p>
                </div>
              </article>
            </ScrollReveal>

            <div className="grid gap-5">
              {/* 2. 名前の由来 */}
              <ScrollReveal>
                <article className="bg-sumi/80 backdrop-blur-xl ring-1 ring-black text-white rounded-3xl p-7 md:p-9 shadow-xl shadow-sumi/20">
                  <p className="font-display-en text-xs font-bold tracking-[0.2em] uppercase text-orange">02 · The Name</p>
                  <h3 className="mt-3 font-black text-xl md:text-2xl">{s('名前に込めた想い', 'The meaning behind the name', l)}</h3>
                  <p className="mt-4 text-sm md:text-base leading-relaxed opacity-90">
                    {s(
                      '「3rd Place」は、マサさんが研究テーマとして学会や論文で発表してきた概念です。1st Placeは自宅、2nd Placeは学校や職場。そのどちらにも属さず、肩書きや立場を気にせず、ありのままの自分でいられる居場所が3rd Place。その考えを、そのままコミュニティの名前にしました。',
                      "\"3rd Place\" is a concept Masa has presented in his research, at academic conferences and in papers. Your 1st place is home; your 2nd place is school or work. A 3rd place belongs to neither: somewhere you can be yourself, free from titles and status. That idea became the community's name.",
                      l
                    )}
                  </p>
                </article>
              </ScrollReveal>

              {/* 3. カレー会と無料の理由 */}
              <ScrollReveal>
                <article className="bg-sumi/80 backdrop-blur-xl ring-1 ring-black text-white rounded-3xl p-7 md:p-9 shadow-xl shadow-sumi/20">
                  <p className="font-display-en text-xs font-bold tracking-[0.2em] uppercase text-orange">03 · Curry Night</p>
                  <h3 className="mt-3 font-black text-xl md:text-2xl">{s('カレー会と、無料で続ける理由', "Why curry, and why it's free", l)}</h3>
                  <p className="mt-4 text-sm md:text-base leading-relaxed opacity-90">
                    {s(
                      'カレーは、多くの日本人が子どもの頃から親しんできた好物。大人数でも作りやすく、囲めば自然と会話が生まれる家庭料理だからこそ、交流の場にぴったりだと考えて始めました。無料で続けているのは、長年研究者として世界中を飛び回り、日系コミュニティに貢献できていなかったという思いから。今は、地域社会への恩返しと社会奉仕の気持ちが、活動の原動力になっています。',
                      "Curry rice is a favourite most Japanese people have loved since childhood. It's easy to cook for a crowd, and sharing it naturally sparks conversation, which makes it the perfect dish for bringing people together. It stays free because, after years of travelling the world as a researcher, Masa felt he hadn't been able to give back to the Japanese community. Today, gratitude to the local community and a spirit of service are what drive his work.",
                      l
                    )}
                  </p>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ（クリーム）───────────────────────── */}
      <section id="faq" data-theme="cream" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionLabel n="06">FAQ</SectionLabel>
              <h2 className="mt-6 font-black tracking-tight leading-[1.15] text-5xl md:text-6xl">
                {s(<>よくある<br />質問</>, <>Questions<br />&amp; answers</>, l)}
              </h2>
            </div>
          </div>
          <div className="md:col-span-8 text-white bg-white/60 backdrop-blur-xl ring-1 ring-black rounded-3xl px-6 md:px-10 py-2 shadow-xl shadow-sumi/5">
            <FAQSection items={faqItems[l]} tone="outline" />
          </div>
        </div>
      </section>

      {/* ── CTA（ネイビー）: 流れる大きな文字 ───── */}
      <section data-theme="sumi" className="relative py-28 md:py-44 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="flex w-max animate-scroll-right">
            {[0, 1].map(copy => (
              <span key={copy} className="font-display-en font-extrabold text-[22vw] leading-none whitespace-nowrap pr-[4vw]">
                Join 3rd Place — Join 3rd Place —
              </span>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12 text-center">
          <SectionLabel n="07">Join Us</SectionLabel>
          <p className="mt-6 font-black tracking-tight leading-[1.15] text-[clamp(2.2rem,7vw,6rem)]">
            {s(<>出会いを、<br /><span className="text-orange">その先のつながり</span>へ。</>, <>From meeting<br /><span className="text-orange">to real connection.</span></>, l)}
          </p>
          <p className="mt-6 opacity-70 md:text-lg">
            {s('まずはHUBに登録して、自己紹介を書いてみよう。', 'Start by signing up on HUB and writing your introduction.', l)}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={EXTERNAL_LINKS.hub} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-orange text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-white hover:ring-1 hover:ring-black transition-colors duration-200 cursor-pointer">
              {s('HUBに登録して参加する', 'Sign up on HUB', l)}
              <Arrow className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          <Link href="/japan" className="mt-10 inline-flex items-center gap-2 text-sm font-bold opacity-70 hover:opacity-100 hover:text-orange transition-colors duration-200 cursor-pointer">
            {s('日本にいる方は → 東京イベント（3rd Place Japan）', 'In Japan? → 3rd Place Japan (Tokyo)', l)}
          </Link>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer data-theme="sumi" className="border-t border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-14">
          <p className="font-display-en font-extrabold tracking-tight text-[18vw] md:text-[12vw] leading-none opacity-90">
            3rd Place<span className="text-orange">.</span>
          </p>
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
            <div className="flex flex-wrap gap-6 font-bold">
              <a href="#purpose" className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">{s('わたしたちについて', 'About', l)}</a>
              <a href={EXTERNAL_LINKS.hub} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">HUB</a>
              <Link href="/japan" className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">3rd Place Japan</Link>
              <a href={EXTERNAL_LINKS.instagramMelbourne} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">Instagram</a>
              <a href={EXTERNAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">Facebook</a>
              <a href={EXTERNAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer">TikTok</a>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="font-bold text-orange hover:opacity-80 transition-opacity duration-200 cursor-pointer">{s('現在のデザインと比べる', 'Compare with current', l)}</Link>
              <p className="opacity-50 text-xs">© 2026 3rd Place</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
