import type { Metadata } from 'next'
import './globals.css'
import { getSiteUrl } from '../lib/site-url'

const siteUrl = getSiteUrl()
const siteName = '3rd Place'
const defaultTitle = `${siteName} | Melbourne Japanese Community`
const defaultDescription =
  'メルボルンで、仲間と出会い、自分を広げる場所。初参加や一人参加でも入りやすい、日本人コミュニティです。'
const socialImage = '/images/events/curry1.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    locale: 'ja_JP',
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
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [socialImage],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
