'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import Image from 'next/image'
import { img } from '../../lib/images'

/** スクリーンショット上の位置（画像の幅・高さに対する %） */
interface Spot {
  top: number
  height: number
  left?: number
  width?: number
}

interface Step {
  n: string
  title: string
  desc: string
  icon: ReactNode
  /** スポットライトの横に出す小さなラベル */
  screenLabel: string
  /** このステップで照らす、スクリーンショット上の範囲 */
  spot: Spot
}

interface StickyPhoneStepsProps {
  steps: Step[]
  /** アプリのスクリーンショット */
  screen: string
  /** スクリーンショットの元の縦横比（幅 / 高さ）。画面の枠をこれに合わせ、切り抜かずに見せる */
  screenRatio: number
  screenAlt: string
  /** ステップの前（右側の列の先頭）に置く説明文など。読んでいる間はスポットライトを消し、画面全体を見せる */
  intro?: ReactNode
}

/** スマホのフレーム。spot を渡すとその部分だけ明るく照らし、オレンジの枠で囲む */
function PhoneFrame({ screen, screenRatio, screenAlt, spot, label }: {
  screen: string
  screenRatio: number
  screenAlt: string
  spot: Spot | null
  label?: string
}) {
  return (
    <div className="relative mx-auto w-60 md:w-64 lg:w-72">
      {/* 側面のボタン */}
      <span className="absolute -left-[3px] top-24 w-[3px] h-8 rounded-l bg-sumi-light" aria-hidden="true" />
      <span className="absolute -left-[3px] top-36 w-[3px] h-14 rounded-l bg-sumi-light" aria-hidden="true" />
      <span className="absolute -right-[3px] top-32 w-[3px] h-20 rounded-r bg-sumi-light" aria-hidden="true" />

      {/* ベゼル */}
      <div className="relative rounded-[2.75rem] bg-sumi p-2.5 shadow-2xl shadow-sumi/40 ring-1 ring-black">
        <div className="relative rounded-[2.25rem] overflow-hidden bg-sumi" style={{ aspectRatio: `${screenRatio}` }}>
          <Image src={img(screen, 'full')} alt={screenAlt} fill sizes="(max-width: 768px) 240px, 288px" className="object-cover object-top" />

          {/* スポットライト: 枠の外側を大きな影で暗くし、枠の中だけ元の明るさに見せる */}
          <div
            className={`absolute rounded-2xl ring-2 ring-orange transition-all duration-700 ease-out ${spot ? 'opacity-100' : 'opacity-0'}`}
            style={{
              top: `${spot?.top ?? 0}%`,
              height: `${spot?.height ?? 0}%`,
              left: `${spot?.left ?? 3}%`,
              width: `${spot?.width ?? 94}%`,
              boxShadow: '0 0 0 999px rgb(0 0 0 / 0.5), 0 0 24px 4px rgb(var(--glow-rgb) / 0.6)',
            }}
            aria-hidden="true"
          >
            {label && (
              <span className="absolute -top-3 left-3 bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                {label}
              </span>
            )}
          </div>

          {/* ダイナミックアイランド */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black" aria-hidden="true" />
          {/* ガラスの映り込み */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

/**
 * PC: 左にスマホ画面を sticky 固定し、右の列（intro → ステップ）をスクロールすると、
 *     画面の中のスポットライトがそのステップに関係する部分へ移動する（intro の間は消灯）。
 * スマホ: 画面 → intro → ステップ の順に縦に並べる（固定・スポットライトなし）。
 */
export default function StickyPhoneSteps({ steps, screen, screenRatio, screenAlt, intro }: StickyPhoneStepsProps) {
  // -1 = intro を読んでいる（スポットライトなし）
  const [active, setActive] = useState(-1)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const introRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    stepRefs.current.forEach(el => el && observer.observe(el))
    if (introRef.current) observer.observe(introRef.current)
    return () => observer.disconnect()
  }, [steps.length])

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
      {/* スマホ表示: 画面だけ見せる */}
      <div className="md:hidden">
        <PhoneFrame screen={screen} screenRatio={screenRatio} screenAlt={screenAlt} spot={null} />
      </div>

      {/* PC 表示: 固定してスポットライトを動かす */}
      <div className="hidden md:block">
        <div className="sticky top-24">
          <PhoneFrame
            screen={screen}
            screenRatio={screenRatio}
            screenAlt={screenAlt}
            spot={steps[active]?.spot ?? null}
            label={steps[active]?.screenLabel}
          />
          {/* Progress dots */}
          <div className="mt-8 flex justify-center gap-2">
            {steps.map((step, i) => (
              <span key={step.n} className={`h-1.5 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-orange' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* 右の列: intro → Steps */}
      <div>
      {intro && (
        <div ref={introRef} data-index={-1} className="pb-16 md:pb-24">
          {intro}
        </div>
      )}
      <ol>
        {steps.map((step, i) => (
          <li
            key={step.n}
            ref={el => { stepRefs.current[i] = el }}
            data-index={i}
            className={`md:min-h-[70vh] flex flex-col justify-center py-10 md:py-0 transition-opacity duration-500 ${active === i ? 'md:opacity-100' : 'md:opacity-30'}`}
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-orange/15 text-orange flex items-center justify-center flex-shrink-0">{step.icon}</span>
              <span className="font-display-en font-extrabold text-orange text-lg">STEP {step.n}</span>
              <span className="h-px flex-1 bg-current opacity-20" />
            </div>
            <h3 className="mt-5 font-black tracking-tight text-4xl md:text-6xl">{step.title}</h3>
            <p className="mt-5 text-base md:text-xl leading-relaxed opacity-70 max-w-md">{step.desc}</p>
          </li>
        ))}
      </ol>
      </div>
    </div>
  )
}
