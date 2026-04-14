'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

type Lang = 'ja' | 'en'
const s = (ja: string, en: string, l: Lang) => l === 'ja' ? ja : en

interface EventCard {
  id: string
  labelJa: string
  labelEn: string
  descJa: string
  descEn: string
  cover: string
  photos: string[]
}

const events: EventCard[] = [
  {
    id: 'curry',
    labelJa: 'カレー会',
    labelEn: 'Curry Night',
    descJa: '毎月定期開催・無料',
    descEn: 'Monthly · Free',
    cover: '/images/events/curry/curry5.jpg',
    photos: [
      '/images/events/curry/curry5.jpg',
      '/images/events/curry/curry12.jpg',
      '/images/events/curry/curry3.jpg',
      '/images/events/curry/curry-food.jpg',
      '/images/events/curry/curry7.jpg',
      '/images/events/curry/curry9.jpg',
      '/images/events/curry/curry16.jpg',
      '/images/events/curry/curry4.jpg',
      '/images/events/curry/curry6.jpg',
      '/images/events/curry/curry10.jpg',
      '/images/events/curry/curry11.jpg',
      '/images/events/curry/curry13.jpg',
      '/images/events/curry/curry14.jpg',
      '/images/events/curry/curry15.jpg',
      '/images/events/curry/curry17.jpg',
      '/images/events/curry/curry18.jpg',
      '/images/events/curry/curry19.jpg',
      '/images/events/curry/curry8.jpg',
    ],
  },
  {
    id: 'bbq',
    labelJa: 'BBQ会',
    labelEn: 'BBQ',
    descJa: 'メンバーの提案で実現',
    descEn: 'Suggested by a member',
    cover: '/images/events/special/bbq.jpg',
    photos: ['/images/events/special/bbq.jpg'],
  },
  {
    id: 'nabe',
    labelJa: '鍋会',
    labelEn: 'Hot Pot Night',
    descJa: '冬の定番イベント',
    descEn: 'Winter favorite',
    cover: '/images/events/special/nabe1.jpg',
    photos: ['/images/events/special/nabe1.jpg', '/images/events/special/nabe2.jpg'],
  },
  {
    id: 'christmas',
    labelJa: 'クリスマスパーティー',
    labelEn: 'Christmas Party',
    descJa: '年末の特別イベント',
    descEn: 'Year-end special',
    cover: '/images/events/special/christmas.jpg',
    photos: ['/images/events/special/christmas.jpg'],
  },
  {
    id: 'newyear',
    labelJa: '大晦日パーティー',
    labelEn: "New Year's Eve",
    descJa: 'みんなで年越し',
    descEn: 'Celebrate together',
    cover: '/images/events/special/newyear1.jpg',
    photos: ['/images/events/special/newyear1.jpg', '/images/events/special/newyear2.jpg'],
  },
  {
    id: 'cafe',
    labelJa: 'カフェ会',
    labelEn: 'Café Meetup',
    descJa: 'メルボルンのカフェ文化を楽しむ',
    descEn: 'Enjoy Melbourne café culture',
    cover: '/images/events/special/cafe.jpg',
    photos: ['/images/events/special/cafe.jpg'],
  },
  {
    id: 'drive',
    labelJa: 'ドライブツアー',
    labelEn: 'Drive Tour',
    descJa: '郊外の絶景スポットへ',
    descEn: 'Scenic spots outside the city',
    cover: '/images/events/special/drive.jpg',
    photos: ['/images/events/special/drive.jpg'],
  },
  {
    id: 'udon',
    labelJa: 'うどんワークショップ',
    labelEn: 'Udon Workshop',
    descJa: 'みんなで作って食べる',
    descEn: 'Made and eaten together',
    cover: '/images/events/workshop/udon1.jpg',
    photos: ['/images/events/workshop/udon1.jpg', '/images/events/workshop/udon2.jpg'],
  },
  {
    id: 'ikebana',
    labelJa: '生花ワークショップ',
    labelEn: 'Ikebana Workshop',
    descJa: '日本文化を体験',
    descEn: 'Experience Japanese culture',
    cover: '/images/events/workshop/ikebana1.jpg',
    photos: ['/images/events/workshop/ikebana1.jpg', '/images/events/workshop/ikebana2.jpg'],
  },
]

export default function GallerySection({ l }: { l: Lang }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
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

        {/* Event cards grid */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map(event => {
              const isOpen = expanded === event.id
              return (
                <div key={event.id} className="flex flex-col">
                  <button
                    onClick={() => setExpanded(isOpen ? null : event.id)}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md cursor-pointer"
                  >
                    <Image
                      src={event.cover}
                      alt={l === 'ja' ? event.labelJa : event.labelEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-sm">
                        {l === 'ja' ? event.labelJa : event.labelEn}
                      </p>
                    </div>
                    {/* Photo count badge */}
                    {event.photos.length > 1 && (
                      <div className="absolute top-2.5 right-2.5 bg-navy/70 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {event.photos.length}
                      </div>
                    )}
                  </button>

                  {/* Expanded photos */}
                  {isOpen && event.photos.length > 1 && (
                    <div className="mt-2 grid grid-cols-3 gap-1.5 animate-fade-in">
                      {event.photos.slice(1).map((photo, i) => (
                        <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                          <Image
                            src={photo}
                            alt={l === 'ja' ? event.labelJa : event.labelEn}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 16vw, 8vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Request message */}
        <ScrollReveal>
          <div className="mt-12 bg-white rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
