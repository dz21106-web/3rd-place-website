'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { img } from '../../lib/images'

interface HoverItem {
  n: string
  title: string
  desc: string
  src: string
}

/**
 * 項目にマウスを乗せると、その項目の写真がカーソルについて浮かぶ一覧（PC のみ）。
 * スマホでは各項目に小さな写真を並べて表示する。
 */
export default function HoverImageList({ items }: { items: HoverItem[] }) {
  const [active, setActive] = useState<number | null>(null)
  const floatRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = floatRef.current
    if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
      {/* 区切り線は bg-current で描く（背景色が切り替わっても文字色に合わせて馴染む） */}
      <ul className="relative">
        <span className="absolute bottom-0 inset-x-0 h-px bg-current opacity-20" />
        {items.map((item, i) => (
          <li
            key={item.n}
            onMouseEnter={() => setActive(i)}
            className="group relative grid grid-cols-12 items-center gap-4 py-8 md:py-12 cursor-default"
          >
            <span className="absolute top-0 inset-x-0 h-px bg-current opacity-20" />
            <span className="col-span-2 md:col-span-1 font-display-en font-bold text-sm text-orange">{item.n}</span>
            <h3 className="col-span-6 md:col-span-5 font-black tracking-tight text-4xl md:text-7xl transition-transform duration-500 md:group-hover:translate-x-4">
              {item.title}
            </h3>
            <div className="md:hidden col-span-4 relative aspect-square rounded-xl overflow-hidden">
              <Image src={img(item.src, 'thumb')} alt="" fill sizes="30vw" className="object-cover" />
            </div>
            <p className="col-span-12 md:col-span-5 md:col-start-8 opacity-70 md:text-lg leading-relaxed">{item.desc}</p>
          </li>
        ))}
      </ul>

      {/* カーソルに付いてくる写真（PC のみ） */}
      <div
        ref={floatRef}
        className="hidden md:block fixed top-0 left-0 z-40 pointer-events-none"
        aria-hidden="true"
      >
        <div className={`relative w-72 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black transition-all duration-300 ${active === null ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
          {items.map((item, i) => (
            <Image
              key={item.src}
              src={img(item.src, 'card')}
              alt=""
              fill
              sizes="288px"
              className={`object-cover transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
