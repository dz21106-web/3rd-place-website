'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollGlowProps {
  className?: string
  range?: number
}

export default function ScrollGlow({ className = '', range = 80 }: ScrollGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height)
      setShift(progress * range)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [range])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${shift * 0.3}px, ${shift * -0.5}px)`,
        willChange: 'transform',
      }}
    />
  )
}
