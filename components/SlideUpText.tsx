'use client'

import { useEffect, useRef, useState, ElementType } from 'react'

/** 1行 = 文字列、または色などを変えたい部分を { text, className } で区切った配列 */
type Segment = string | { text: string; className: string }
type Line = Segment | Segment[]

interface SlideUpTextProps {
  lines: Line[]
  as?: ElementType
  className?: string
  /** 'char' = 1文字ずつ（日本語向け） / 'word' = 1単語ずつ（英語向け） */
  split?: 'char' | 'word'
  /** 最初の文字が動き出すまでの待ち時間（ms） */
  delay?: number
  /** 1単位ごとのずらし（ms） */
  stagger?: number
}

/**
 * 見出しの文字が下からせり上がって現れる演出。
 * 各文字を overflow:hidden の箱に入れ、中身を 110% 下から元の位置へ動かす。
 * スクリーンリーダーには aria-label で全文を渡し、分割した文字は読ませない。
 */
export default function SlideUpText({
  lines,
  as: Tag = 'h2',
  className = '',
  split = 'char',
  delay = 0,
  stagger = 35,
}: SlideUpTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const normalized = lines.map(line =>
    (Array.isArray(line) ? line : [line]).map(seg =>
      typeof seg === 'string' ? { text: seg, className: '' } : seg
    )
  )
  const fullText = normalized.map(line => line.map(seg => seg.text).join('')).join(' ')

  let unitIndex = 0

  return (
    <Tag ref={ref} className={className} aria-label={fullText}>
      {normalized.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.map((seg, si) => {
            const units = split === 'char' ? Array.from(seg.text) : seg.text.split(/(\s+)/).filter(Boolean)
            return units.map((unit, ui) => {
              if (/^\s+$/.test(unit)) return <span key={`${si}-${ui}`}> </span>
              const i = unitIndex++
              return (
                <span key={`${si}-${ui}`} className="slide-up-unit">
                  <span
                    className={`${seg.className} ${inView ? 'is-in' : ''}`}
                    style={{ transitionDelay: `${delay + i * stagger}ms` }}
                  >
                    {unit}
                  </span>
                </span>
              )
            })
          })}
        </span>
      ))}
    </Tag>
  )
}
