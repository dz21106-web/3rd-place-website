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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
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
