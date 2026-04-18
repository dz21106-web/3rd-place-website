'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function Parallax({ children, speed = 0.1, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewCenter = window.innerHeight / 2
      setOffset((center - viewCenter) * speed)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
