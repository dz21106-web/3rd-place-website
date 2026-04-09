'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
  lang: 'ja' | 'en'
  setLang: (lang: 'ja' | 'en') => void
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#about', ja: 'わたしたちについて', en: 'About', external: false },
    { href: '/japan', ja: '東京イベント', en: 'Tokyo Event', external: false },
    { href: '/hub', ja: '渡航サポート', en: 'Hub', external: false },
    { href: '#team', ja: 'チーム', en: 'Team', external: false },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="3rd Place" width={34} height={34} className="object-contain" />
          <div className="flex flex-col leading-none">
            <span className={`font-bold text-sm tracking-wide ${scrolled ? 'text-navy' : 'text-white'}`}>3rd Place</span>
            <span className={`text-xs ${scrolled ? 'text-slate-400' : 'text-white/50'}`}>Melbourne</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            link.href.startsWith('/') ? (
              <Link key={link.href} href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-orange ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
                {lang === 'ja' ? link.ja : link.en}
              </Link>
            ) : (
              <a key={link.href} href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-orange ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
                {lang === 'ja' ? link.ja : link.en}
              </a>
            )
          ))}
        </div>

        {/* Right: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            className={`text-xs font-semibold transition-colors ${scrolled ? 'text-gray-500 hover:text-orange' : 'text-white/60 hover:text-white'}`}
          >
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>
          <a href="#cta"
            className="bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors duration-200 cursor-pointer">
            {lang === 'ja' ? '参加する' : 'Join Us'}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            className={`text-xs font-semibold ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`w-8 h-8 flex flex-col justify-center gap-1.5 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {links.map(link => (
            link.href.startsWith('/') ? (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-orange">
                {lang === 'ja' ? link.ja : link.en}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-orange">
                {lang === 'ja' ? link.ja : link.en}
              </a>
            )
          ))}
          <a href="#cta" onClick={() => setMenuOpen(false)}
            className="inline-block bg-orange text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2 cursor-pointer">
            {lang === 'ja' ? '参加する' : 'Join Us'}
          </a>
        </div>
      )}
    </nav>
  )
}
