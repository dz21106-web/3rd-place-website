'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis による慣性スクロール（ホイール操作のみ）。
 * タッチ操作はネイティブのまま（syncTouch: false がデフォルト）なので、スマホの負荷は増えない。
 * 「視差効果を減らす」設定の人には適用しない。
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
