'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { img } from '../../lib/images'
import useScrollProgress, { prefersReducedMotion } from './useScrollProgress'

interface ScrollPhotoRowProps {
  photos: string[]
  /** 1 = スクロールで右へ、-1 = 左へ */
  direction?: 1 | -1
}

/** スクロール量に連動して横に流れる写真の帯（自動では動かない） */
export default function ScrollPhotoRow({ photos, direction = 1 }: ScrollPhotoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useScrollProgress(rowRef, p => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return
    const shift = (p - 0.5) * 40 * direction // 画面幅の ±20% ぶん動く
    track.style.transform = `translate3d(${shift - 10}%, 0, 0)`
  })

  return (
    <div ref={rowRef} className="overflow-hidden">
      <div ref={trackRef} className="flex gap-4 md:gap-6 w-max will-change-transform" style={{ transform: 'translate3d(-10%, 0, 0)' }}>
        {photos.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 w-[45vw] md:w-[22vw] aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={img(src, 'card')} alt="" fill sizes="(max-width: 768px) 45vw, 22vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
