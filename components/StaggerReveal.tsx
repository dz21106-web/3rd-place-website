'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface StaggerRevealProps {
  children: ReactNode
  index: number
  className?: string
}

export default function StaggerReveal({ children, index, className = '' }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-stagger-up' : 'opacity-0'} ${className}`}
      style={visible ? { animationDelay: `${index * 100}ms` } : undefined}
    >
      {children}
    </div>
  )
}
