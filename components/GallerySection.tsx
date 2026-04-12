'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

type Lang = 'ja' | 'en'
const s = (ja: string, en: string, l: Lang) => l === 'ja' ? ja : en

interface PhotoItem {
  img: string
  label?: string
}

const curryPhotos: PhotoItem[] = [
  { img: '/images/events/curry/curry5.jpg' },
  { img: '/images/events/curry/curry12.jpg' },
  { img: '/images/events/curry/curry16.jpg' },
  { img: '/images/events/curry/curry-food.jpg' },
  { img: '/images/events/curry/curry3.jpg' },
  { img: '/images/events/curry/curry7.jpg' },
  { img: '/images/events/curry/curry8.jpg' },
  { img: '/images/events/curry/curry9.jpg' },
  { img: '/images/events/curry/curry4.jpg' },
  { img: '/images/events/curry/curry6.jpg' },
  { img: '/images/events/curry/curry10.jpg' },
  { img: '/images/events/curry/curry11.jpg' },
  { img: '/images/events/curry/curry13.jpg' },
  { img: '/images/events/curry/curry14.jpg' },
  { img: '/images/events/curry/curry15.jpg' },
  { img: '/images/events/curry/curry17.jpg' },
  { img: '/images/events/curry/curry18.jpg' },
  { img: '/images/events/curry/curry19.jpg' },
]

const specialPhotos: { img: string; labelJa: string; labelEn: string; badge?: { ja: string; en: string } }[] = [
  { img: '/images/events/special/bbq.jpg', labelJa: 'BBQ会', labelEn: 'BBQ', badge: { ja: 'メンバーの提案で実現', en: 'Suggested by a member' } },
  { img: '/images/events/special/nabe1.jpg', labelJa: '鍋会', labelEn: 'Hot Pot Night' },
  { img: '/images/events/special/nabe2.jpg', labelJa: '鍋会', labelEn: 'Hot Pot Night' },
  { img: '/images/events/special/christmas.jpg', labelJa: 'クリスマスパーティー', labelEn: 'Christmas Party' },
  { img: '/images/events/special/newyear1.jpg', labelJa: '大晦日パーティー', labelEn: "New Year's Eve" },
  { img: '/images/events/special/newyear2.jpg', labelJa: '大晦日パーティー', labelEn: "New Year's Eve" },
  { img: '/images/events/special/cafe.jpg', labelJa: 'カフェ会', labelEn: 'Café Meetup' },
  { img: '/images/events/special/drive.jpg', labelJa: 'ドライブツアー', labelEn: 'Drive Tour' },
]

const workshopPhotos: { img: string; labelJa: string; labelEn: string; badge?: { ja: string; en: string } }[] = [
  { img: '/images/events/workshop/udon1.jpg', labelJa: 'うどんワークショップ', labelEn: 'Udon Workshop', badge: { ja: 'みんなで作って食べる', en: 'Made and eaten together' } },
  { img: '/images/events/workshop/udon2.jpg', labelJa: 'うどんワークショップ', labelEn: 'Udon Workshop' },
  { img: '/images/events/workshop/ikebana1.jpg', labelJa: '生花ワークショップ', labelEn: 'Ikebana Workshop' },
  { img: '/images/events/workshop/ikebana2.jpg', labelJa: '生花ワークショップ', labelEn: 'Ikebana Workshop' },
]

export default function GallerySection({ l }: { l: Lang }) {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {s('活動の様子', 'Gallery', l)}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-4">
              {s('みんなの写真', 'Our Moments', l)}
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-xl">
              {s(
                'カレー会を中心に、メンバーの「やりたい！」から生まれた多彩なイベントを開催しています。',
                'From regular Curry Nights to events born from members\' ideas — here\'s what we do.',
                l
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* ── カレー会 ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {s('カレー会', 'Curry Night', l)}
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  {s('毎月定期開催・無料', 'Monthly · Free', l)}
                </p>
              </div>
            </div>

            {/* 横スクロール */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 md:-mx-0 md:px-0">
                {/* 1枚目を大きく */}
                <div className="group relative flex-shrink-0 w-72 md:w-96 aspect-square rounded-xl overflow-hidden shadow-md snap-start">
                  <Image src={curryPhotos[0].img} alt={s('カレー会', 'Curry Night', l)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 288px, 384px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {s('この日、初参加10人', '10 first-timers this night', l)}
                    </span>
                  </div>
                </div>
                {/* 残りの写真 */}
                {curryPhotos.slice(1).map((photo, i) => (
                  <div key={i} className="group relative flex-shrink-0 w-48 md:w-64 aspect-[4/3] rounded-xl overflow-hidden shadow-md snap-start">
                    <Image src={photo.img} alt={s('カレー会', 'Curry Night', l)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 192px, 256px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
              {/* スクロールヒント */}
              <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-cream to-transparent pointer-events-none hidden md:block" />
            </div>
          </div>
        </ScrollReveal>

        {/* ── スペシャルイベント ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {s('スペシャルイベント', 'Special Events', l)}
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  {s('BBQ・鍋会・パーティー・ドライブなど', 'BBQ · Hot Pot · Parties · Drive Tours', l)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {specialPhotos.map((photo, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md">
                  <Image
                    src={photo.img}
                    alt={l === 'ja' ? photo.labelJa : photo.labelEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-sm">
                      {l === 'ja' ? photo.labelJa : photo.labelEn}
                    </p>
                  </div>
                  {photo.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {l === 'ja' ? photo.badge.ja : photo.badge.en}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── ワークショップ ── */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {s('ワークショップ', 'Workshops', l)}
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  {s('うどん作り・生花体験など', 'Udon making · Ikebana etc.', l)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {workshopPhotos.map((photo, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden aspect-[3/2] shadow-md">
                  <Image
                    src={photo.img}
                    alt={l === 'ja' ? photo.labelJa : photo.labelEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">
                      {l === 'ja' ? photo.labelJa : photo.labelEn}
                    </p>
                  </div>
                  {photo.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {l === 'ja' ? photo.badge.ja : photo.badge.en}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── リクエスト歓迎メッセージ ── */}
        <ScrollReveal>
          <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <div>
              <p className="text-navy font-semibold text-sm">
                {s('「こんなイベントやりたい！」メンバーの声でイベントが生まれます。', '"I want to do this!" — Events are born from members\' voices.', l)}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                {s(
                  'カレー会は毎月無料で定期開催。それ以外のイベントは、メンバーからのリクエストで実現しています。あなたのアイデアも大歓迎。',
                  'Curry Night runs monthly for free. All other events are member-requested. Your ideas are welcome too.',
                  l
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="#cta" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange text-sm font-medium transition-colors duration-200 cursor-pointer">
              {s('LINEグループに参加する', 'Join the LINE Group', l)}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
