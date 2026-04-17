'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FEATURE_FLAGS } from '../lib/site'

interface NavbarProps {
  lang: 'ja' | 'en'
  setLang: (lang: 'ja' | 'en') => void
  page?: 'melbourne' | 'japan'
}

type PageKey = 'melbourne' | 'japan'

const pageConfig: Record<PageKey, { path: string; ja: string; en: string }> = {
  melbourne: { path: '/', ja: 'コミュニティ', en: 'Community' },
  japan: { path: '/japan', ja: '東京イベント', en: 'Tokyo Event' },
}

const subLinks: Record<PageKey, { href: string; ja: string; en: string }[]> = {
  melbourne: [
    { href: '#about', ja: '3rd Placeとは？', en: "What's 3rd Place?" },
    { href: '#team', ja: 'チーム', en: 'Team' },
    { href: '#faq', ja: 'FAQ', en: 'FAQ' },
  ],
  japan: [
    { href: '#details', ja: 'イベント詳細', en: 'Details' },
    { href: '#apply', ja: '申し込み', en: 'Apply' },
  ],
}

const ctaConfig: Record<PageKey, { href: string; ja: string; en: string }> = {
  melbourne: { href: 'https://lin.ee/U8PVapG', ja: '参加する', en: 'Join Us' },
  japan: { href: '#apply', ja: '申し込む', en: 'Apply' },
}

export default function Navbar({ lang, setLang, page = 'melbourne' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<PageKey | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentPage: PageKey = page
  const isHome = currentPage === 'melbourne'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showWhiteText = isHome && !scrolled
  const cta = ctaConfig[currentPage]
  const isExternal = cta.href.startsWith('http')
  const visiblePages = (Object.keys(pageConfig) as PageKey[]).filter(
    key => FEATURE_FLAGS.hubPublic || key !== 'hub'
  )

  const handleMouseEnter = (key: PageKey) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdownOpen(key)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 150)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      showWhiteText ? 'bg-transparent' : 'bg-white shadow-sm border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="3rd Place" width={34} height={34} className="object-contain" />
          <div className="flex flex-col leading-none">
            <span className={`font-bold text-sm tracking-wide ${showWhiteText ? 'text-white' : 'text-navy'}`}>3rd Place</span>
            <span className={`text-xs ${showWhiteText ? 'text-white/50' : 'text-slate-400'}`}>Melbourne</span>
          </div>
        </Link>

        {/* Desktop: Page tabs with dropdowns */}
        <div className="hidden md:flex items-center gap-1">
          {visiblePages.map(key => {
            const page = pageConfig[key]
            const isActive = currentPage === key
            const hasSubLinks = subLinks[key].length > 0
            const isOpen = dropdownOpen === key

            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={page.path}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? showWhiteText
                        ? 'text-white bg-white/15'
                        : 'text-orange bg-orange/5'
                      : showWhiteText
                        ? 'text-white/60 hover:text-white hover:bg-white/10'
                        : 'text-slate-500 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  {lang === 'ja' ? page.ja : page.en}
                  {hasSubLinks && (
                    <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {hasSubLinks && isOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px] animate-fade-in">
                    {/* If not on this page, show "Go to page" link first */}
                    {!isActive && (
                      <>
                        <Link
                          href={page.path}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-navy hover:text-orange hover:bg-orange/5 transition-colors duration-200"
                        >
                          {lang === 'ja' ? `${page.ja}へ` : `Go to ${page.en}`}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                      </>
                    )}
                    {subLinks[key].map(link => (
                      isActive ? (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setDropdownOpen(null)}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-orange hover:bg-orange/5 transition-colors duration-200 cursor-pointer"
                        >
                          {lang === 'ja' ? link.ja : link.en}
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={`${page.path}${link.href}`}
                          onClick={() => setDropdownOpen(null)}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-orange hover:bg-orange/5 transition-colors duration-200 cursor-pointer"
                        >
                          {lang === 'ja' ? link.ja : link.en}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right: lang toggle + CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            className={`text-xs font-semibold transition-colors cursor-pointer ${
              showWhiteText ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-orange'
            }`}
          >
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>

          {isExternal ? (
            <a href={cta.href} target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-block bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors duration-200 cursor-pointer">
              {lang === 'ja' ? cta.ja : cta.en}
            </a>
          ) : (
            <a href={cta.href}
              className="hidden sm:inline-block bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors duration-200 cursor-pointer">
              {lang === 'ja' ? cta.ja : cta.en}
            </a>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer ${showWhiteText ? 'text-white' : 'text-gray-900'}`}
          >
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-1">
          {visiblePages.map(key => {
            const page = pageConfig[key]
            const isActive = currentPage === key
            return (
              <div key={key}>
                <Link
                  href={page.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-orange/5 text-orange'
                      : 'text-gray-700 hover:text-orange hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {lang === 'ja' ? page.ja : page.en}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange" />}
                  </span>
                  {!isActive && (
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>

                {/* Show sub links for active page */}
                {isActive && subLinks[key].length > 0 && (
                  <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5">
                    {subLinks[key].map(link => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-2 text-sm text-slate-500 hover:text-orange transition-colors duration-200 rounded-lg"
                      >
                        {lang === 'ja' ? link.ja : link.en}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Mobile CTA */}
          <div className="mt-3">
            {isExternal ? (
              <a href={cta.href} target="_blank" rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block bg-orange text-white text-sm font-semibold px-5 py-3 rounded-full text-center cursor-pointer">
                {lang === 'ja' ? cta.ja : cta.en}
              </a>
            ) : (
              <a href={cta.href}
                onClick={() => setMenuOpen(false)}
                className="block bg-orange text-white text-sm font-semibold px-5 py-3 rounded-full text-center cursor-pointer">
                {lang === 'ja' ? cta.ja : cta.en}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
