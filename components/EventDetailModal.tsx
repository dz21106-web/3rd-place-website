'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { CATEGORY_LABELS, type EventItem } from '../lib/events'
import { EXTERNAL_LINKS } from '../lib/site'
import { formatEventDate } from './EventCard'

type Lang = 'ja' | 'en'

interface EventDetailModalProps {
  event: EventItem
  lang: Lang
  onClose: () => void
}

const URL_RE = /(https?:\/\/[^\s)）]+)/g

function renderWithLinks(text: string) {
  const parts = text.split(URL_RE)
  return parts.map((part, i) =>
    part.startsWith('http') ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange underline underline-offset-2 hover:text-orange-dark transition-colors duration-200 break-all"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function EventDetailModal({ event, lang, onClose }: EventDetailModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const categoryLabel = CATEGORY_LABELS[event.category][lang]
  const dateLabel = formatEventDate(event.date, lang)
  const ctaLabel = lang === 'ja' ? 'LINEグループに参加する' : 'Join the LINE Group'
  const noteLabel =
    lang === 'ja'
      ? 'イベント参加には3rd PlaceのLINEグループへの参加が必須です。フォーム回答→運営が確認次第、LINEグループへご招待します。'
      : 'Joining the 3rd Place LINE group is required to attend. Fill the form → we review → invited to the group.'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={event.title[lang]}
    >
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-ink shadow-md transition-colors duration-200 cursor-pointer"
          aria-label={lang === 'ja' ? '閉じる' : 'Close'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[16/9] w-full">
          <Image
            src={event.image}
            alt={event.title[lang]}
            fill
            sizes="(min-width: 768px) 672px, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/90 text-orange-dark text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
              {categoryLabel}
            </span>
            {event.fee && (
              <span className="bg-white/90 text-ink text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                {event.fee[lang]}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy leading-tight">
            {event.title[lang]}
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">{dateLabel}</span>
              {event.time && <span className="text-slate-600">{event.time}</span>}
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-4 h-4 text-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location[lang]}</span>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed text-sm md:text-base mt-5 whitespace-pre-line">
            {renderWithLinks(event.description[lang])}
          </p>

          <div className="mt-7 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <p className="text-slate-500 text-xs">{noteLabel}</p>
            <a
              href={EXTERNAL_LINKS.melbourneApplyForm}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer text-center whitespace-nowrap"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
