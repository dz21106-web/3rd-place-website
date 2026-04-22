import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

const title = 'メルボルン日系コミュニティ・交流イベント'
const description =
  'メルボルンで、仲間と出会い、自分を広げる場所。初参加や一人参加でも入りやすい、日系コミュニティです。'
const socialImage = '/images/events/curry/curry12.jpg'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: `3rd Place | ${title}`,
    description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: '3rd Place community event',
      },
    ],
  },
  twitter: {
    title: `3rd Place | ${title}`,
    description,
    images: [socialImage],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
