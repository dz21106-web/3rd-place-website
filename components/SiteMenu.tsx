'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { EXTERNAL_LINKS } from '../lib/site'

interface MenuItem {
  href: string
  label: string
}

interface SiteMenuProps {
  items: MenuItem[]
  hubLabel: string
}

const socials = [
  {
    href: EXTERNAL_LINKS.instagramMelbourne,
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    href: EXTERNAL_LINKS.facebook,
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    href: EXTERNAL_LINKS.tiktok,
    label: 'TikTok',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  },
]

/**
 * 右上の三本線ボタンと、右から出てくる目次パネル。
 * パネルは body 直下に描画する（ヘッダーの backdrop-blur の中に置くと、fixed がヘッダー基準になり画面全体に広がらないため）。
 * 目次をタップするとパネルを閉じ、そのセクションへスクロールする（スクロールは Lenis の anchors に任せる）。
 */
export default function SiteMenu({ items, hubLabel }: SiteMenuProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Esc で閉じる
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="メニューを開く"
        aria-expanded={open}
        aria-controls="site-menu"
        className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:text-orange transition-colors duration-200 cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>

      {mounted && createPortal(<>
      {/* 背景の暗幕（タップで閉じる） */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        className={`design-a fixed top-0 right-0 bottom-0 z-[80] w-[85%] max-w-sm bg-sumi/90 backdrop-blur-xl ring-1 ring-black text-white flex flex-col transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        // data-lenis-prevent: パネルの中のスクロールを Lenis に横取りさせない
        data-lenis-prevent
      >
        <div className="h-16 px-6 flex items-center justify-between flex-shrink-0">
          <span className="font-display-en text-xs font-bold tracking-[0.2em] uppercase opacity-70">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="メニューを閉じる" className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:text-orange transition-colors duration-200 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6">
          <ol>
            {items.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-4 cursor-pointer"
                >
                  <span className="font-display-en text-xs font-bold text-orange">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xl font-black group-hover:text-orange transition-colors duration-200">{item.label}</span>
                </a>
                <span className="block h-px bg-current opacity-10" aria-hidden="true" />
              </li>
            ))}
          </ol>

          <a
            href={EXTERNAL_LINKS.hub}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center bg-orange text-white font-bold py-4 rounded-full hover:bg-white hover:ring-1 hover:ring-black transition-colors duration-200 cursor-pointer"
          >
            {hubLabel}
          </a>
        </nav>

        <div className="px-6 py-6 flex items-center gap-5 flex-shrink-0">
          {socials.map(sns => (
            <a key={sns.label} href={sns.href} target="_blank" rel="noopener noreferrer" aria-label={sns.label} className="opacity-70 hover:opacity-100 hover:text-orange transition-colors duration-200 cursor-pointer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={sns.path} /></svg>
            </a>
          ))}
        </div>
      </aside>
      </>, document.body)}
    </>
  )
}
