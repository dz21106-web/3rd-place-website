'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right'
}

const animationClass = {
  up: 'animate-fade-up',
  left: 'animate-fade-left',
  right: 'animate-fade-right',
}

export default function ScrollReveal({ children, className = '', direction = 'up' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 表示済みならすぐ出す（画面より上にある要素・戻ってきた時のため）
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      // threshold: 0 = 「上端が画面に入った瞬間」。
      // 以前の 0.1 は「要素の面積の10%」という意味で、スマホでは縦に伸びた
      // セクションの 300px 分が入るまで真っ白だった（＝スクロールしても出ない）。
      // rootMargin の下 -80px は、80px 見えてから動き出すための一定の余白。
      // 要素の高さに関係なく常に同じタイミングになる。
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [direction])

  return (
    <div ref={ref} className={`${revealed ? animationClass[direction] : 'opacity-0'} ${className}`}>
      {children}
    </div>
  )
}
