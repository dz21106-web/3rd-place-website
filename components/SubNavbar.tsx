'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface SubNavbarProps {
  lang: 'ja' | 'en'
  setLang: (lang: 'ja' | 'en') => void
  page: 'japan' | 'hub'
  ctaHref?: string
}

export default function SubNavbar({ lang, setLang, page, ctaHref = '#apply' }: SubNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pageName = page === 'japan' ? 'Japan' : 'Hub'
  const ctaLabel = lang === 'ja' ? '申し込む' : 'Apply'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image src="/images/logo.png" alt="3rd Place" width={34} height={34} className="object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-wide text-navy">3rd Place</span>
            <span className="text-xs text-slate-400">{pageName}</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-orange transition-colors duration-200 font-medium cursor-pointer">
            {lang === 'ja' ? 'メルボルン' : 'Melbourne'}
          </Link>
          {page === 'hub' && (
            <Link href="/japan" className="text-sm text-slate-500 hover:text-orange transition-colors duration-200 font-medium cursor-pointer">
              {lang === 'ja' ? '東京イベント' : 'Tokyo Event'}
            </Link>
          )}
          {page === 'japan' && (
            <Link href="/hub" className="text-sm text-slate-500 hover:text-orange transition-colors duration-200 font-medium cursor-pointer">
              {lang === 'ja' ? '渡航サポート' : 'Hub'}
            </Link>
          )}
        </div>

        {/* Right: lang + CTA + mobile menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            className="text-xs font-semibold text-slate-500 hover:text-orange transition-colors duration-200 cursor-pointer"
          >
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>
          <a href={ctaHref}
            className="bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors duration-200 cursor-pointer">
            {ctaLabel}
          </a>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 text-gray-900 cursor-pointer">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          <Link href="/" onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-orange transition-colors duration-200">
            {lang === 'ja' ? '← メルボルン' : '← Melbourne'}
          </Link>
          {page === 'hub' && (
            <Link href="/japan" onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors duration-200">
              {lang === 'ja' ? '東京イベント' : 'Tokyo Event'}
            </Link>
          )}
          {page === 'japan' && (
            <Link href="/hub" onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-orange transition-colors duration-200">
              {lang === 'ja' ? '渡航サポート' : 'Hub'}
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
