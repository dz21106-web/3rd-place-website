'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { img } from '../../lib/images'
import { prefersReducedMotion } from './useScrollProgress'

interface FloatingPhotoProps {
  src: string
  alt?: string
  /** 位置・大きさ・縦横比などの Tailwind クラス（例: 'top-[10%] left-[4%] w-[30vw] aspect-[3/4]'） */
  className: string
  /** スクロール量に対する移動の速さ。大きいほど速く上へ逃げる */
  speed: number
  /** 傾き（度） */
  rotate?: number
  /** 出現アニメーションの遅れ（ms） */
  delay?: number
}

/** Hero の周りに浮かぶ写真。写真ごとに違う速さで動くことで奥行きを出す */
export default function FloatingPhoto({ src, alt = '', className, speed, rotate = 0, delay = 0 }: FloatingPhotoProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let ticking = false
    const update = () => {
      ticking = false
      const y = window.scrollY * speed
      el.style.transform = `translate3d(0, ${-y}px, 0) rotate(${rotate + window.scrollY * speed * 0.02}deg)`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed, rotate])

  return (
    <div className={`absolute ${className}`}>
      <div className="animate-pop-in w-full h-full" style={{ animationDelay: `${delay}ms` }}>
        <div
          ref={ref}
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-sumi/20 ring-1 ring-black will-change-transform"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <Image src={img(src, 'card')} alt={alt} fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover" />
          {/* ガラスの映り込み */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
