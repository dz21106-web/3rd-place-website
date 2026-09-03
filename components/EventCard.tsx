'use client'

import Image from 'next/image'
import { CATEGORY_LABELS, type EventItem } from '../lib/events'
import { img } from '../lib/images'

type Lang = 'ja' | 'en'

interface EventCardProps {
  event: EventItem
  lang: Lang
  onDetailClick: () => void
}

const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土']
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatEventDate(iso: string, lang: Lang): string {
  // 'YYYY-MM-DD' をローカル時刻として解釈する（new Date('YYYY-MM-DD') はUTCになるので避ける）
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  if (lang === 'ja') {
    return `${m}月${d}日（${WEEKDAYS_JA[date.getDay()]}）`
  }
  return `${MONTHS_EN[m - 1]} ${d} (${WEEKDAYS_EN[date.getDay()]})`
}

const CATEGORY_STYLES: Record<EventItem['category'], string> = {
  curry: 'bg-orange/15 text-orange-dark',
  workshop: 'bg-navy/10 text-navy',
  special: 'bg-ink/10 text-ink',
}

export default function EventCard({ event, lang, onDetailClick }: EventCardProps) {
  const categoryLabel = CATEGORY_LABELS[event.category][lang]
  const dateLabel = formatEventDate(event.date, lang)
  const detailLabel = lang === 'ja' ? '詳細を見る' : 'View details'

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-slate-100">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={img(event.image, 'card')}
          alt={event.title[lang]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 ${CATEGORY_STYLES[event.category]} text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/85`}>
          {categoryLabel}
        </span>
        {event.fee && (
          <span className="absolute top-3 right-3 bg-white/85 text-ink text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {event.fee[lang]}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-orange text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{dateLabel}</span>
          {event.time && <span className="text-slate-500 font-normal">{event.time}</span>}
        </div>

        <h3 className="font-heading text-lg font-bold text-navy mt-2 leading-snug">
          {event.title[lang]}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-600 text-sm mt-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location[lang]}</span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          {event.summary[lang]}
        </p>

        <button
          onClick={onDetailClick}
          className="mt-5 self-start inline-flex items-center gap-1 text-navy font-semibold text-sm border border-navy/20 rounded-full px-4 py-2 hover:bg-navy hover:text-white transition-colors duration-200 cursor-pointer"
        >
          {detailLabel}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  )
}
