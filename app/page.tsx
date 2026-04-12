'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FAQSection from '../components/FAQ'
import ScrollReveal from '../components/ScrollReveal'
import GallerySection from '../components/GallerySection'

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en

export default function Home() {
  const [lang, setLang] = useState<Lang>('ja')
  const l = lang

  const faqItems = {
    ja: [
      { q: 'カレー会に参加するには何が必要ですか？', a: '特別な準備は必要ありません。まずはLINEグループに参加してメッセージをお送りください。次回のカレー会の詳細をお知らせします。費用は無料です。' },
      { q: '初めてで一人なのですが、大丈夫ですか？', a: '全く問題ありません。毎回5〜10人の初参加者がいて、ほとんどの方が一人で来られています。到着したら運営メンバーが声をかけるので安心してください。' },
      { q: '英語が話せなくても大丈夫ですか？', a: 'まったく問題ありません。コミュニティ内は基本的に日本語でのコミュニケーションです。英語交流の機会も設けていますが、参加は任意です。' },
      { q: 'ワーホリ以外の方も参加できますか？', a: 'もちろんです。ワーホリ・留学・駐在・永住者・旅行者など、様々な方が参加されています。メルボルンに関わるすべての日本人を歓迎します。' },
      { q: 'メルボルンに着いてからでも参加できますか？', a: 'はい、どのタイミングでも歓迎です。渡航前・到着直後・滞在中・帰国前、いつでもご参加いただけます。' },
      { q: 'カレー会の参加費はかかりますか？', a: 'カレー会は完全無料です。まごころ精神のもと、永久無料で運営しています。' },
      { q: '3rd Place HubとLINEグループは別ですか？', a: 'はい、別物です。LINEグループは誰でも無料で参加できるコミュニティです。3rd Place Hubは仕事・住居サポートの有料サービスで、現在開発中です。' },
      { q: '運営に参加したい場合はどうすればいいですか？', a: 'LINEグループからお気軽にご連絡ください。現在、メルボルン現地での運営メンバーを随時募集しています。' },
    ],
    en: [
      { q: 'What do I need to join the Curry Gathering?', a: 'No special preparation needed. Just join our LINE group and send us a message. We\'ll share the details for the next gathering. It\'s completely free.' },
      { q: 'Is it okay to come alone for the first time?', a: 'Absolutely. Every event has 5–10 first-timers, and most come solo. Our team will greet you when you arrive — no need to worry.' },
      { q: 'Is it okay if I can\'t speak English?', a: 'Absolutely. Communication within the community is primarily in Japanese. English exchange opportunities are available but entirely optional.' },
      { q: 'Can people other than working holidaymakers join?', a: 'Of course. We welcome working holidaymakers, students, expats, permanent residents, and travelers — anyone connected to Melbourne.' },
      { q: 'Can I join after arriving in Melbourne?', a: 'Yes, you\'re welcome at any stage — before departure, right after arrival, during your stay, or before heading home.' },
      { q: 'Is there a fee for the Curry Gathering?', a: 'The Curry Gathering is completely free, and will always be. That\'s the spirit of magokoro.' },
      { q: 'Is 3rd Place Hub different from the LINE group?', a: 'Yes. The LINE group is a free community open to everyone. 3rd Place Hub is a paid service for job and housing support, currently in development.' },
      { q: 'How can I get involved in operations?', a: 'Feel free to reach out via our LINE group. We\'re always looking for local members in Melbourne to join our operations team.' },
    ],
  }

  return (
    <main className="bg-cream">
      <Navbar lang={lang} setLang={setLang} />

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <Image src="/images/events/curry1.jpg" alt="" fill className="object-cover opacity-15" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/90 to-navy" />
        </div>

        {/* Subtle background glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-orange/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-orange/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <div className="animate-fade-in inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
              Melbourne · Japanese Community
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
            {s(
              <>メルボルンで、<br /><span className="text-orange">仲間</span>と出会い、<br />自分を広げる場所。</>,
              <><span className="text-orange">Meet friends.</span><br />Grow yourself.<br />Melbourne.</>,
              l
            )}
          </h1>

          <p className="animate-fade-up delay-300 text-white/50 text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            {s(
              'ワーホリ・留学・駐在・永住者が集まる、メルボルンの日本人コミュニティ。先輩たちのリアルな経験が、あなたのメルボルン生活を豊かにします。',
              'A Japanese community in Melbourne for working holidaymakers, students, expats, and residents.',
              l
            )}
          </p>

          <div className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://line.me/ti/p/5ET_QCNdpX" target="_blank" rel="noopener noreferrer" className="bg-orange text-white font-semibold px-8 py-3.5 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
              {s('LINEグループに参加する', 'Join LINE Group', l)}
            </a>
            <a href="#about" className="border border-white/25 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200 text-sm cursor-pointer">
              {s('3rd Placeとは', 'About Us', l)}
            </a>
          </div>
          <div className="animate-fade-up delay-500 mt-8">
            <Link href="/japan" className="inline-flex items-center gap-2 border border-white/40 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 text-sm px-5 py-2 rounded-full transition-all duration-200 cursor-pointer">
              {s('日本からメルボルンを目指している方はこちら', 'Planning your move from Japan?', l)}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
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
            { num: '20+', unit: s('回', '', l), label: s('カレー会開催', 'Curry Nights Held', l) },
            { num: '30〜40', unit: s('人', '', l), label: s('毎月のカレー会', 'Monthly Attendance', l) },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-navy">
                {stat.num}
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
            {s('4月18日（土）18:00〜22:00 @ みんなの館', 'Apr 18 (Sat) 18:00–22:00 @ Minna no Yakata', l)}
          </span>
          <span className="text-white/70 text-xs">
            {s('※ 住所はLINEグループでお知らせします', '* Address shared in LINE group', l)}
          </span>
          <a href="https://line.me/ti/p/5ET_QCNdpX" target="_blank" rel="noopener noreferrer"
            className="bg-white text-orange font-bold text-xs px-4 py-2 rounded-full hover:bg-cream transition-colors duration-200 cursor-pointer whitespace-nowrap">
            {s('LINEで参加する', 'Join via LINE', l)}
          </a>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────── */}
      <section id="about" className="py-28 bg-white">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('わたしたちについて', 'About Us', l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-4 mb-6 leading-tight">
              {s('なぜ、3rd Placeは\n生まれたのか', 'Why 3rd Place\nWas Founded', l)}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-10 text-base">
              {s(
                'オーストラリアに来て間もない日本人の多くは、知り合いが少なく孤独な思いをしています。現地の日本人が連携し、情報を共有し合える「第3の場所」をつくりたい——それが原点です。',
                'Many Japanese people who first come to Australia feel isolated and alone. Our mission was to create a "third place" where local Japanese can connect, share knowledge, and support each other.',
                l
              )}
            </p>
            <div className="space-y-6">
              {[
                { n: '01', title: s('まごころ', 'Genuine Care', l), desc: s('見返りを求めない善意でつながるコミュニティ', 'A community built on genuine goodwill without expectation', l) },
                { n: '02', title: s('バトンパス', 'Pay It Forward', l), desc: s('先輩から後輩へ、経験と情報を引き継ぐ循環', 'Passing on experience and knowledge from seniors to newcomers', l) },
                { n: '03', title: s('透明性', 'Transparency', l), desc: s('外からも中からも、開かれた誠実なコミュニティ', 'An honest, open community visible from inside and out', l) },
                { n: '04', title: s('自走力', 'Empowerment', l), desc: s('一人ひとりが自分で動ける状態をつくる', 'Preparing each person to act confidently on their own', l) },
              ].map((v, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span className="text-orange font-bold text-sm mt-0.5 flex-shrink-0 w-7">{v.n}</span>
                  <div>
                    <p className="font-semibold text-navy text-sm">{v.title}</p>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8 shadow-lg">
              <Image src="/images/events/curry1.jpg" alt="カレー会" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden -mt-8 shadow-lg">
              <Image src="/images/japan/farewell1.jpg" alt="いってらっしゃい会" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* ── 参加フロー図解 ── */}
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
          <div className="text-center mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('はじめかた', 'How to Join', l)}
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4">
              {s('3つのステップで、仲間に出会える', 'Three steps to find your crew', l)}
            </h3>
            <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
              {s('難しいことは何もありません。まずは気軽に覗いてみてください。', 'Nothing complicated. Just start with a peek.', l)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                step: '1',
                title: s('LINEグループに入る', 'Join the LINE Group', l),
                desc: s('ボタンひとつで参加完了。挨拶も不要です。次回イベントの告知が届くのを待つだけ。', 'One tap and you\'re in. No intro needed. Just wait for the next event announcement.', l),
                sub: s('所要時間：10秒', 'Takes: 10 seconds', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                ),
              },
              {
                step: '2',
                title: s('イベントに来てみる', 'Show up to an event', l),
                desc: s('メルボルンならカレー会、日本なら東京イベントへ。一人で来る方がほとんどなので安心してください。', 'Curry night in Melbourne, or Tokyo event in Japan. Most people come alone — you\'ll fit right in.', l),
                sub: s('毎月開催・予約不要', 'Monthly · No reservation', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ),
              },
              {
                step: '3',
                title: s('仲間と情報が手に入る', 'Get friends & real info', l),
                desc: s('気づいたら友達ができて、仕事・住居・生活のリアルな情報も自然と集まってきます。', 'Before you know it, you\'ll have friends — and real intel on jobs, housing, and life.', l),
                sub: s('ここからがスタート', 'This is where it begins', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="relative bg-cream rounded-2xl p-8 border border-gray-100">
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
                <p className="text-orange text-xs font-semibold">{item.sub}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-orange/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>

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
                  '先輩の引き継ぎノート・渡航前Zoom・推薦状・到着後フォローが揃った有料パッケージ。自分で動ける状態を作ります。',
                  'A paid package with handover notes, pre-departure Zoom, recommendation letter, and post-arrival support.',
                  l
                )}
              </p>
            </div>
            <Link href="/hub" className="bg-white/10 text-white/80 font-medium px-6 py-3 rounded-xl hover:bg-white/15 transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap flex-shrink-0">
              {s('詳しく見る →', 'Learn more →', l)}
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── FOUNDER ──────────────────────────── */}
      <section className="py-28 bg-navy">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('創設者', 'Founder', l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-4">
              {s('3rd Placeの原点', 'The Origin of 3rd Place', l)}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-5 mb-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange/40">
                  <Image src="/images/team/masa.jpg" alt="野口マサ" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{s('野口 マサ', 'Masa Noguchi', l)}</p>
                  <p className="text-orange text-sm font-medium mt-0.5">{s('創設者 · みんなの「マサさん」', 'Founder · "Masa-san"', l)}</p>
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
                  <h3 className="text-white font-bold text-lg mt-0.5">{s('マサカレーの始まり', "The Story of Masa's Curry", l)}</h3>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-sm mb-5">
                {s(
                  'メルボルンの記録的なインフレの影響で、若者たちが「トーストだけ」「具のないラーメンだけ」で空腹をしのいでいる——そんな切実な現実を目の当たりにしたマサさんの、「心まで荒んでほしくない」という親心から、カレー会は始まりました。',
                  "As Melbourne's cost of living soared, Masa saw young people surviving on plain toast and ramen with no toppings. He couldn't bear the thought of their spirits breaking too. That's where the curry night was born.",
                  l
                )}
              </p>
              <p className="text-white/60 leading-relaxed text-sm">
                {s(
                  '日本のソウルフードであるカレーの香りと温かさを通じて、孤独を解消し、誰もが笑顔になれる場所を作ること。それが「マサカレー」に込められた願いです。',
                  "Using the warmth of Japan's soul food to dissolve loneliness and bring smiles — that's the wish behind every pot of Masa's curry.",
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
              {s('マサさんのカレー会に参加する', "Join Masa's Curry Night", l)}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </a>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── GALLERY ──────────────────────────── */}
      <GallerySection l={l} />


      {/* ── TEAM ─────────────────────────────── */}
      <section id="team" className="py-28 bg-white">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('運営チーム', 'Our Team', l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-4">
              {s('メンバーを知る', 'Meet the Team', l)}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { name: 'ヒロト', nameEn: 'Hiroto', role: s('代表 / オペレーション', 'Lead / Operations', l), bio: s('全体統括・Notion/DB・KPI管理。3rd Placeを仕組みとして動かす。', 'Oversees operations, Notion/DB, and KPIs.', l), img: '/images/team/hiroto.png' },
              { name: 'ダイチ', nameEn: 'Daichi', role: s('テック / プロダクト', 'Tech / Product', l), bio: s('アプリ開発・DB設計担当。情報インフラで人と人を繋げる。', 'App development and DB design.', l), img: '/images/team/daichi.png' },
              { name: 'あさひ', nameEn: 'Asahi', role: s('マッチング / 戦略', 'Strategy / Matching', l), bio: s('マッチング選定・投資家対応。3rd Placeの成長戦略を描く。', 'Handles matching curation and investor relations.', l), img: '/images/team/asahi.jpg' },
              { name: 'みなと', nameEn: 'Minato', role: s('マーケティング / 発信', 'Marketing / Comms', l), bio: s('SNS運用・BtoB資料作成。現在メルボルン滞在中。', 'Manages SNS and outreach. Currently in Melbourne.', l), img: '/images/team/minato.png' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-cream mb-5 ring-4 ring-cream shadow-md hover:ring-orange/30 transition-all duration-300 cursor-pointer">
                  <Image src={m.img} alt={m.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="font-bold text-navy text-base">{l === 'ja' ? m.name : m.nameEn}</p>
                <p className="text-orange text-xs font-semibold mt-1 uppercase tracking-wide">{m.role}</p>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed max-w-[150px]">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section id="faq" className="py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-4">
              {s('よくある質問', 'Frequently Asked Questions', l)}
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <FAQSection items={faqItems[l]} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────── */}
      <section id="cta" className="py-28 bg-navy">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
              {s('あなたはどちらですか？', 'Where are you right now?', l)}
            </h2>
            <p className="text-white/50 mt-4 text-sm">
              {s('状況に合わせた入口を選んでください', 'Choose the path that fits your situation', l)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Melbourne */}
            <div className="bg-navy-light rounded-2xl p-8 border border-white/10 hover:border-orange/30 transition-colors duration-200 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🇦🇺</span>
                <h3 className="text-xl font-bold text-white">
                  {s('メルボルンにいる・これから行く方', 'In Melbourne or Heading There', l)}
                </h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-7 flex-grow">
                {s(
                  'LINEグループに参加して、カレー会・各種イベントに参加しよう。渡航前の準備は3rd Place Hubで。',
                  'Join our LINE group and come to curry nights and events. Prepare for your move with 3rd Place Hub.',
                  l
                )}
              </p>
              <div className="flex flex-col gap-3">
                <a href="https://line.me/ti/p/5ET_QCNdpX" target="_blank" rel="noopener noreferrer"
                  className="bg-orange text-white font-semibold px-6 py-3 rounded-xl text-center hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer">
                  {s('LINEグループに参加する', 'Join LINE Group', l)}
                </a>
                <p className="text-white/40 text-xs text-center">
                  {s('入るだけでOK。挨拶不要。次回開催の告知だけ届きます。', 'Just join — no intro needed. You\'ll only get event announcements.', l)}
                </p>
                <Link href="/hub"
                  className="bg-white/10 text-white/80 font-medium px-6 py-3 rounded-xl text-center hover:bg-white/15 transition-colors duration-200 text-sm cursor-pointer">
                  {s('3rd Place Hubを見る', 'See 3rd Place Hub', l)}
                </Link>
              </div>
              <p className="text-white/50 text-xs text-center mt-4">
                {s('すでにメンバーの方 → ', 'Already a member? → ', l)}
                <a href="#next-event" className="text-orange hover:text-orange-dark underline underline-offset-2 transition-colors duration-200 cursor-pointer">
                  {s('次回開催日をチェック ↑', 'Check next event date ↑', l)}
                </a>
              </p>
            </div>

            {/* Japan */}
            <div className="bg-orange rounded-2xl p-8 flex flex-col hover:bg-orange-dark transition-colors duration-200">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🇯🇵</span>
                <h3 className="text-xl font-bold text-white">
                  {s('日本にいる方', 'Currently in Japan', l)}
                </h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-7 flex-grow">
                {s(
                  '東京で毎月開催するワーホリ・留学準備イベント「3rd Place Japan」へ。メルボルン帰国者のリアルな話を聞こう。',
                  'Join our monthly Tokyo event "3rd Place Japan" for working holiday preparation. Hear real stories from Melbourne returnees.',
                  l
                )}
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/japan"
                  className="bg-white text-orange font-bold px-6 py-3 rounded-xl text-center hover:bg-cream transition-colors duration-200 text-sm cursor-pointer">
                  {s('3rd Place Japanを見る', 'See 3rd Place Japan', l)}
                </Link>
                <a href="https://line.me/ti/p/5ET_QCNdpX" target="_blank" rel="noopener noreferrer"
                  className="bg-white/20 text-white font-medium px-6 py-3 rounded-xl text-center hover:bg-white/30 transition-colors duration-200 text-sm cursor-pointer">
                  {s('LINEグループに参加する', 'Join LINE Group', l)}
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
            <Image src="/images/logo.png" alt="3rd Place" width={30} height={30} className="object-contain" />
            <div>
              <p className="text-white font-bold text-sm">3rd Place</p>
              <p className="text-white/30 text-xs">Melbourne Japanese Community</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">{s('わたしたちについて', 'About', l)}</a>
            <Link href="/japan" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">3rd Place Japan</Link>
            <Link href="/hub" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">3rd Place Hub</Link>
            <a href="#team" className="text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">{s('チーム', 'Team', l)}</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/3rd.placejapan?igsh=OHZsMDFtM3BvbTli&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/g/18bcpDpmP9/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <p className="text-white/20 text-xs">© 2026 3rd Place. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
