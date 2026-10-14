'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FAQSection from '../components/FAQ'
import ScrollReveal from '../components/ScrollReveal'
import GallerySection from '../components/GallerySection'
import CountUp from '../components/CountUp'
import StaggerReveal from '../components/StaggerReveal'
import ScrollProgress from '../components/ScrollProgress'
import Parallax from '../components/Parallax'
import ScrollGlow from '../components/ScrollGlow'
import { EXTERNAL_LINKS } from '../lib/site'
import { img } from '../lib/images'

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en

const ArrowRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
)

const ExternalIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
)

export default function Home() {
  const [lang, setLang] = useState<Lang>('ja')
  const l = lang

  // Hero photo strips — alternate curry/non-curry so no similar photos are adjacent
  // Last item must differ from first item (they touch at the loop seam)
  const heroStripTop = [
    '/images/events/special/bbq.jpg',
    '/images/events/curry/curry3.jpg',
    '/images/events/special/christmas.jpg',
    '/images/events/curry/curry12.jpg',
    '/images/events/workshop/udon1.jpg',
    '/images/events/curry/curry7.jpg',
    '/images/events/special/drive.jpg',
    '/images/events/curry/curry15.jpg',
  ]
  const heroStripBottom = [
    '/images/events/curry/curry5.jpg',
    '/images/events/special/nabe1.jpg',
    '/images/events/curry/curry9.jpg',
    '/images/events/special/cafe.jpg',
    '/images/events/curry/curry-food.jpg',
    '/images/events/workshop/ikebana1.jpg',
    '/images/events/curry/curry14.jpg',
    '/images/events/special/newyear1.jpg',
  ]

  // どんな人がいる？ — 属性だけをあっさり見せる（個人の趣味・関心ごとは HUB の役割）
  const memberTypes = [
    {
      label: s('ワーキングホリデー', 'Working Holiday', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
    },
    {
      label: s('留学生', 'Students', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
    },
    {
      label: s('駐在員', 'Expats', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    },
    {
      label: s('永住者', 'Permanent Residents', l),
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg>,
    },
  ]

  // TODO(voices): 実際の参加者の声が集まったら差し替え、SAMPLE バッジと注記を削除する
  const voices = [
    {
      who: s('ワーキングホリデー・20代', 'Working holiday · 20s', l),
      text: s(
        'カレー会で隣に座った人と趣味のランニングが同じで、今は毎週一緒に走っています。一人で来たのが嘘みたいです。',
        'The person next to me at Curry Night turned out to be a runner too — now we run together every week. Hard to believe I came alone.',
        l
      ),
    },
    {
      who: s('留学生・20代', 'Student · 20s', l),
      text: s(
        '将来やりたいことを話したら、同じ分野で働く先輩を紹介してもらえました。ここに来てから、挑戦する勇気が出ました。',
        'I mentioned what I want to do after graduating, and someone introduced me to a senpai in that field. This place gave me the courage to go for it.',
        l
      ),
    },
    {
      who: s('永住者・30代', 'Permanent resident · 30s', l),
      text: s(
        '長くメルボルンに住んでいても、新しい刺激がもらえる場所。今度は自分が、誰かの力になれたら嬉しいです。',
        'Even after years in Melbourne, this is where I find new inspiration. Now I hope I can be the one helping someone else.',
        l
      ),
    },
  ]

  const faqItems = {
    ja: [
      { q: 'どうやって参加すればいいですか？', a: 'コミュニティアプリ「HUB」に登録して、自己紹介を書くだけです。登録後は、HUBから気になるイベントに参加できます。' },
      { q: 'なぜ自己紹介が必要なんですか？', a: 'メンバー同士が、趣味や関心ごとの近い仲間を見つけやすくするためです。お互いを知ったうえでつながれる、安心できるコミュニティを保つためにも、全員にお願いしています。' },
      { q: '初めてで一人なのですが、大丈夫ですか？', a: '全然大丈夫です！毎回5〜10人くらい初参加の方がいて、ほぼみんな一人で来てますよ。HUBで事前にメンバーの自己紹介を見られるので、話のきっかけも見つけやすいです。' },
      { q: '英語が話せなくても大丈夫ですか？', a: '全然問題ないです！コミュニティ内は基本日本語なので安心してください。英語交流の機会もあるけど、もちろん参加は自由です。' },
      { q: 'ワーホリ以外の方も参加できますか？', a: 'もちろん！ワーホリ・留学・駐在・永住者まで、いろんな人が参加してます。メルボルンに関わるすべての日本人を歓迎してるよ。' },
      { q: 'メルボルンに着いてからでも参加できますか？', a: 'もちろん！渡航前でも到着直後でも、滞在中でも帰国前でも、どんなタイミングでも歓迎ですよ。' },
      { q: 'カレー会の参加費はかかりますか？', a: 'カレー会は完全無料！まごころ精神のもと、これからもずっと無料でやっていきます。' },
      { q: '運営に参加したい場合はどうすればいいですか？', a: <>ぜひぜひ！メルボルン現地の運営メンバーを絶賛募集中です。<a href={EXTERNAL_LINKS.melbourneStaffApplyForm} target="_blank" rel="noopener noreferrer" className="text-orange underline hover:text-orange-dark transition-colors duration-200 cursor-pointer">こちらのフォーム</a>からお気軽にご応募ください。</> },
    ],
    en: [
      { q: 'How do I join?', a: 'Sign up for our community app, HUB, and write a short self-introduction. After that, you can join any event right from HUB.' },
      { q: 'Why do I need to write a self-introduction?', a: 'It helps members find people with similar interests. We also ask everyone to write one so we can keep this a safe community where people connect knowing a little about each other.' },
      { q: 'Is it okay to come alone for the first time?', a: 'Totally fine! Every event has 5–10 first-timers, and almost everyone shows up solo. You can read members\' introductions on HUB beforehand, so it\'s easy to find something to talk about.' },
      { q: 'Is it okay if I can\'t speak English?', a: 'No problem at all! The community runs mostly in Japanese. There are English exchange opportunities too, but jumping in is totally up to you.' },
      { q: 'Can people other than working holidaymakers join?', a: 'Of course! WHV folks, students, expats, PRs — anyone with a Melbourne connection is welcome here.' },
      { q: 'Can I join after arriving in Melbourne?', a: 'Yep, anytime works! Before you leave, right after you land, mid-stay, or right before heading home — whenever.' },
      { q: 'Is there a fee for the Curry Night?', a: 'Curry Night is completely free — always has been, always will be. That\'s the spirit of magokoro.' },
      { q: 'How can I get involved in operations?', a: <>Please do! We&apos;re always looking for local Melbourne members to help run things. Apply via <a href={EXTERNAL_LINKS.melbourneStaffApplyForm} target="_blank" rel="noopener noreferrer" className="text-orange underline hover:text-orange-dark transition-colors duration-200 cursor-pointer">this form</a>.</> },
    ],
  }

  return (
    <main className="bg-cream overflow-x-hidden">
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} />

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy">
        {/* Scroll-linked background glows */}
        <ScrollGlow className="absolute top-1/3 right-1/4 -mr-44 -mt-44 w-[46rem] h-[46rem] rounded-full glow-orange pointer-events-none" range={60} />
        <ScrollGlow className="absolute bottom-1/4 left-1/4 -ml-28 -mb-28 w-[32rem] h-[32rem] rounded-full glow-orange-soft pointer-events-none" range={40} />

        {/* Top photo strip — scrolls right */}
        <div className="relative z-10 overflow-hidden mt-20 mb-8 opacity-80">
          <div className="flex w-max animate-scroll-right">
            {[...heroStripTop, ...heroStripTop].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden ml-3">
                <Image src={img(src, 'card')} alt="" width={224} height={144} sizes="224px" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent pointer-events-none" />
        </div>

        {/* Center text */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
              Melbourne · Japanese Community
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 font-heading text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
            {s(
              <>メルボルンで、<br /><span className="text-orange">仲間</span>と出会い、<br />自分を広げる場所。</>,
              <><span className="text-orange">Meet friends.</span><br />Grow yourself.<br />Melbourne.</>,
              l
            )}
          </h1>

          <p className="animate-fade-up delay-300 text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {s(
              'ワーホリ・留学・駐在・永住者が集まる、メルボルンの日系コミュニティ。出会いをきっかけに、挑戦を応援し合い、助け合える仲間をつくる場所です。',
              'A Japanese community in Melbourne where working holidaymakers, students, expats, and residents meet — and become friends who cheer each other on and help each other out.',
              l
            )}
          </p>

          <div className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#purpose" className="bg-orange text-white font-semibold px-8 py-3.5 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
              {s('3rd Placeについて知る', 'Learn about 3rd Place', l)}
            </a>
            <a href="#hub" className="border border-white/25 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200 text-sm cursor-pointer">
              {s('参加方法を見る', 'How to join', l)}
            </a>
          </div>
          <div className="animate-fade-up delay-500 mt-6">
            <Link href="/japan" className="inline-flex items-center gap-2 border border-white/40 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 text-sm px-5 py-2 rounded-full transition-all duration-200 cursor-pointer">
              {s('日本からメルボルンを目指している方はこちら', 'Planning your move from Japan?', l)}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom photo strip — scrolls left */}
        <div className="relative z-10 overflow-hidden mt-8 mb-4 opacity-80">
          <div className="flex w-max animate-scroll-left">
            {[...heroStripBottom, ...heroStripBottom].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden ml-3">
                <Image src={img(src, 'card')} alt="" width={224} height={144} sizes="224px" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent pointer-events-none" />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/20 text-[10px] tracking-widest uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── STATS ────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '2', unit: s('年', 'yrs', l), label: s('コミュニティ運営', 'Running', l) },
            { num: '300', unit: s('人', '', l), label: s('累計参加者', 'Total Members', l) },
            { num: '20', unit: s('+回', '+', l), label: s('カレー会開催', 'Curry Nights Held', l) },
            { num: '30〜40', unit: s('人', '', l), label: s('毎月のカレー会', 'Monthly Attendance', l) },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-navy">
                <CountUp value={stat.num} />
                <span className="text-base ml-0.5 text-orange font-semibold">{stat.unit}</span>
              </p>
              <p className="text-slate-600 text-sm mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PURPOSE（私たちの目的）───────────── */}
      <section id="purpose" className="py-28 bg-white">
        <ScrollReveal direction="left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('わたしたちの目的', 'Our Purpose', l)}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4 mb-6 leading-tight">
              {s(
                <>出会いの、<br />その先へ。</>,
                <>Beyond<br />just meeting.</>,
                l
              )}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              {s(
                '海外での暮らしは、知り合いが少なく孤独になりがち。だからこそ、家でも職場でもない「第3の居場所」をメルボルンにつくりたい——それが3rd Placeの原点です。',
                'Life abroad can get lonely when you don\'t know many people. That\'s why we wanted to build a "third place" in Melbourne — somewhere that isn\'t home and isn\'t work. That\'s where 3rd Place began.',
                l
              )}
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              {s(
                <>ただ、イベントはあくまで<span className="text-navy font-semibold">きっかけ</span>。ここで出会った仲間と新しいことを始めたり、モチベーションを高め合ったり、困ったときに助け合えたり。そんな関係が自然と生まれる場所をつくることが、わたしたちの目的です。</>,
                <>But events are only the <span className="text-navy font-semibold">starting point</span>. Starting something new together, keeping each other motivated, helping each other through tough times — creating a place where those relationships grow naturally is what we&apos;re here for.</>,
                l
              )}
            </p>
          </div>

          {/* Photo Collage */}
          <Parallax speed={0.08} className="relative">
            {/* Glow */}
            <div className="absolute -top-8 -right-8 -mr-32 -mt-32 w-[32rem] h-[32rem] rounded-full glow-orange pointer-events-none" />
            <div className="grid grid-cols-3 gap-3 relative">
              <div className="col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image src={img("/images/events/curry/curry12.jpg", 'card')} alt="カレー会" fill sizes="(max-width: 768px) 60vw, 420px" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg mt-6">
                <Image src={img("/images/events/special/christmas.jpg", 'card')} alt="クリスマスパーティー" fill sizes="(max-width: 768px) 30vw, 210px" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg -mt-4">
                <Image src={img("/images/events/workshop/udon1.jpg", 'card')} alt="うどんワークショップ" fill sizes="(max-width: 768px) 30vw, 210px" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-2 relative aspect-[5/3] rounded-xl overflow-hidden shadow-lg -mt-4">
                <Image src={img("/images/events/special/bbq.jpg", 'card')} alt="BBQ" fill sizes="(max-width: 768px) 60vw, 420px" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </Parallax>
        </div>
        </ScrollReveal>

        {/* Values cards — 3rd Placeで生まれる4つの関係 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
          <p className="text-center text-slate-600 text-sm mb-8">
            {s('3rd Placeで生まれる、4つのつながり', 'Four kinds of connection that grow here', l)}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                n: '01',
                title: s('出会う', 'Meet', l),
                desc: s('同じ街で暮らす、いろんな立場の仲間と出会える', 'Meet people from all walks of life in the same city', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              },
              {
                n: '02',
                title: s('始める', 'Start', l),
                desc: s('関心の近い仲間と、新しいことを一緒に始められる', 'Start something new with people who share your interests', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
              },
              {
                n: '03',
                title: s('高め合う', 'Grow', l),
                desc: s('挑戦する仲間の存在が、自分のモチベーションになる', 'Friends who take on challenges keep you motivated too', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
              },
              {
                n: '04',
                title: s('助け合う', 'Support', l),
                desc: s('仕事・住まい・生活のことを、気軽に相談し合える', 'Ask each other about jobs, housing, and everyday life', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              },
            ].map((v, i) => (
              <StaggerReveal key={i} index={i}>
              <div className="group relative bg-navy rounded-2xl p-6 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default h-full">
                {/* Top accent line — expands on hover */}
                <div className="absolute top-0 left-0 h-1 w-8 group-hover:w-full bg-orange transition-all duration-500" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center text-orange flex-shrink-0">
                    {v.icon}
                  </div>
                  <span className="text-white/20 font-bold text-xs">{v.n}</span>
                </div>
                <p className="font-heading font-bold text-white text-lg mb-2">{v.title}</p>
                <p className="text-white/60 text-xs leading-relaxed">{v.desc}</p>
              </div>
              </StaggerReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO（どんな人がいる？）──────────── */}
      <section id="who" className="py-24 bg-cream">
        <ScrollReveal>
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span className="text-orange text-xs font-semibold uppercase tracking-widest">
            {s('メンバー', 'Members', l)}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4">
            {s('どんな人がいる？', 'Who\'s here?', l)}
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-5 max-w-2xl mx-auto">
            {s(
              '年齢も、メルボルンにいる理由もさまざま。共通しているのは「この街での毎日を、もっと豊かにしたい」という気持ちです。',
              'Different ages, different reasons for being in Melbourne. What we share is wanting to make life in this city richer.',
              l
            )}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {memberTypes.map((m, i) => (
              <StaggerReveal key={i} index={i}>
              <div className="bg-white rounded-2xl px-4 py-7 border border-gray-100 flex flex-col items-center gap-3 h-full">
                <div className="w-12 h-12 rounded-full bg-orange/10 text-orange flex items-center justify-center">
                  {m.icon}
                </div>
                <p className="text-navy font-bold text-sm">{m.label}</p>
              </div>
              </StaggerReveal>
            ))}
          </div>

          <p className="text-slate-600 text-xs mt-8">
            {s(
              'メンバー一人ひとりの趣味や関心ごとは、HUBの自己紹介で見られます。',
              'You can see each member\'s hobbies and interests in their HUB self-introduction.',
              l
            )}
          </p>
        </div>
        </ScrollReveal>
      </section>

      {/* ── EVENTS（つながりの入口）───────────── */}
      <GallerySection l={l} />

      {/* ── VOICES（参加者の声）──────────────── */}
      <section id="voices" className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-orange text-xs font-semibold uppercase tracking-widest">
                {s('参加者の声', 'Voices', l)}
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4">
                {s('出会いが、毎日を変えた。', 'One meeting changed everything.', l)}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {voices.map((v, i) => (
              <StaggerReveal key={i} index={i}>
              <figure className="relative bg-white rounded-2xl p-8 border border-gray-100 h-full flex flex-col">
                <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-widest uppercase bg-gray-100 text-slate-600 px-2 py-0.5 rounded-full">
                  Sample
                </span>
                <svg className="w-8 h-8 text-orange/40 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.41A1.76 1.76 0 017.17 9.4V6zm10 0A5.17 5.17 0 0012 11.17V18h6.83v-6.83h-3.42a1.76 1.76 0 011.76-1.77V6z" /></svg>
                <blockquote className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {v.text}
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy/10 text-navy flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <span className="text-navy text-sm font-semibold">{v.who}</span>
                </figcaption>
              </figure>
              </StaggerReveal>
            ))}
          </div>
          <p className="text-center text-slate-600 text-xs mt-6">
            {s('※ 掲載中の声はサンプルです。実際の参加者の声に順次差し替えます。', '* These are sample quotes and will be replaced with real member voices.', l)}
          </p>
        </div>
      </section>

      {/* ── HUB（参加方法）────────────────────── */}
      <section id="hub" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-orange text-xs font-semibold uppercase tracking-widest">
                {s('参加方法', 'How to Join', l)}
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4 leading-tight">
                {s(
                  <>仲間とつながるための<br />コミュニティアプリ「HUB」</>,
                  <>HUB — the app<br />that connects our community</>,
                  l
                )}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-5">
                {s(
                  '3rd Placeへの参加は、HUBへの登録から始まります。LINEでは見えないメンバーの趣味や関心ごとを、自己紹介で見える形に。気の合う仲間が見つけやすく、イベントにもHUBから参加できます。',
                  'Joining 3rd Place starts with signing up for HUB. Self-introductions make members\' hobbies and interests visible — something LINE can\'t do — so it\'s easier to find people you click with. You can join events right from HUB, too.',
                  l
                )}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Why HUB */}
            <div className="flex flex-col gap-4">
              {[
                {
                  title: s('メンバーの関心ごとが見える', 'See what members are into', l),
                  desc: s('趣味や関心ごと、メルボルンでやりたいこと。自己紹介を通じて、話が合いそうな仲間が見つかります。', 'Hobbies, interests, what they want to do in Melbourne — find people you\'ll get along with through their introductions.', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
                },
                {
                  title: s('イベントにかんたん参加', 'Join events easily', l),
                  desc: s('開催予定のイベントをHUBでチェックして、参加ボタンを押すだけ。', 'Check upcoming events on HUB and just tap to join.', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                },
                {
                  title: s('安心できるコミュニティ', 'A community you can trust', l),
                  desc: s('参加時には全員に確認事項と自己紹介をお願いしています。お互いを知ったうえでつながれる場所を大切にしています。', 'Everyone confirms our guidelines and writes an introduction when joining, so people connect knowing a little about each other.', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                },
              ].map((f, i) => (
                <StaggerReveal key={i} index={i}>
                <div className="flex gap-4 bg-cream rounded-2xl p-6 border border-gray-100">
                  <div className="w-11 h-11 rounded-xl bg-orange/10 text-orange flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-navy font-bold text-base mb-1.5">{f.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                </StaggerReveal>
              ))}
            </div>

            {/* App screenshots — TODO(hub-screens): public/images/hub/ にスクリーンショットを置いたら <Image> に差し替える */}
            <ScrollReveal direction="right">
            <div className="flex justify-center gap-4">
              {[0, 1].map(i => (
                <div
                  key={i}
                  className={`w-40 md:w-48 aspect-[9/19] rounded-[2rem] border-2 border-dashed border-navy/20 bg-cream flex flex-col items-center justify-center gap-2 text-slate-600 ${i === 1 ? 'mt-12' : ''}`}
                >
                  <svg className="w-8 h-8 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  <span className="text-xs">{s('画面イメージ（準備中）', 'Screenshot coming soon', l)}</span>
                </div>
              ))}
            </div>
            </ScrollReveal>
          </div>

          {/* 3 steps */}
          <ScrollReveal>
          <div className="mt-24">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy text-center mb-12">
              {s('はじめかたは、3ステップ', 'Three steps to get started', l)}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: s('HUBに登録', 'Sign up for HUB', l),
                  desc: s('確認事項を読んで同意し、LINEを登録します。', 'Read and agree to our guidelines, then connect your LINE.', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
                },
                {
                  step: '2',
                  title: s('自己紹介を書く', 'Write your introduction', l),
                  desc: s('趣味や関心ごと、メルボルンでやりたいことを書いてみよう。仲間とつながるきっかけになります。', 'Share your hobbies, interests, and what you want to do in Melbourne — it\'s how people find you.', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
                },
                {
                  step: '3',
                  title: s('イベントに参加', 'Join an event', l),
                  desc: s('気になるイベントの「参加」ボタンを押すだけ。みんな一人で来る人ばかりなので安心してね。', 'Tap "Join" on any event that catches your eye. Almost everyone comes solo, so no worries.', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                },
              ].map((item, i) => (
                <StaggerReveal key={i} index={i}>
                <div className="relative bg-cream rounded-xl p-8 border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-navy mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-orange/40" />
                    </div>
                  )}
                </div>
                </StaggerReveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href={EXTERNAL_LINKS.hub} target="_blank" rel="noopener noreferrer" className="animate-pulse-glow inline-flex items-center gap-2 bg-orange text-white font-semibold px-10 py-4 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer">
                {s('HUBに登録して参加する', 'Sign up on HUB', l)}
                <ExternalIcon />
              </a>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────── */}
      <section className="py-28 bg-navy">
        <ScrollReveal direction="right">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('創設者', 'Founder', l)}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4">
              {s('3rd Placeの原点', 'The Origin of 3rd Place', l)}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-5 mb-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange/40">
                  <Image src={img("/images/team/masa.jpg", 'thumb')} alt="野口まさ" fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{s('野口 まさ', 'Masa Noguchi', l)}</p>
                  <p className="text-orange text-sm font-medium mt-0.5">{s('創設者 · メルボルン在住大学教授', 'Founder · University Professor in Melbourne', l)}</p>
                  <p className="text-white/40 text-xs mt-0.5">Melbourne, Australia</p>
                </div>
              </div>

              <blockquote className="border-l-2 border-orange/60 pl-6 mb-8">
                <p className="text-white/80 leading-relaxed text-base">
                  {s(
                    '「メルボルンで過ごす中で、孤独や困難に直面する仲間たちの姿を数多く見てきました。家でも職場でもない、ありのままの自分でいられる『第3の居場所』があれば。そんな思いから、この3rd Placeを立ち上げました。」',
                    '"Living in Melbourne, I saw so many friends struggle with loneliness and hardship. What if there was a place that wasn\'t home, wasn\'t work — somewhere you could just be yourself? That\'s why I started 3rd Place."',
                    l
                  )}
                </p>
              </blockquote>

              <p className="text-white/60 leading-relaxed text-sm mb-4">
                {s(
                  'メルボルンの大学で教鞭をとる野口まささんは、学生たちの孤独や経済的困難を間近で見てきました。その経験が、世代や立場を超えて支え合えるコミュニティ「3rd Place」を生み出す原動力となっています。',
                  'As a university professor in Melbourne, Masa has witnessed firsthand the loneliness and financial struggles faced by young people. That experience became the driving force behind 3rd Place — a community where people support each other across generations and backgrounds.',
                  l
                )}
              </p>

              <p className="text-white/60 leading-relaxed text-sm">
                {s(
                  '大切にしているのは「真心」。互いに助け合い、ここでの経験を糧に、将来は日本、そして世界をより良く変えていける。そんな皆さんの成長を支える場所でありたいという想いで、今日も活動を続けています。',
                  'The value he holds most dear is "magokoro" — sincere, selfless goodwill. He believes that by supporting each other here, members can grow to make Japan and the world a better place.',
                  l
                )}
              </p>
            </div>

            <div className="bg-navy-light rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-orange text-xs font-semibold uppercase tracking-widest">{s('誕生秘話', 'Origin Story', l)}</p>
                  <h3 className="font-heading text-white font-bold text-lg mt-0.5">{s('カレー会の始まり', "The Story of the Curry Night", l)}</h3>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-sm mb-5">
                {s(
                  'メルボルンの記録的なインフレの影響で、若者たちが「トーストだけ」「具のないラーメンだけ」で空腹をしのいでいる——そんな切実な現実を目の当たりにした野口まささんの、「心まで荒んでほしくない」という親心から、カレー会は始まりました。',
                  "As Melbourne's cost of living soared, Masa saw young people surviving on plain toast and ramen with no toppings. He couldn't bear the thought of their spirits breaking too. That's where the curry night was born.",
                  l
                )}
              </p>
              <p className="text-white/60 leading-relaxed text-sm">
                {s(
                  '日本のソウルフードであるカレーの香りと温かさを通じて、孤独を解消し、誰もが笑顔になれる場所を作ること。それが、このカレー会に込められた願いです。',
                  "Using the warmth of Japan's soul food to dissolve loneliness and bring smiles — that's the wish behind every curry night.",
                  l
                )}
              </p>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2">
                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/40 text-sm">{s('毎月30〜40人が集まる、無料のカレー会', 'Free monthly curry night — 30–40 people', l)}</span>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Wave divider: navy → cream */}
      <div className="relative -mt-px">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 0h1440v16c-240 26-480 40-720 40S240 42 0 16V0z" fill="#0B1F3A" />
        </svg>
      </div>

      {/* ── FAQ ──────────────────────────────── */}
      <section id="faq" className="py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4">
              {s('よくある質問', 'Frequently Asked Questions', l)}
            </h2>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100">
            <FAQSection items={faqItems[l]} />
          </div>
        </div>
      </section>

      {/* Wave divider: cream → navy */}
      <div className="relative -mb-px">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 56h1440V40c-240-26-480-40-720-40S240 14 0 40v16z" fill="#0B1F3A" />
        </svg>
      </div>

      {/* ── FINAL CTA ────────────────────────── */}
      <section id="cta" className="py-28 bg-navy relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full glow-orange-soft pointer-events-none" />
        <ScrollReveal>
        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
            {s(
              <>出会いを、<br className="md:hidden" />その先のつながりへ。</>,
              <>From meeting<br className="md:hidden" /> to real connection.</>,
              l
            )}
          </h2>
          <p className="text-white/60 mt-5 text-sm md:text-base leading-relaxed">
            {s(
              'まずはHUBに登録して、自己紹介を書いてみよう。あなたと気の合う仲間が、きっと見つかります。',
              'Start by signing up on HUB and writing your introduction. Someone you\'ll click with is waiting.',
              l
            )}
          </p>
          <div className="mt-10">
            <a href={EXTERNAL_LINKS.hub} target="_blank" rel="noopener noreferrer" className="animate-pulse-glow inline-flex items-center gap-2 bg-orange text-white font-semibold px-10 py-4 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer">
              {s('HUBに登録して参加する', 'Sign up on HUB', l)}
              <ExternalIcon />
            </a>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm mb-3">
              {s('日本にいる方・渡航を検討中の方は', 'In Japan or thinking about moving?', l)}
            </p>
            <Link href="/japan" className="inline-flex items-center gap-2 text-white hover:text-orange text-sm font-semibold transition-colors duration-200 cursor-pointer">
              {s('東京イベント（3rd Place Japan）を見る', 'See 3rd Place Japan (Tokyo)', l)}
              <ArrowRight />
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="py-12 bg-ink border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src={img("/images/3rd-place-melbourne.jpg", 'thumb')} alt="3rd Place" width={30} height={30} sizes="30px" className="object-contain rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">3rd Place</p>
              <p className="text-white/40 text-xs">Melbourne Japanese Community</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#purpose" className="text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer">{s('わたしたちについて', 'About', l)}</a>
            <a href={EXTERNAL_LINKS.hub} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer">HUB</a>
            <Link href="/japan" className="text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer">3rd Place Japan</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href={EXTERNAL_LINKS.instagramMelbourne} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={EXTERNAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={EXTERNAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="TikTok">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <p className="text-white/30 text-xs">© 2026 3rd Place. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
