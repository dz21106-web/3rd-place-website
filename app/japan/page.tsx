import type { Metadata } from 'next'
import JapanPageClient from './JapanPageClient'

const title = '東京ワーホリ・留学準備イベント'
const description =
  '東京で毎月開催する、ワーホリ・留学準備のためのイベント。メルボルン帰国者のリアルな話と、英語交流で出発前の不安をなくそう。'
const socialImage = '/images/japan/event1.jpg'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/japan',
  },
  openGraph: {
    url: '/japan',
    title: `${title} | 3rd Place`,
    description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: '3rd Place Japan event',
      },
    ],
  },
  twitter: {
    title: `${title} | 3rd Place`,
    description,
    images: [socialImage],
  },
}

export default function JapanPage() {
  return <JapanPageClient />
}
