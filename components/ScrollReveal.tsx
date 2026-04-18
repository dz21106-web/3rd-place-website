'use client'

import { useEffect, useRef, ReactNode } from 'react'

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

const initialTransform = {
  up: 'translate-y-4',
  left: '-translate-x-8',
  right: 'translate-x-8',
}

export default function ScrollReveal({ children, className = '', direction = 'up' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(animationClass[direction])
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [direction])

  return (
    <div ref={ref} className={`opacity-0 ${initialTransform[direction]} ${className}`}>
      {children}
    </div>
  )
}
