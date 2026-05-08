'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import SubFooter from '../../components/SubFooter'
import FAQSection from '../../components/FAQ'
import ScrollReveal from '../../components/ScrollReveal'
import CountUp from '../../components/CountUp'
import StaggerReveal from '../../components/StaggerReveal'
import ScrollProgress from '../../components/ScrollProgress'
import Parallax from '../../components/Parallax'
import ScrollGlow from '../../components/ScrollGlow'
import { EXTERNAL_LINKS } from '../../lib/site'

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en
const tags = (ja: string[], en: string[], l: Lang) => l === 'ja' ? ja : en

export default function JapanPage() {
  const [lang, setLang] = useState<Lang>('ja')
  const l = lang

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <ScrollProgress />

      {/* ── Navbar ── */}
      <Navbar lang={lang} setLang={setLang} page="japan" />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/japan/event1.jpg" alt="3rd Place Japan" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />

        {/* Glow effects — scroll-linked */}
        <ScrollGlow className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-orange/10 blur-[100px] pointer-events-none" range={60} />
        <ScrollGlow className="absolute bottom-1/4 left-[20%] w-64 h-64 rounded-full bg-orange/5 blur-[80px] pointer-events-none" range={40} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="animate-fade-in flex items-center gap-3 mb-6">
            <Image src="/images/japan/logo-japan.jpg" alt="3rd Place Japan" width={48} height={48} className="object-contain rounded-xl" />
            <div>
              <p className="text-orange text-xs font-bold uppercase tracking-widest">3rd Place Japan</p>
              <p className="text-white/50 text-xs">{s('東京 × メルボルン', 'Tokyo × Melbourne', l)}</p>
            </div>
          </div>

          <h1 className="animate-fade-up delay-100 font-heading text-4xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {s(
              <>渡航前に、<br />先輩の声を<br />聞いておこう。</>,
              <>Before you go,<br />hear from those<br />who&apos;ve been.</>,
              l
            )}
          </h1>
          <p className="animate-fade-up delay-300 text-white/60 text-lg max-w-xl leading-relaxed mb-10">
            {s(
              '東京で毎月開催する、ワーホリ・留学準備のためのイベント。メルボルン帰国者のリアルな話と、英語交流で出発前の不安をなくそう。',
              'A monthly event in Tokyo for anyone preparing for a working holiday or study abroad. Get real stories from Melbourne returnees and build confidence through English exchange.',
              l
            )}
          </p>

          <div className="animate-fade-up delay-500 flex flex-wrap gap-4 mb-12">
            <a href="#apply"
              className="animate-pulse-glow bg-orange text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
              {s('次回イベントに申し込む', 'Apply for Next Event', l)}
            </a>
            <a href="#details"
              className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
              {s('詳細を見る', 'See Details', l)}
            </a>
          </div>

          {/* Hero Stats overlay + photo thumbnails */}
          <div className="animate-fade-up delay-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              {/* Mini stats */}
              <div className="flex gap-6">
                {[
                  { value: s('¥500〜', '¥500〜', l), label: s('参加費', 'Entry', l) },
                  { value: s('毎月', 'Monthly', l), label: s('定期開催', 'Regular', l) },
                  { value: s('2部制', '2 Parts', l), label: s('相談+交流', 'Talk+Mix', l) },
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                    <p className="text-white/40 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Photo thumbnails */}
              <div className="flex gap-2 ml-auto">
                {[
                  '/images/japan/event2.jpg',
                  '/images/japan/event3.jpg',
                  '/images/japan/event4.jpg',
                  '/images/japan/farewell1.jpg',
                ].map((src, i) => (
                  <div key={i} className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden opacity-70 hover:opacity-100 transition-opacity duration-200">
                    <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: s('¥500〜', '¥500〜', l), label: s('日本人¥500 / 外国人¥1,000（ドリンク込）', 'JP ¥500 / Intl ¥1,000 (drinks incl.)', l) },
              { num: s('毎月', 'Monthly', l), label: s('定期開催', 'Regular Event', l) },
              { num: s('2部制', '2 Parts', l), label: s('相談会 + 交流会', 'Consultation + Exchange', l) },
              { num: s('東京', 'Tokyo', l), label: s('神保町で開催', 'Jimbocho Venue', l) },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-navy">
                  <CountUp value={stat.num} />
                </p>
                <p className="text-slate-500 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT EVENT BANNER ── */}
      <section className="bg-orange py-5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-white font-bold text-sm">{s('次回イベント（第9回目）', 'Next Event (9th)', l)}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="text-white/90 text-sm">
              {s('5月17日（日）', 'May 17 (Sun)', l)}
            </span>
            <span className="text-white/80 text-xs">
              {s('18:00〜19:30 ワーホリ・留学相談会 / 19:30〜21:00 外国人との交流会', '18:00–19:30 WHV Consultation / 19:30–21:00 International Exchange', l)}
            </span>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-white/70 text-xs">
              {s('Bar/Grill PINE（神保町/御茶ノ水）', 'Bar/Grill PINE (Jimbocho/Ochanomizu)', l)}
            </span>
          </div>
          <a href="#apply"
            className="bg-white text-orange font-bold text-xs px-4 py-2 rounded-full hover:bg-cream transition-colors duration-200 cursor-pointer whitespace-nowrap">
            {s('申し込む', 'Apply', l)}
          </a>
        </div>
      </section>

      {/* ── Event Details ── */}
      <section id="details" className="py-28 bg-cream">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('イベント内容', 'Event Details', l)}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4 max-w-2xl leading-tight">
              {s(
                <>2部構成で、<br className="md:hidden" />出発前の準備を整える</>,
                <>Two parts to prepare<br className="md:hidden" /> you before departure</>,
                l
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Part 1 */}
            <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white font-bold text-lg mb-6">
                1
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy mb-4">
                {s('帰国者との交流会', 'Network with Returnees', l)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {s(
                  '実際にメルボルンでワーホリ・留学を経験した先輩たちと直接話せる時間。求人サイトには載っていないリアルな職場の雰囲気、住居探しのコツ、生活の実態を聞こう。',
                  'Talk directly with people who\'ve experienced working holidays and study abroad in Melbourne. Learn what job sites won\'t tell you — real workplace vibes, housing tips, and life on the ground.',
                  l
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags(
                  ['リアルな職場の話', '住居探しのコツ', '生活費の実態', '失敗談も聞ける'],
                  ['Real workplace stories', 'Housing search tips', 'Real cost of living', 'What went wrong too'],
                  l
                ).map((tag, i) => (
                  <span key={i} className="bg-cream text-slate-500 text-xs px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Part 2 */}
            <div className="bg-orange rounded-xl p-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-lg mb-6">
                2
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                {s('外国人との英語交流', 'English Exchange', l)}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {s(
                  '日本在住の外国人参加者との英語での交流タイム。メルボルンに行く前に、英語で話す感覚をつかんでおこう。フレンドリーな雰囲気なので英語が得意でなくてもOK。',
                  'Practice English with international participants based in Japan. Get comfortable speaking before you arrive in Melbourne. No worries if your English isn\'t perfect — the vibe is welcoming.',
                  l
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags(
                  ['英語に慣れる', '初心者もOK', '外国人と直接交流'],
                  ['Get comfortable', 'Beginners welcome', 'Real conversation'],
                  l
                ).map((tag, i) => (
                  <span key={i} className="bg-white/20 text-white/80 text-xs px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/images/japan/event1.jpg',
              '/images/japan/event2.jpg',
              '/images/japan/event3.jpg',
              '/images/japan/event4.jpg',
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={src} alt={`Event photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Values cards — staggered reveal */}
          <div className="mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  n: '01',
                  title: s('仲間ができる', 'Make Friends', l),
                  desc: s('同じく渡航を目指す仲間と、出発前から繋がれる', 'Connect with fellow future-travelers before you go', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                },
                {
                  n: '02',
                  title: s('情報が手に入る', 'Get Real Info', l),
                  desc: s('メルボルン経験者から、ネットにないリアルが聞ける', 'Hear real stories from returnees you won\'t find online', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                },
                {
                  n: '03',
                  title: s('英語に慣れる', 'Get Comfortable in English', l),
                  desc: s('日本在住の外国人と、英語で話す感覚をつかめる', 'Practice English with international participants in Japan', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                },
                {
                  n: '04',
                  title: s('一歩を踏み出せる', 'Take the First Step', l),
                  desc: s('漠然とした「いつか」が、具体的な行動に変わる', 'Turn "someday" into a concrete next step', l),
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
                },
              ].map((v, i) => (
                <StaggerReveal key={i} index={i}>
                <div className="group relative bg-navy rounded-2xl p-6 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default">
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
        </div>
        </ScrollReveal>
      </section>

      {/* ── 参加者の声 ── */}
      <section className="py-28 bg-white">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('参加者の声', 'Voices', l)}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4">
              {s('イベントに参加した人たちの感想', 'What participants say', l)}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: s(
                  <>私自身何も知らずの参加だったけど、私でもワーホリとは何かなど魅力に感じることができるくらい<span className="text-orange font-semibold">丁寧に説明してくださった</span>。</>,
                  <>I came in knowing nothing, but everything was <span className="text-orange font-semibold">explained so clearly</span> that even I could feel the appeal of a working holiday.</>,
                  l
                ),
                profile: s('社会人・女性', 'Working professional, F', l),
              },
              {
                quote: s(
                  <>国内外の友達が増えることで一緒に経験したいことが増えて、<span className="text-orange font-semibold">できることや考え方が変わる</span>ことがわかりました。<span className="text-orange font-semibold">これからが楽しみ</span>になりました。</>,
                  <>Making friends from Japan and abroad opened up so many things I want to experience together. I realized how much my <span className="text-orange font-semibold">perspective and possibilities can change</span>. I&apos;m <span className="text-orange font-semibold">excited for what&apos;s ahead</span>.</>,
                  l
                ),
                profile: s('大学2年・女性', 'University sophomore, F', l),
              },
              {
                quote: s(
                  <>ワクワク感と漠然とした不安が入り混じっていた感情が、昨日のお話を聞いて具体的に調べて、<span className="text-orange font-semibold">このワクワクをカタチにしたい</span>と思うようになりました。</>,
                  <>I had a mix of excitement and vague anxiety, but after hearing everyone&apos;s stories, I want to do my own research and <span className="text-orange font-semibold">turn this excitement into something real</span>.</>,
                  l
                ),
                profile: s('大学4年・男性', 'University senior, M', l),
              },
            ].map((item, i) => (
              <StaggerReveal key={i} index={i}>
              <div className="group relative bg-cream rounded-xl p-8 border border-gray-100 flex flex-col h-full overflow-hidden hover:-translate-y-1.5 hover:shadow-lg hover:border-orange/20 transition-all duration-300 cursor-default">
                <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-orange/40 transition-all duration-500 rounded-t-xl" />
                <svg className="w-8 h-8 text-orange/30 group-hover:text-orange/60 group-hover:scale-110 mb-4 flex-shrink-0 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
                </svg>
                <p className="text-slate-700 text-sm leading-relaxed flex-grow mb-5">{item.quote}</p>
                <p className="text-slate-400 text-xs font-medium group-hover:text-orange transition-colors duration-300">{item.profile}</p>
              </div>
              </StaggerReveal>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── いってらっしゃい会 ── */}
      <section className="py-28 bg-white border-t border-gray-100">
        <ScrollReveal direction="right">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange text-xs font-semibold uppercase tracking-widest">
                {s('特別イベント', 'Special Event', l)}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4 mb-6 leading-tight">
                {s('いってらっしゃい会', '"See You Off" Party', l)}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {s(
                  'メルボルンへの渡航が決まったメンバーのために開く、特別なお見送り会。同じタイミングで渡航する仲間と繋がれて、不安が楽しみに変わる瞬間。渡航前の最後の夜を一緒に過ごそう。',
                  'A special farewell gathering for members about to head to Melbourne. Connect with others leaving at the same time, and turn pre-departure nerves into excitement. Spend your last night in Japan with people who get it.',
                  l
                )}
              </p>
              <a href="#apply"
                className="inline-block bg-navy text-white font-semibold px-8 py-4 rounded-full hover:bg-navy-light transition-colors duration-200 cursor-pointer">
                {s('次のイベントに申し込む', 'Apply for the next event', l)}
              </a>
            </div>
            <Parallax speed={0.08}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                <Image src="/images/japan/farewell1.jpg" alt="Farewell party" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mt-8 shadow-md">
                <Image src="/images/japan/farewell-new2.jpg" alt="Farewell party" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            </Parallax>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Wave divider: white → cream */}
      <div className="relative -mt-px">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 0h1440v16c-240 26-480 40-720 40S240 42 0 16V0z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* ── はじめかた（3ステップ） ── */}
      <section className="py-28 bg-cream">
        <ScrollReveal direction="left">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
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

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: s('申し込みフォームに回答', 'Fill out the form', l),
                desc: s('下のボタンから申し込みフォームへ。お名前や参加したい理由など、1分で終わる簡単な内容です。', 'Tap the button to open the application form. Just your name, reason for joining, and a few quick questions — takes about a minute.', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                ),
              },
              {
                step: '2',
                title: s('運営から確認のご連絡', 'We\'ll confirm via email', l),
                desc: s('運営が内容を確認して、メールで会場や当日の流れをご案内します。返信は数日以内を目安にお送りしています。', 'We\'ll review your application and email you the venue details and run-of-show within a few days.', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                ),
              },
              {
                step: '3',
                title: s('当日、東京イベントへ', 'Come to the Tokyo event', l),
                desc: s('毎月東京で開催している相談会＆英語交流会に遊びに来てね。一人で来る人がほとんどなので、気軽にどうぞ。', 'Come join our monthly consultation & English exchange event in Tokyo. Most people come solo — feel free to drop by!', l),
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ),
              },
            ].map((item, i) => (
              <StaggerReveal key={i} index={i} className="relative bg-white rounded-xl p-8 border border-gray-100">
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
                    <svg className="w-6 h-6 text-orange/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                )}
              </StaggerReveal>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── 渡航サポート 開発中お知らせ ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="rounded-xl px-6 py-6 border border-white/10 bg-white/[0.04] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="inline-block bg-orange/20 text-orange text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
              {s('お知らせ', 'Note', l)}
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {s(
                '渡航前にもっと本格的な準備をしたい方向けのサポートサービスも開発中です。詳細はLINEグループで随時公開していきますね。',
                'A more in-depth pre-departure support service is in the works. We\'ll share details in the LINE group as things come together.',
                l
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Wave divider: navy → cream */}
      <div className="relative -mt-px">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 0h1440v16c-240 26-480 40-720 40S240 42 0 16V0z" fill="#0B1F3A" />
        </svg>
      </div>

      {/* ── FAQ ── */}
      <section className="py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mt-4">
              {s('よくある質問', 'Frequently Asked Questions', l)}
            </h2>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100">
            <FAQSection items={[
              {
                q: s('東京イベントはどこで開催されますか？', 'Where does the Tokyo event take place?', l),
                a: s('神保町/御茶ノ水のBar/Grill PINEで開催しています。詳細な場所は申し込み後にメールでお知らせします。', 'We hold it at Bar/Grill PINE in Jimbocho/Ochanomizu. Full details are emailed to you after you apply.', l),
              },
              {
                q: s('参加費はいくらですか？', 'How much is the entry fee?', l),
                a: s('日本人参加者は¥500（ドリンク別途）、外国人参加者は一律¥1,000（ドリンク飲み放題込み）です。日本人の方はドリンクオプションとして、ソフトドリンク飲み放題が+¥500、アルコール飲み放題が+¥1,000でお選びいただけます。お支払いは当日現地で、事前決済は不要です。', 'Entry is ¥500 for Japanese participants (drinks separate), and a flat ¥1,000 for international participants (drinks included). Japanese participants can add drink options: +¥500 for unlimited soft drinks, +¥1,000 for unlimited alcohol. Pay on the day at the venue — no advance payment required.', l),
              },
              {
                q: s('ワーホリ・留学の予定がまだ決まっていなくても参加できますか？', 'Can I join even if I haven\'t decided to go yet?', l),
                a: s('もちろんです。「少し気になっている」「情報収集中」という方も大歓迎です。先輩の話を聞いてから判断するのも全然アリです。', 'Absolutely. Even if you\'re just curious or still gathering info, you\'re welcome. Hearing real stories before deciding is totally fine.', l),
              },
              {
                q: s('英語が全然しゃべれないのですが、英語交流パートは大丈夫ですか？', 'My English is very basic — will I be okay in the English exchange part?', l),
                a: s('大丈夫です。外国人参加者もフレンドリーで、ゆっくり話してくれます。うまく話せなくても楽しめる雰囲気です。むしろ練習の場として使ってください。', 'You\'ll be fine. International participants are friendly and happy to speak slowly. The atmosphere is welcoming even if your English isn\'t great — treat it as practice.', l),
              },
              {
                q: s('帰国者として話す側で参加することはできますか？', 'Can I participate as a returnee and share my experience?', l),
                a: s('大歓迎です！メルボルンでの経験を後輩に伝えたいという方は、申し込みフォームの自由記入欄からお知らせください。', 'We\'d love to have you! If you want to share your Melbourne experience with newcomers, just let us know in the application form.', l),
              },
              {
                q: s('3rd Place Japanと3rd Place（メルボルン）は別ですか？', 'Is 3rd Place Japan separate from 3rd Place Melbourne?', l),
                a: s('同じ3rd Placeファミリーです。3rd Place Japanは日本にいる方向けの活動で、メルボルンのコミュニティへの入口でもあります。', 'We\'re part of the same 3rd Place family. 3rd Place Japan is the Japan-based activity and a gateway into the Melbourne community.', l),
              },
            ]} />
          </div>
        </div>
      </section>

      {/* Wave divider: cream → orange */}
      <div className="relative -mb-px">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 56h1440V40c-240-26-480-40-720-40S240 14 0 40v16z" fill="#D4874A" />
        </svg>
      </div>

      {/* ── Apply CTA ── */}
      <section id="apply" className="py-28 bg-orange">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {s(
              <>次のイベントに<br className="md:hidden" />申し込む</>,
              <>Apply for the<br className="md:hidden" /> next event</>,
              l
            )}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            {s(
              '毎月東京で開催中。参加費は日本人¥500（ドリンク別）／外国人¥1,000（ドリンク飲み放題込）。日本人の方はソフトドリンク飲み放題+¥500、アルコール飲み放題+¥1,000を追加できます。申し込みは下記フォームからどうぞ。',
              'Held monthly in Tokyo. Entry: ¥500 for JP (drinks separate) / ¥1,000 flat for intl (drinks included). JP can add: +¥500 unlimited soft drinks, +¥1,000 unlimited alcohol. Apply via the form below.',
              l
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={EXTERNAL_LINKS.japanApplyForm} target="_blank" rel="noopener noreferrer"
              className="animate-pulse-glow bg-white text-orange font-bold px-10 py-4 rounded-full hover:bg-cream transition-colors duration-200 text-base cursor-pointer">
              {s('申し込みフォームを開く', 'Open Application Form', l)}
            </a>
          </div>
          <p className="text-white/60 text-xs mt-4">
            {s('1分で終わる簡単なフォームです。お気軽にどうぞ。', 'Takes about a minute — easy and simple.', l)}
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <SubFooter lang={lang} page="japan" />
    </div>
  )
}
