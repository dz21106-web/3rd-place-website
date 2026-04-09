import Image from 'next/image'
import Link from 'next/link'

interface SubFooterProps {
  lang: 'ja' | 'en'
  page: 'japan' | 'hub'
}

export default function SubFooter({ lang, page }: SubFooterProps) {
  const pageName = page === 'japan' ? 'Japan' : 'Hub'
  const backLabel = lang === 'ja' ? '← トップページへ戻る' : '← Back to Top'

  return (
    <footer className="py-12 bg-ink border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="3rd Place" width={28} height={28} className="object-contain" />
          <span className="text-white/50 text-sm">3rd Place {pageName}</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
            {backLabel}
          </Link>
          {page === 'japan' && (
            <Link href="/hub" className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
              3rd Place Hub
            </Link>
          )}
          {page === 'hub' && (
            <Link href="/japan" className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer">
              3rd Place Japan
            </Link>
          )}
        </div>
        <p className="text-white/20 text-xs">© 2026 3rd Place. All rights reserved.</p>
      </div>
    </footer>
  )
}
