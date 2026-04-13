'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import SubFooter from '../../components/SubFooter'
import FAQSection from '../../components/FAQ'
import ScrollReveal from '../../components/ScrollReveal'

type Lang = 'ja' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (ja: any, en: any, l: Lang) => l === 'ja' ? ja : en
const tags = (ja: string[], en: string[], l: Lang) => l === 'ja' ? ja : en

export default function HubPage() {
  const [lang, setLang] = useState<Lang>('ja')
  const l = lang

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: s('引き継ぎノート', 'Handover Notes', l),
      desc: s(
        '先輩メンバーが実際に働いた・住んだ場所の「生の記録」。求人サイトには絶対に載らない、職場の雰囲気・面接の流れ・住居のリアルな情報が詳しく書かれています。エリア別・業種別で検索可能。',
        'Real records from senior members who actually worked and lived there. Workplace atmosphere, interview tips, housing realities — the stuff no job site will tell you. Searchable by area and industry.',
        l
      ),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      ),
      title: s('渡航前Zoomブリーフィング', 'Pre-departure Zoom', l),
      desc: s(
        '担当メンバーとの個別30分Zoom。引き継ぎノートを読んだ上で、あなたの状況に合わせた質問に全部答えます。「自分のケースだとどうなるか」を出発前に整理できる。',
        'A private 30-min Zoom with a dedicated member. We\'ll have read your profile in advance and answer every question specific to your situation. Arrive with clarity, not confusion.',
        l
      ),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: s('公認推薦状', 'Official Recommendation Letter', l),
      desc: s(
        '3rd Place発行の推薦状を履歴書に添付できます。「コミュニティで信頼されているメンバー」として店舗オーナーに認識してもらえるため、レジュメが通りやすくなります。',
        'An official letter from 3rd Place to attach to your resume. It signals to employers that you\'re a trusted community member — giving your application a meaningful edge.',
        l
      ),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: s('到着後1ヶ月フォロー', '1-Month Post-arrival Support', l),
      desc: s(
        '到着後に困ったことをLINEで相談できます。「面接に落ちた」「住居トラブルがあった」「想像と違った」——どんな悩みも一人で抱えなくていい。',
        'Chat with us on LINE after you land. "I got rejected." "Housing issues." "It\'s different from what I imagined." — you don\'t have to deal with it alone.',
        l
      ),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: s('カレー会への招待', 'Curry Night Invitation', l),
      desc: s(
        'パッケージ購入者はメルボルン到着後、次回カレー会に招待されます。知り合いゼロで到着しても、初日から仲間ができる。',
        'Package members get invited to the next curry night after arrival. Even if you land knowing no one, you\'ll have friends from day one.',
        l
      ),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: s('キャッシュバック最大A$100', 'Up to A$100 Cashback', l),
      desc: s(
        'アンケートへの回答・引き継ぎノートの作成・後輩の紹介など、コミュニティへの貢献でキャッシュバックが発生。12ヶ月フルで参加すると実質A$85〜135まで下がります。',
        'Earn cashback by completing surveys, writing handover notes, or referring new members. With 12 months of full participation, your net cost drops to as low as A$85–135.',
        l
      ),
    },
  ]

  const testimonials = [
    {
      name: s('さくら・23歳', 'Sakura, 23', l),
      period: s('ワーホリ・2024年渡航', 'Working Holiday · 2024', l),
      avatar: 'S',
      color: 'bg-orange',
      text: s(
        '引き継ぎノートを読んで、到着1週間で仕事が見つかりました。どの職場に応募すべきか、面接で何を聞かれるかが事前にわかっていたので、全然焦らなかったです。推薦状も本当に効果があって、オーナーの反応が明らかに違いました。',
        'After reading the handover notes, I found a job within a week of arriving. Knowing which places to apply to and what to expect in interviews meant I wasn\'t stressed at all. The recommendation letter genuinely made a difference — you could see it in the owner\'s reaction.',
        l
      ),
    },
    {
      name: s('けんた・26歳', 'Kenta, 26', l),
      period: s('ワーホリ・2023年渡航', 'Working Holiday · 2023', l),
      avatar: 'K',
      color: 'bg-navy',
      text: s(
        '正直、最初はA$150が高いと思ってました。でも到着してみて、この情報量は絶対に自分では集められなかったと確信しました。住居も仕事も、先輩の情報があったから本当にスムーズでした。キャッシュバックも全部もらえたので実質めちゃ安でした。',
        'Honestly, I thought A$150 was expensive at first. But after arriving, I\'m certain I could never have gathered this information on my own. The handover notes made everything — housing, job — go smoothly. And once I claimed all the cashback, it ended up being incredibly cheap.',
        l
      ),
    },
    {
      name: s('みく・21歳', 'Miku, 21', l),
      period: s('留学 → ワーホリ・2024年渡航', 'Study → WHV · 2024', l),
      avatar: 'M',
      color: 'bg-teal-700',
      text: s(
        '英語に自信がなくて、渡航前はかなり不安でした。ZoomでメンバーさんとI話せたおかげで「自分でも大丈夫」という感覚が持てました。到着後のカレー会で初めてメルボルンの友達ができて、本当に3rd Placeに入ってよかったです。',
        'I wasn\'t confident in my English and was really anxious before leaving. The pre-departure Zoom gave me the feeling that I\'d be okay. Then I made my first Melbourne friends at the curry night after arriving. I\'m so glad I joined 3rd Place.',
        l
      ),
    },
    {
      name: s('りょうすけ・28歳', 'Ryosuke, 28', l),
      period: s('ワーホリ・2023年渡航', 'Working Holiday · 2023', l),
      avatar: 'R',
      color: 'bg-purple-700',
      text: s(
        '到着してから住居を探そうと思っていたけど、引き継ぎノートに「このエリアはやめておけ」という情報が詳しく書いてあって助かりました。入居後のトラブルも相談したら運営の人がすぐ動いてくれて、本当に心強かったです。',
        'I planned to find housing after arriving, but the handover notes had detailed warnings about which areas to avoid — that saved me. When I ran into issues after moving in, the team responded immediately. It was genuinely reassuring.',
        l
      ),
    },
  ]

  const faqItems = [
    {
      q: s('「仕事が必ず見つかる」と保証してくれますか？', 'Is finding a job guaranteed?', l),
      a: s(
        'いいえ、保証はしていません。3rd Place Hubが提供するのは「自分で動ける状態にするための情報・繋がり・武器」です。実際の就職活動はご自身で行っていただきます。ただし、情報の質と推薦状によって成功率は大きく上がります。',
        'No guarantees. 3rd Place Hub gives you the information, connections, and tools to act for yourself. The actual job search is yours to do. That said, the quality of our intel and the recommendation letter significantly improve your odds.',
        l
      ),
    },
    {
      q: s('日本にいる段階で申し込めますか？', 'Can I apply from Japan?', l),
      a: s(
        'はい、渡航前のお申し込みを推奨しています。渡航前Zoomブリーフィングや引き継ぎノートの閲覧は日本からでも行えます。到着前に準備を整えることが、Hub最大の価値です。',
        'Yes, and we actually recommend it. The pre-departure Zoom and handover note access all happen from Japan. Getting prepared before you land is the whole point.',
        l
      ),
    },
    {
      q: s('引き継ぎノートはどのくらいの情報量ですか？', 'How detailed are the handover notes?', l),
      a: s(
        '先輩メンバーが実際に働いた・住んだ体験を構造化されたフォームで記録したものです。職場の雰囲気・時給・面接の流れ・スタッフの国籍比率・おすすめポイントや注意点など、複数の項目にわたって書かれています。随時更新されています。',
        'They\'re structured records from members who actually worked or lived there — covering atmosphere, hourly wage, interview flow, staff demographics, tips, and warnings. Updated regularly.',
        l
      ),
    },
    {
      q: s('キャッシュバックはどうやってもらえますか？', 'How does the cashback work?', l),
      a: s(
        'アンケート回答（到着後・3ヶ月ごと）や引き継ぎノートの執筆、後輩の紹介など、コミュニティへの貢献ごとにキャッシュバックが発生します。詳細は購入後にお知らせします。',
        'Cashback is earned through contributions: completing surveys (on arrival and every 3 months), writing a handover note, or referring a new member. Full details are shared after purchase.',
        l
      ),
    },
    {
      q: s('メルボルンに到着してから申し込むことはできますか？', 'Can I apply after arriving in Melbourne?', l),
      a: s(
        'できますが、到着後は情報収集に忙しく、渡航前ほど余裕がない場合がほとんどです。引き継ぎノートや渡航前Zoomの価値を最大限に活かすためにも、渡航前のお申し込みを強くおすすめします。',
        'You can, but most people find themselves too busy after arriving to absorb information well. To get the most out of the handover notes and pre-departure Zoom, we strongly recommend applying before you leave.',
        l
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Navbar ── */}
      <Navbar lang={lang} setLang={setLang} />

      {/* ── Hero ── */}
      <section className="pt-40 pb-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/events/curry1.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />

        {/* Glow effects */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-orange/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/5 w-64 h-64 rounded-full bg-orange/5 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="animate-fade-in inline-flex items-center gap-2 bg-orange/20 text-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              3rd Place Hub
              <span className="bg-orange/30 text-orange text-[10px] px-2 py-0.5 rounded-full">
                {s('開発中', 'Coming Soon', l)}
              </span>
            </div>
            <h1 className="animate-fade-up delay-100 font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
              {s(
                <>先輩の経験を、<br /><span className="text-orange">あなたの武器に。</span></>,
                <>Turn seniors' experience<br />into <span className="text-orange">your advantage.</span></>,
                l
              )}
            </h1>
            <p className="animate-fade-up delay-300 text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              {s(
                'メルボルンで仕事・住居を「自分で取りに行ける人」になるための情報パッケージ。先輩が残したリアルな記録と、コミュニティの繋がりが、あなたの到着初日を変えます。',
                'An information package that turns you into someone who can find work and housing in Melbourne on your own. Senior members\' real records and community connections will transform your first day.',
                l
              )}
            </p>
            <div className="animate-fade-up delay-500 flex flex-wrap gap-4">
              <a href="#apply"
                className="bg-orange text-white font-bold px-10 py-4 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
                {s('LINEで通知を受け取る', 'Get notified via LINE', l)}
              </a>
              <a href="#features"
                className="bg-white/10 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
                {s('サービス内容を見る', 'See what\'s included', l)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 'A$150〜200', label: s('パッケージ料金', 'Package Price', l) },
              { num: 'A$100', label: s('最大キャッシュバック', 'Max Cashback', l) },
              { num: s('6つ', '6', l), label: s('含まれるサービス', 'Included Services', l) },
              { num: s('1ヶ月', '1 Month', l), label: s('到着後フォロー', 'Post-arrival Support', l) },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-navy">{stat.num}</p>
                <p className="text-slate-500 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28 bg-cream">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('含まれるもの', "What's Included", l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-4">
              {s('6つのサービス', '6 Services', l)}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-3">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── Pricing ── */}
      <section className="py-28 bg-navy">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('料金', 'Pricing', l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-4">
              {s('実質いくらかかるか', 'What it actually costs', l)}
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm">
              {s('コミュニティに貢献するほど、実質コストが下がる仕組みです。', 'The more you contribute to the community, the lower your net cost.', l)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Package price */}
            <div className="bg-navy-light rounded-2xl p-10 border border-white/10">
              <p className="text-orange text-xs font-bold uppercase tracking-widest mb-4">{s('パッケージ料金', 'Package Price', l)}</p>
              <p className="text-6xl font-bold text-white mb-2">A$150<span className="text-3xl text-white/60">〜200</span></p>
              <p className="text-white/60 text-sm mb-8">{s('一括払い・渡航前に購入', 'One-time payment, purchased before departure', l)}</p>
              <div className="space-y-3">
                {tags(
                  ['引き継ぎノート閲覧', '渡航前Zoomブリーフィング', '公認推薦状', '到着後1ヶ月フォロー', 'カレー会招待', 'キャッシュバック対象'],
                  ['Handover Note Access', 'Pre-departure Zoom', 'Official Rec. Letter', '1-Month Follow-up', 'Curry Night Invite', 'Cashback Eligible'],
                  l
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-orange flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cashback */}
            <div className="bg-orange rounded-2xl p-10">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4">{s('キャッシュバック内訳', 'Cashback Breakdown', l)}</p>
              <p className="text-white/60 text-sm mb-6">{s('コミュニティへの貢献で返ってくる', 'Earned back through community contributions', l)}</p>
              <div className="space-y-4">
                {[
                  { action: s('到着後アンケート', 'Arrival Survey', l), amount: 'A$10' },
                  { action: s('3ヶ月ごと近況報告（×3回）', 'Quarterly Updates (×3)', l), amount: 'A$15' },
                  { action: s('引き継ぎノート作成', 'Write a Handover Note', l), amount: 'A$30' },
                  { action: s('後輩の紹介（成約時）', 'Referral (on signup)', l), amount: 'A$50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                    <span className="text-white/80 text-sm">{item.action}</span>
                    <span className="text-white font-bold">{item.amount}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-white/20 rounded-xl px-4 py-3 mt-2">
                  <span className="text-white font-bold">{s('最大合計', 'Total Max', l)}</span>
                  <span className="text-white font-bold text-lg">A$105</span>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-6">
                {s('※ 12ヶ月フル参加の場合。後輩紹介なしの場合は最大A$55。', '* Assumes 12 months full participation. Without referral, max is A$55.', l)}
              </p>
            </div>
          </div>

          {/* Net cost summary */}
          <div className="mt-8 max-w-4xl mx-auto bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
            <p className="text-white/50 text-sm mb-2">{s('12ヶ月フル参加した場合の実質コスト', 'Net cost with 12 months full participation', l)}</p>
            <p className="text-white text-3xl font-bold">
              A$85<span className="text-white/60 text-xl">〜135</span>
              <span className="text-white/60 text-base font-normal ml-3">{s('（後輩紹介ありで最安値）', '(lowest with referral)', l)}</span>
            </p>
          </div>

          {/* ── 比較表 ── */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                {s('留学エージェントとの違い', 'How we compare to agencies', l)}
              </h3>
              <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
                {s('エージェントが悪いわけではありません。ただ、情報の「鮮度」と「リアルさ」が違います。', 'Agencies aren\'t bad — but the freshness and authenticity of information is different.', l)}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/40 font-normal py-4 pr-4 w-1/3"></th>
                    <th className="text-center text-white/40 font-normal py-4 px-4 w-1/3">
                      {s('一般的な留学エージェント', 'Typical Agency', l)}
                    </th>
                    <th className="text-center py-4 pl-4 w-1/3">
                      <span className="text-orange font-bold">3rd Place Hub</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: s('情報の出どころ', 'Info source', l),
                      agency: s('提携先の企業・学校', 'Partner companies & schools', l),
                      hub: s('実際に現地で生活しているメンバー', 'Members actually living there', l),
                    },
                    {
                      label: s('仕事・住居情報', 'Job & housing info', l),
                      agency: s('提携先のみ（選択肢が限定的）', 'Limited to partners', l),
                      hub: s('先輩が実際に働いた・住んだリアルな記録', 'Real records from people who worked & lived there', l),
                    },
                    {
                      label: s('情報の鮮度', 'Info freshness', l),
                      agency: s('パンフレット・Webサイト（更新頻度低め）', 'Brochures & websites (less frequent updates)', l),
                      hub: s('メンバーが随時更新する生の情報', 'Continuously updated by members', l),
                    },
                    {
                      label: s('渡航後のサポート', 'Post-arrival support', l),
                      agency: s('学校・保険関連のみ', 'School & insurance only', l),
                      hub: s('1ヶ月のLINEフォロー + カレー会で仲間づくり', '1-month LINE support + curry night community', l),
                    },
                    {
                      label: s('コミュニティ', 'Community', l),
                      agency: s('なし（契約終了で関係終了）', 'None (relationship ends at contract)', l),
                      hub: s('300人のLINEグループに永久参加', 'Permanent access to 300-member LINE group', l),
                    },
                    {
                      label: s('費用', 'Cost', l),
                      agency: s('無料〜数十万円', 'Free – hundreds of $$$', l),
                      hub: s('A$150〜200（実質A$85〜135）', 'A$150–200 (net A$85–135)', l),
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="text-white/60 py-4 pr-4 font-medium">{row.label}</td>
                      <td className="text-white/40 py-4 px-4 text-center">{row.agency}</td>
                      <td className="text-white py-4 pl-4 text-center font-medium">{row.hub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-white/30 text-xs text-center mt-6">
              {s('※ 3rd Place Hubは求人斡旋・仕事の保証はしていません。「自分で動ける状態をつくるための情報・繋がり・武器」を提供します。', '* 3rd Place Hub does not guarantee job placement. We provide information, connections, and tools to help you act on your own.', l)}
            </p>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28 bg-white">
        <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('参加者の声', 'Testimonials', l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-4">
              {s('使った人たちの体験談', 'From those who\'ve been through it', l)}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-cream rounded-2xl p-8 border border-gray-100">
                <p className="text-slate-700 leading-relaxed mb-8 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${t.color}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{t.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-300 text-xs mt-8">
            {s('※ 掲載内容はダミーです。実際の声は順次掲載予定。', '* Testimonials above are placeholders. Real voices coming soon.', l)}
          </p>
        </div>
        </ScrollReveal>
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
            <FAQSection items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section id="apply" className="py-28 bg-orange">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {s('準備はできていますか？', 'Ready to get started?', l)}
          </h2>
          <p className="text-white/80 text-lg mb-4 leading-relaxed">
            {s(
              '渡航前に、動ける自分を作ろう。',
              'Build the version of yourself that\'s ready to act.',
              l
            )}
          </p>
          <p className="text-white/60 text-sm mb-12">
            {s(
              '※ 現在開発中です。リリース通知を受け取るにはLINEグループにご参加ください。',
              '* Currently in development. Join our LINE group to be notified at launch.',
              l
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://line.me/ti/p/5ET_QCNdpX" target="_blank" rel="noopener noreferrer"
              className="bg-white text-orange font-bold px-10 py-4 rounded-full hover:bg-cream hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
              {s('LINEで通知を受け取る', 'Get notified via LINE', l)}
            </a>
            <Link href="/japan"
              className="bg-white/20 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-base cursor-pointer">
              {s('東京イベントはこちら →', 'Tokyo Events →', l)}
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/" className="text-white/40 hover:text-white/60 text-sm font-medium transition-colors duration-200 cursor-pointer">
              {s('← コミュニティトップに戻る', '← Back to Community', l)}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SubFooter lang={lang} page="hub" />
    </div>
  )
}
