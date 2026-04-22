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

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en

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

  const faqItems = {
    ja: [
      { q: 'カレー会に参加するには何が必要ですか？', a: '特別な準備は何もいらないですよ！まずは運営のLINEを友だち追加してください。追加後、運営から参加申請フォームをお送りします。内容を確認次第、コミュニティLINEグループへご招待します。費用はもちろん無料です。' },
      { q: '初めてで一人なのですが、大丈夫ですか？', a: '全然大丈夫です！毎回5〜10人くらい初参加の方がいて、ほぼみんな一人で来てますよ。到着したら運営メンバーから声をかけるので、安心してきてくださいね。' },
      { q: '英語が話せなくても大丈夫ですか？', a: '全然問題ないです！コミュニティ内は基本日本語なので安心してください。英語交流の機会もあるけど、もちろん参加は自由です。' },
      { q: 'ワーホリ以外の方も参加できますか？', a: 'もちろん！ワーホリ・留学・駐在・永住者・旅行者まで、いろんな人が参加してます。メルボルンに関わるすべての日本人を歓迎してるよ。' },
      { q: 'メルボルンに着いてからでも参加できますか？', a: 'もちろん！渡航前でも到着直後でも、滞在中でも帰国前でも、どんなタイミングでも歓迎ですよ。' },
      { q: 'カレー会の参加費はかかりますか？', a: 'カレー会は完全無料！まごころ精神のもと、これからもずっと無料でやっていきます。' },
      { q: '運営に参加したい場合はどうすればいいですか？', a: <>ぜひぜひ！メルボルン現地の運営メンバーを絶賛募集中です。<a href={EXTERNAL_LINKS.melbourneStaffApplyForm} target="_blank" rel="noopener noreferrer" className="text-orange underline hover:text-orange-dark transition-colors duration-200 cursor-pointer">こちらのフォーム</a>からお気軽にご応募ください。</> },
    ],
    en: [
      { q: 'What do I need to join the Curry Gathering?', a: 'Nothing to prepare! Just add us on LINE. Once added, we\'ll send you a short application form. After a quick review, you\'ll be invited into the community LINE group. And yep, it\'s totally free.' },
      { q: 'Is it okay to come alone for the first time?', a: 'Totally fine! Every event has 5–10 first-timers, and almost everyone shows up solo. Our team will say hi when you arrive, so don\'t stress.' },
      { q: 'Is it okay if I can\'t speak English?', a: 'No problem at all! The community runs mostly in Japanese. There are English exchange opportunities too, but jumping in is totally up to you.' },
      { q: 'Can people other than working holidaymakers join?', a: 'Of course! WHV folks, students, expats, PRs, travelers — anyone with a Melbourne connection is welcome here.' },
      { q: 'Can I join after arriving in Melbourne?', a: 'Yep, anytime works! Before you leave, right after you land, mid-stay, or right before heading home — whenever.' },
      { q: 'Is there a fee for the Curry Gathering?', a: 'Curry Night is completely free — always has been, always will be. That\'s the spirit of magokoro.' },
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
        <ScrollGlow className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-orange/10 blur-[120px] pointer-events-none" range={60} />
        <ScrollGlow className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-orange/5 blur-[80px] pointer-events-none" range={40} />

        {/* Top photo strip — scrolls right */}
        <div className="relative z-10 overflow-hidden mt-20 mb-8 opacity-80">
          <div className="flex w-max animate-scroll-right">
            {[...heroStripTop, ...heroStripTop].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden ml-3">
                <Image src={src} alt="" width={224} height={144} className="object-cover w-full h-full" />
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

          <p className="animate-fade-up delay-300 text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {s(
              'ワーホリ・留学・駐在・永住者が集まる、メルボルンの日系コミュニティ。先輩たちのリアルな経験が、あなたのメルボルン生活を豊かにします。',
              'A Japanese community in Melbourne for working holidaymakers, students, expats, and residents.',
              l
            )}
          </p>

          <div className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={EXTERNAL_LINKS.lineGroup} target="_blank" rel="noopener noreferrer" className="animate-pulse-glow bg-orange text-white font-semibold px-8 py-3.5 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
              {s('LINEで参加する', 'Join via LINE', l)}
            </a>
            <a href="#about" className="border border-white/25 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200 text-sm cursor-pointer">
              {s('3rd Placeってどんなとこ？', 'What\'s this place?', l)}
            </a>
          </div>
          <div className="animate-fade-up delay-500 mt-6">
            <Link href="/japan" className="inline-flex items-center gap-2 border border-white/40 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 text-sm px-5 py-2 rounded-full transition-all duration-200 cursor-pointer">
              {s('日本からメルボルンを目指している方はこちら', 'Planning your move from Japan?', l)}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* Bottom photo strip — scrolls left */}
        <div className="relative z-10 overflow-hidden mt-8 mb-4 opacity-80">
          <div className="flex w-max animate-scroll-left">
            {[...heroStripBottom, ...heroStripBottom].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden ml-3">
                <Image src={src} alt="" width={224} height={144} className="object-cover w-full h-full" />
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
              <p className="text-slate-500 text-sm mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEXT EVENT BANNER ────────────────── */}
      <section id="next-event" className="bg-orange py-5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-white font-bold text-sm">{s('次回カレー会', 'Next Curry Night', l)}</span>
          </div>
          <span className="text-white/90 text-sm">
            {s('5月23日（土）18:00〜22:00 @ みんなの館', 'May 23 (Sat) 18:00–22:00 @ Minna no Yakata', l)}
          </span>
          <span className="text-white/70 text-xs">
            {s('※ 住所はLINEグループでお知らせします', '* Address shared in LINE group', l)}
          </span>
          <a href={EXTERNAL_LINKS.lineGroup} target="_blank" rel="noopener noreferrer"
            className="bg-white text-orange font-bold text-xs px-4 py-2 rounded-full hover:bg-cream transition-colors duration-200 cursor-pointer whitespace-nowrap">
            {s('LINEを追加する', 'Add on LINE', l)}
          </a>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────── */}
      <section id="about" className="py-28 bg-white">
        {/* Top: Text + Photo Collage */}
        <ScrollReveal direction="left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('わたしたちについて', 'About Us', l)}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4 mb-6 leading-tight">
              {s(
                <>なぜ、3rd Placeは<br className="md:hidden" />生まれたのか</>,
                <>Why 3rd Place<br className="md:hidden" />Was Founded</>,
                l
              )}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {s(
                'オーストラリアに来て間もない日本人の多くは、知り合いが少なく孤独な思いをしています。現地の日本人が連携し、情報を共有し合える「第3の場所」をつくりたい——それが原点です。',
                'Many Japanese people who first come to Australia feel isolated and alone. Our mission was to create a "third place" where local Japanese can connect, share knowledge, and support each other.',
                l
              )}
            </p>
          </div>

          {/* Photo Collage */}
          <Parallax speed={0.08} className="relative">
            {/* Glow */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-orange/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="grid grid-cols-3 gap-3 relative">
              <div className="col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/events/curry/curry12.jpg" alt="カレー会" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg mt-6">
                <Image src="/images/events/special/christmas.jpg" alt="クリスマスパーティー" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg -mt-4">
                <Image src="/images/events/workshop/udon1.jpg" alt="うどんワークショップ" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-2 relative aspect-[5/3] rounded-xl overflow-hidden shadow-lg -mt-4">
                <Image src="/images/events/special/bbq.jpg" alt="BBQ" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </Parallax>
        </div>
        </ScrollReveal>

        {/* Values cards — staggered reveal */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                n: '01',
                title: s('仲間ができる', 'Make Friends', l),
                desc: s('一人で来ても、帰る頃には友達がいる', 'Come alone, leave with friends', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              },
              {
                n: '02',
                title: s('情報が手に入る', 'Get Real Info', l),
                desc: s('仕事・住居・生活のリアルな話が聞ける', 'Hear real stories about jobs, housing, and life', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              },
              {
                n: '03',
                title: s('居場所がある', 'A Place to Belong', l),
                desc: s('困った時に頼れるコミュニティ', 'A community you can count on when you need it', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg>,
              },
              {
                n: '04',
                title: s('自分で動ける', 'Stand On Your Own', l),
                desc: s('誰かに依存せず、自分の足で進める', 'Move forward on your own two feet', l),
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
              },
            ].map((v, i) => (
              <StaggerReveal key={i} index={i}>
              <div className="group relative bg-navy rounded-2xl p-6 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default">
                {/* Top accent line — expands on hover */}
                <div className="absolute top-0 left-0 h-1 w-8 group-hover:w-full bg-orange transition-all duration-500" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center text-orange flex-shrink-0">
                    {v.icon}
                  </div>
                  <span className="text-white/20 font-bold text-xs">{v.n}</span>
                </div>
                <p className="font-bold text-white text-sm mb-2">{v.title}</p>
                <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
              </div>
              </StaggerReveal>
            ))}
          </div>
        </div>

        {/* ── 参加フロー図解 ── */}
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
          <div className="text-center mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('はじめかた', 'How to Join', l)}
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy mt-4">
              {s('たった3ステップで、仲間に出会えます', 'Just 3 steps and you\'ll find your crew', l)}
            </h3>
            <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
              {s('難しいことは何もないよ！まずはのぞいてみてね', 'Nothing tricky at all — just come take a peek!', l)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                step: '1',
                title: s('運営のLINEを追加', 'Add our LINE', l),
                desc: s('下のボタンから運営のLINEを友だち追加してください。追加後、運営から簡単な参加申請フォームをお送りします。', 'Tap the button to add us on LINE. Once added, we\'ll send you a quick application form.', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                ),
              },
              {
                step: '2',
                title: s('確認後、コミュニティに招待', 'Reviewed & invited', l),
                desc: s('フォームの内容を確認次第、コミュニティLINEグループへご招待します！', 'Once we review your form, we\'ll invite you straight into the community LINE group!', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                ),
              },
              {
                step: '3',
                title: s('イベントに来てみる', 'Show up to an event', l),
                desc: s('メルボルンならカレー会、日本なら東京イベントへ遊びに来てみてね。みんな一人で来る人ばかりだから、「ぼっちになったらどうしよう…」って心配はいりません！', 'Come hang out at curry night in Melbourne, or the Tokyo event in Japan! Almost everyone shows up solo, so don\'t worry about being "that person alone in the corner."', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ),
              },
            ].map((item, i) => (
              <StaggerReveal key={i} index={i}>
              <div className="relative bg-cream rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-heading text-lg font-bold text-navy mb-3">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                {i === 2 && (
                  <Link href="/japan" className="inline-flex items-center gap-1.5 text-orange hover:text-orange-dark text-xs font-semibold mb-3 transition-colors duration-200 cursor-pointer">
                    {s('東京イベントの詳細はこちら', 'Tokyo Event Details', l)}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                )}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-orange/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                )}
              </div>
              </StaggerReveal>
            ))}
          </div>

          {/* 渡航サポート開発中の一言お知らせ */}
          <div className="rounded-2xl px-6 py-5 border border-gray-200 bg-white flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="inline-block bg-orange/10 text-orange text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
              {s('お知らせ', 'Note', l)}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {s(
                '渡航サポートサービスは現在開発中です。詳細はLINEグループで随時公開していきますね。',
                'A pre-departure support service is in the works. We\'ll share details in the LINE group as things come together.',
                l
              )}
            </p>
          </div>
        </div>
        </ScrollReveal>
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
                  <Image src="/images/team/masa.jpg" alt="野口まさ" fill className="object-cover" />
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

              <p className="text-white/50 leading-relaxed text-sm">
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
                  <h3 className="text-white font-bold text-lg mt-0.5">{s('カレー会の始まり', "The Story of the Curry Night", l)}</h3>
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
                <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/30 text-sm">{s('毎月30〜40人が集まる、無料のカレー会', 'Free monthly curry night — 30–40 people', l)}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#cta" className="inline-flex items-center gap-2 text-white/50 hover:text-orange text-sm font-medium transition-colors duration-200 cursor-pointer">
              {s('カレー会に参加する', "Join the Curry Night", l)}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </a>
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

      {/* ── GALLERY ──────────────────────────── */}
      <GallerySection l={l} />


      {/* ── TEAM ─────────────────────────────── */}
      <section id="team" className="py-20 bg-cream">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('運営チーム', 'Our Team', l)}
            </span>
            <p className="text-slate-500 text-sm mt-3">
              {s('日本とメルボルンをつなぐ、元ワーホリメンバーが運営しています', 'Run by former WHV members bridging Japan and Melbourne', l)}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'ヒロト', nameEn: 'Hiroto', bio: s('メルボルンワーホリ2024年経験。ウクレレと山登りが趣味。', 'Melbourne WHV 2024. Loves ukulele and hiking.', l), img: '/images/team/hiroto.png', scale: 'scale-100', pos: '60% 30%' },
              { name: 'ダイチ', nameEn: 'Daichi', bio: s('メルボルンワーホリ2024年経験。海外旅行とサッカーが趣味。', 'Melbourne WHV 2024. Into travel and football.', l), img: '/images/team/daichi-new.jpg', scale: 'scale-125', pos: 'center center' },
              { name: 'あさひ', nameEn: 'Asahi', bio: s('世界一周で約35カ国を経験。ランニングとサウナが趣味。', 'Traveled to 35+ countries. Loves running and sauna.', l), img: '/images/team/asahi-new.jpg', scale: 'scale-110', pos: 'center center' },
              { name: 'みなと', nameEn: 'Minato', bio: s('メルボルンワーホリ2024年経験。中国語も話せるムードメーカー。', 'Melbourne WHV 2024. Speaks Chinese. The mood maker.', l), img: '/images/team/minato-new2.png', scale: 'scale-110', pos: 'center 40%' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-orange/20 mb-3">
                  <Image src={m.img} alt={m.name} fill className={`object-cover ${m.scale}`} style={{ objectPosition: m.pos }} sizes="112px" />
                </div>
                <p className="font-bold text-navy text-base">{l === 'ja' ? m.name : m.nameEn}</p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Subtle divider between Team and FAQ (both cream) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200/60" />
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
      <section id="cta" className="py-28 bg-navy">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
              {s(
                <>あなたは今、<br className="md:hidden" />どこにいますか？</>,
                'Where are you right now?',
                l
              )}
            </h2>
            <p className="text-white/50 mt-4 text-sm">
              {s('あなたの状況に合う入口を選んでね', 'Pick the entrance that fits you', l)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Already in Melbourne */}
            <div className="bg-navy-light rounded-xl p-8 border border-white/10 hover:border-orange/30 transition-colors duration-200 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🇦🇺</span>
                <h3 className="text-xl font-bold text-white">
                  {s('すでにメルボルンにいる方', 'Already in Melbourne', l)}
                </h3>
              </div>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
                <Image src="/images/events/curry/curry12.jpg" alt="カレー会" fill className="object-cover" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-7 flex-grow">
                {s(
                  'まずは運営のLINEを友だち追加→届くフォームに答えるだけ。確認後、カレー会や他のイベントに遊びに来てね。月1ペースで集まってます。',
                  'Just add our organizer on LINE and fill out the form we send you. Once reviewed, come hang out at curry nights and other events — we meet monthly.',
                  l
                )}
              </p>
              <div className="flex flex-col gap-3">
                <a href={EXTERNAL_LINKS.lineGroup} target="_blank" rel="noopener noreferrer"
                  className="bg-orange text-white font-semibold px-6 py-3 rounded-xl text-center hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                  {s('運営のLINEを追加する', 'Add us on LINE', l)}
                </a>
                <p className="text-white/40 text-xs text-center">
                  {s('LINE追加→届くフォームに回答→確認後にご招待。シンプルな3ステップです。', 'Add us → fill the form we send → invited after review. Simple 3 steps.', l)}
                </p>
              </div>
              <p className="text-white/50 text-xs text-center mt-4">
                {s('すでにメンバーの方 → ', 'Already a member? → ', l)}
                <a href="#next-event" className="text-orange hover:text-orange-dark underline underline-offset-2 transition-colors duration-200 cursor-pointer">
                  {s('次回開催日をチェック ↑', 'Check next event date ↑', l)}
                </a>
              </p>
            </div>

            {/* Heading to Melbourne */}
            <div className="bg-orange rounded-xl p-8 flex flex-col hover:bg-orange-dark transition-colors duration-200">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <h3 className="text-xl font-bold text-white">
                  {s('これからメルボルンに行く方', 'Heading to Melbourne', l)}
                </h3>
              </div>
              <p className="text-white/70 text-xs mb-5">
                {s('日本にいる方・渡航を検討中の方はこちら', 'For those in Japan or considering the move', l)}
              </p>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
                <Image src="/images/japan/event1.jpg" alt="3rd Place Japan" fill className="object-cover" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-7 flex-grow">
                {s(
                  '渡航前の不安は、先輩の話と準備で全部解消しちゃいましょう。3つの入口があります。',
                  'Turn pre-departure nerves into confidence with senpai stories and real prep. Two ways in:',
                  l
                )}
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/japan"
                  className="bg-white text-orange font-bold px-6 py-3 rounded-xl text-center hover:bg-cream transition-colors duration-200 text-sm cursor-pointer">
                  {s('東京イベント（3rd Place Japan）を見る', 'See 3rd Place Japan (Tokyo)', l)}
                </Link>
                <a href={EXTERNAL_LINKS.lineGroup} target="_blank" rel="noopener noreferrer"
                  className="animate-pulse-glow bg-white/15 border border-white/40 text-white font-medium px-6 py-3 rounded-xl text-center hover:bg-white/25 transition-colors duration-200 text-sm cursor-pointer">
                  {s('または、まずLINEを追加する', 'Or just add us on LINE', l)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="py-12 bg-ink border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/images/3rd-place-melbourne.jpg" alt="3rd Place" width={30} height={30} className="object-contain rounded-lg" />
            <div>
              <p className="text-white font-bold text-sm">3rd Place</p>
              <p className="text-white/30 text-xs">Melbourne Japanese Community</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">{s('わたしたちについて', 'About', l)}</a>
            <Link href="/japan" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">3rd Place Japan</Link>
            <a href="#team" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">{s('チーム', 'Team', l)}</a>
          </div>
          <div className="flex items-center gap-4">
            <a href={EXTERNAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={EXTERNAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <p className="text-white/20 text-xs">© 2026 3rd Place. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
