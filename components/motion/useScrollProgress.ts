'use client'

import { useEffect, useRef, RefObject } from 'react'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * 要素のスクロール進み具合（0〜1）を毎フレーム受け取るフック。
 * React の再描画を起こさないよう、コールバックの中で style を直接書き換える前提。
 *
 *   'pass' … 要素の上端が画面下に入った瞬間 = 0、下端が画面上から出た瞬間 = 1
 *   'pin'  … 高さのあるセクション内で sticky させるとき用。上端が画面上端に来た瞬間 = 0、
 *            セクションの下端が画面下端に来た瞬間 = 1
 */
export default function useScrollProgress(
  ref: RefObject<HTMLElement>,
  onProgress: (progress: number) => void,
  mode: 'pass' | 'pin' = 'pass'
) {
  const callback = useRef(onProgress)
  callback.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = mode === 'pin'
        ? clamp(-rect.top / Math.max(1, rect.height - vh))
        : clamp((vh - rect.top) / (vh + rect.height))
      callback.current(progress)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, mode])
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
