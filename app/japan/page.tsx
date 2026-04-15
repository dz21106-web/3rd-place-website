'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import SubFooter from '../../components/SubFooter'
import FAQSection from '../../components/FAQ'
import ScrollReveal from '../../components/ScrollReveal'

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en
const tags = (ja: string[], en: string[], l: Lang) => l === 'ja' ? ja : en

export default function JapanPage() {
  const [lang, setLang] = useState<Lang>('ja')
  const l = lang

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Navbar ── */}
      <Navbar lang={lang} setLang={setLang} page="japan" />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/japan/event1.jpg" alt="3rd Place Japan" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />

        {/* Glow effects */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-orange/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/5 w-64 h-64 rounded-full bg-orange/5 blur-[80px] pointer-events-none" />

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

          <div className="animate-fade-up delay-500 flex flex-wrap gap-4">
            <a href="#apply"
              className="bg-orange text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
              {s('次回イベントに申し込む', 'Apply for Next Event', l)}
            </a>
            <a href="#details"
              className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
              {s('詳細を見る', 'See Details', l)}
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '¥1,000', label: s('参加費（1ドリンク付）', 'Entry Fee (1 drink incl.)', l) },
              { num: s('毎月', 'Monthly', l), label: s('定期開催', 'Regular Event', l) },
              { num: s('2部制', '2 Parts', l), label: s('相談会 + 交流会', 'Consultation + Exchange', l) },
              { num: s('東京', 'Tokyo', l), label: s('喫茶店で開催', 'Café Venue', l) },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-navy">{stat.num}</p>
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
            <span className="text-white font-bold text-sm">{s('次回イベント', 'Next Event', l)}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="text-white/90 text-sm">
              {s('4月19日（日）', 'Apr 19 (Sun)', l)}
            </span>
            <span className="text-white/80 text-xs">
              {s('18:00〜20:00 ワーホリ・留学相談会 / 20:00〜22:00 外国人との交流会', '18:00–20:00 WHV Consultation / 20:00–22:00 International Exchange', l)}
            </span>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-white/70 text-xs">
              {s('📍 喫茶店エル（神保町/御茶ノ水）', '📍 Café El (Jimbocho/Ochanomizu)', l)}
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
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center text-white font-bold text-lg mb-6">
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
            <div className="bg-orange rounded-3xl p-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-lg mb-6">
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
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={src} alt={`Event photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── いってらっしゃい会 ── */}
      <section className="py-28 bg-white">
        <ScrollReveal>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                <Image src="/images/japan/farewell1.jpg" alt="Farewell party" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8 shadow-md">
                <Image src="/images/japan/farewell2.jpg" alt="Farewell party" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── はじめかた（3ステップ） ── */}
      <section className="py-28 bg-cream">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('はじめかた', 'How to Join', l)}
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-4">
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
              <div key={i} className="relative bg-white rounded-2xl p-8 border border-gray-100">
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
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── 渡航サポート 開発中お知らせ ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="rounded-2xl px-6 py-6 border border-white/10 bg-white/[0.04] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
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

      {/* ── FAQ ── */}
      <section className="py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="font-heading text-4xl font-bold text-navy mt-4">
              {s('よくある質問', 'Frequently Asked Questions', l)}
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <FAQSection items={[
              {
                q: s('東京イベントはどこで開催されますか？', 'Where does the Tokyo event take place?', l),
                a: s('東京都内の喫茶店で開催しています。具体的な会場は申し込み後にメールでお知らせします。', 'At a café in Tokyo. The exact venue is emailed to you after you apply.', l),
              },
              {
                q: s('参加費の¥1,000はどうやって払いますか？', 'How do I pay the ¥1,000 entry fee?', l),
                a: s('当日現地でお支払いいただきます。事前決済は不要です。', 'Pay on the day at the venue. No advance payment required.', l),
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

      {/* ── Apply CTA ── */}
      <section id="apply" className="py-28 bg-orange">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {s(
              <>次のイベントに<br className="md:hidden" />申し込む</>,
              <>Apply for the<br className="md:hidden" /> next event</>,
              l
            )}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            {s(
              '毎月東京で開催中。参加費¥1,000（1ドリンク付き）。申し込みは下記フォームからどうぞ。',
              'Held monthly in Tokyo. ¥1,000 entry (1 drink included). Apply via the form below.',
              l
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://forms.gle/v2ekhnWfmZdpv3BP7" target="_blank" rel="noopener noreferrer"
              className="bg-white text-orange font-bold px-10 py-4 rounded-full hover:bg-cream transition-colors duration-200 text-base cursor-pointer">
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
