'use client'

import { useEffect, useRef } from 'react'

interface ScrollGlowProps {
  className?: string
  range?: number
}

/**
 * スクロールに合わせてゆっくり動く装飾の光。
 *
 * 直した点（iPhone で描画が数秒止まっていた原因）:
 *  1. will-change: transform を外した
 *     「この要素をGPUに常駐させろ」という指示。ぼかしと組み合わさると
 *     メモリを確保したまま離さず、iOS Safari の上限を超えていた。
 *  2. スクロールのたびに setState していたのをやめ、style を直接書くようにした
 *     以前は1回スクロールするたびに React の再描画が走っていた。
 *  3. requestAnimationFrame で間引くようにした
 *     スクロールイベントは1秒に60〜120回飛ぶが、画面の更新は
 *     1フレームに1回で足りる。
 *
 * 光そのものは blur() をやめて放射グラデーション（.glow-orange）で描く。
 * 理由は app/globals.css のコメントを参照。
 */
export default function ScrollGlow({ className = '', range = 80 }: ScrollGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 「視差効果を減らす」設定の人には動かさない
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let queued = false

    const update = () => {
      queued = false
      const rect = el.getBoundingClientRect()
      const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)
      const shift = progress * range
      el.style.transform = `translate3d(${shift * 0.3}px, ${shift * -0.5}px, 0)`
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [range])

  return <div ref={ref} className={className} aria-hidden />
}
