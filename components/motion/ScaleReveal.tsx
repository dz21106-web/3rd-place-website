'use client'

import { useRef, ReactNode } from 'react'
import Image from 'next/image'
import { img } from '../../lib/images'
import useScrollProgress, { prefersReducedMotion } from './useScrollProgress'

interface ScaleRevealProps {
  /** 写真を使う場合 */
  src?: string
  /** 動画を使う場合（音声は出さない）。縦長動画を想定 */
  video?: string
  alt: string
  /** 写真が画面いっぱいに広がった後に重ねる内容 */
  children?: ReactNode
}

/**
 * 小さな写真（動画）が、スクロールに合わせて画面いっぱいまで広がる。
 * セクション自体は 250vh の高さを持ち、その中で写真を sticky で固定して、
 * 進み具合に応じて clip-path（切り抜き範囲）を広げていく。
 *
 * 動画は縦長のため、PC では全面に敷くと上下が大きく切れる。そこで PC では
 * 同じ動画を背景に暗く敷き、中央に縦長のまま切らずに重ねる（スマホは全面表示のみ）。
 */
export default function ScaleReveal({ src, video, alt, children }: ScaleRevealProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useScrollProgress(sectionRef, p => {
    const clip = clipRef.current
    const image = imageRef.current
    const overlay = overlayRef.current
    if (!clip || !image || !overlay) return

    // 前半 70% で広がりきり、残りは全画面のまま文字を見せる
    const t = prefersReducedMotion() ? 1 : Math.min(1, p / 0.7)
    const eased = 1 - Math.pow(1 - t, 3)
    const isMobile = window.innerWidth < 768
    const insetY = (isMobile ? 22 : 18) * (1 - eased)
    const insetX = (isMobile ? 10 : 30) * (1 - eased)
    const radius = 28 * (1 - eased)
    clip.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`
    image.style.transform = `scale(${1.25 - 0.25 * eased})`
    overlay.style.opacity = String(Math.max(0, (p - 0.55) / 0.25))
  }, 'pin')

  // muted + playsInline が無いと、iPhone では自動再生されない
  const videoProps = { src: video, autoPlay: true, muted: true, loop: true, playsInline: true, preload: 'auto' as const, 'aria-label': alt }

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={clipRef} className="absolute inset-0" style={{ clipPath: 'inset(18% 30% 18% 30% round 28px)' }}>
          <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.25)' }}>
            {video ? (
              <>
                <video {...videoProps} className="absolute inset-0 w-full h-full object-cover" />
                {/* PC: 中央に縦長のまま、切らずに重ねる */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center bg-sumi/60">
                  <video {...videoProps} aria-hidden="true" className="h-full aspect-[9/16] object-cover shadow-2xl" />
                </div>
              </>
            ) : (
              src && <Image src={img(src, 'full')} alt={alt} fill sizes="100vw" className="object-cover" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-sumi/80 via-sumi/30 to-sumi/10" />
        </div>
        <div ref={overlayRef} className="absolute inset-0 flex items-center justify-center px-4" style={{ opacity: 0 }}>
          {children}
        </div>
      </div>
    </section>
  )
}
