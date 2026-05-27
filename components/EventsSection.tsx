'use client'

import { useMemo, useState } from 'react'
import { UPCOMING_EVENTS, type EventItem } from '../lib/events'
import { EXTERNAL_LINKS } from '../lib/site'
import EventCard from './EventCard'
import EventDetailModal from './EventDetailModal'
import ScrollReveal from './ScrollReveal'

type Lang = 'ja' | 'en'

interface EventsSectionProps {
  lang: Lang
}

function isUpcoming(event: EventItem): boolean {
  // 開催日の終わりまで「今後」として扱う
  const [y, m, d] = event.date.split('-').map(Number)
  const endOfEventDay = new Date(y, m - 1, d, 23, 59, 59)
  return endOfEventDay.getTime() >= Date.now()
}

export default function EventsSection({ lang }: EventsSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const upcoming = useMemo(
    () =>
      UPCOMING_EVENTS.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date)),
    []
  )

  const selectedEvent = upcoming.find((e) => e.id === selectedId) ?? null

  const heading = lang === 'ja' ? '今後のイベント' : 'Upcoming Events'
  const eyebrow = lang === 'ja' ? 'EVENTS' : 'EVENTS'
  const subtitle =
    lang === 'ja'
      ? '毎月のカレー会から特別イベント・ワークショップまで、最新の予定をまとめています。'
      : 'From monthly Curry Nights to one-off specials and workshops — here\'s what\'s coming up next.'
  const emptyTitle = lang === 'ja' ? '次回イベント、準備中です' : 'Next event coming soon'
  const emptyBody =
    lang === 'ja'
      ? '日程が決まり次第こちらに掲載します。先にLINEグループに入っておくと、開催決定の通知が届きます。'
      : 'We\'ll post the next event here as soon as it\'s confirmed. Join the LINE group to be the first to know.'
  const ctaLabel = lang === 'ja' ? 'LINEグループに参加する' : 'Join the LINE Group'
  const membershipNotice =
    lang === 'ja'
      ? 'イベントへの参加には3rd PlaceのコミュニティLINEグループへのご参加が必要です。'
      : 'Joining the 3rd Place community LINE group is required to attend any of our events.'

  return (
    <section id="events" className="bg-cream-dark/40 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="text-orange text-xs font-semibold uppercase tracking-widest">
              {eyebrow}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-3 mb-4">
              {heading}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-5 inline-flex items-start gap-2 bg-orange/10 text-orange-dark text-xs md:text-sm font-medium px-4 py-2.5 rounded-full text-left">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{membershipNotice}</span>
            </div>
            <div className="mt-4">
              <a
                href={EXTERNAL_LINKS.melbourneApplyForm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer"
              >
                {ctaLabel}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {upcoming.length === 0 ? (
          <ScrollReveal>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-10 text-center">
              <h3 className="font-heading text-xl font-bold text-navy">{emptyTitle}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">{emptyBody}</p>
              <a
                href={EXTERNAL_LINKS.melbourneApplyForm}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm cursor-pointer"
              >
                {ctaLabel}
              </a>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  lang={lang}
                  onDetailClick={() => setSelectedId(event.id)}
                />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          lang={lang}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  )
}
