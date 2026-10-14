'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import Image from 'next/image'
import { img } from '../../lib/images'
import useScrollProgress from './useScrollProgress'

interface GalleryItem {
  src: string
  label: string
}

interface HorizontalGalleryProps {
  items: GalleryItem[]
  /** 左端に置く見出しなど */
  intro: ReactNode
}

/**
 * 縦にスクロールすると、写真の列が横に進むギャラリー。
 * 列の横幅ぶんだけセクションの高さを確保し、その中で列を sticky 固定して
 * 進み具合に応じて translateX する。
 */
export default function HorizontalGallery({ items, intro }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // 列の横幅 − 画面幅 = 横に動かす距離。その分だけ縦の高さを足す
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [items.length])

  useScrollProgress(sectionRef, p => {
    const track = trackRef.current
    if (track) track.style.transform = `translate3d(${-p * distance}px, 0, 0)`
  }, 'pin')

  return (
    <section ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div ref={trackRef} className="flex items-center gap-5 md:gap-8 pl-4 md:pl-12 pr-[10vw] will-change-transform">
          <div className="flex-shrink-0 w-[80vw] md:w-[34vw] pr-4">{intro}</div>
          {items.map((item, i) => (
            <figure
              key={item.src}
              className={`group flex-shrink-0 w-[68vw] md:w-[26vw] ${i % 2 === 1 ? 'md:mt-24' : 'md:-mt-24'}`}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={img(item.src, 'card')}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 70vw, 26vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 font-bold">
                <span className="font-display-en text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
