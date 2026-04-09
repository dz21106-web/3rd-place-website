import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3rd Place | Melbourne Japanese Community',
  description: 'メルボルンで、仲間と出会い、自分を広げる場所 — A place to meet friends and grow in Melbourne.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
