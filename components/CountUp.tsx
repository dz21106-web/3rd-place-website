'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string
  duration?: number
  className?: string
}

function parseNumeric(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^([^\d]*)([\d]+)(.*)$/)
  if (!match) return null
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] }
}

export default function CountUp({ value, duration = 1500, className = '' }: CountUpProps) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const parsed = parseNumeric(value)
    if (!parsed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const target = parsed.number

          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * target)
            setDisplay(`${parsed.prefix}${current}${parsed.suffix}`)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref} className={className}>{display}</span>
}
