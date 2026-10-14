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

/** スマホのフレーム。spot を渡すとその部分だけ明るく照らし、オレンジの枠で囲む。size="sm" はスマホ表示で横に添える小さな版 */
function PhoneFrame({ screen, screenRatio, screenAlt, spot, label, size = 'md' }: {
  screen: string
  screenRatio: number
  screenAlt: string
  spot: Spot | null
  label?: string
  size?: 'sm' | 'md'
}) {
  const sm = size === 'sm'
  return (
    <div className={`relative mx-auto ${sm ? 'w-28' : 'w-60 md:w-64 lg:w-72'}`}>
      {/* 側面のボタン */}
      {!sm && (
        <>
          <span className="absolute -left-[3px] top-24 w-[3px] h-8 rounded-l bg-sumi-light" aria-hidden="true" />
          <span className="absolute -left-[3px] top-36 w-[3px] h-14 rounded-l bg-sumi-light" aria-hidden="true" />
          <span className="absolute -right-[3px] top-32 w-[3px] h-20 rounded-r bg-sumi-light" aria-hidden="true" />
        </>
      )}

      {/* ベゼル */}
      <div className={`relative bg-sumi shadow-2xl shadow-sumi/40 ring-1 ring-black ${sm ? 'rounded-[1.4rem] p-1.5' : 'rounded-[2.75rem] p-2.5'}`}>
        <div className={`relative overflow-hidden bg-sumi ${sm ? 'rounded-[1.05rem]' : 'rounded-[2.25rem]'}`} style={{ aspectRatio: `${screenRatio}` }}>
          <Image src={img(screen, 'full')} alt={screenAlt} fill sizes={sm ? '112px' : '(max-width: 768px) 240px, 288px'} className="object-cover object-top" />

          {/* スポットライト: 枠の外側を大きな影で暗くし、枠の中だけ元の明るさに見せる */}
          <div
            className={`absolute ring-2 ring-orange transition-all duration-700 ease-out ${sm ? 'rounded-lg' : 'rounded-2xl'} ${spot ? 'opacity-100' : 'opacity-0'}`}
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
          <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-black ${sm ? 'top-1 w-8 h-2.5' : 'top-2.5 w-20 h-5'}`} aria-hidden="true" />
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
 * スマホ: 画面 → intro と縦に並べ、ステップに入ると右側に小さな画面が固定され、PC と同じようにスポットライトが動く。
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

  const spot = steps[active]?.spot ?? null

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
      {/* スマホ表示: まず画面全体を見せる */}
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
            spot={spot}
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

        {/* スマホでは右に小さな画面を固定し、ステップの文章と並べる */}
        <div className="grid grid-cols-[1fr_7rem] gap-4 md:block">
          <ol>
            {steps.map((step, i) => (
              <li
                key={step.n}
                ref={el => { stepRefs.current[i] = el }}
                data-index={i}
                className={`min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-30'}`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="w-10 h-10 rounded-xl bg-orange/15 text-orange flex items-center justify-center flex-shrink-0">{step.icon}</span>
                  <span className="font-display-en font-extrabold text-orange md:text-lg">STEP {step.n}</span>
                  <span className="hidden md:block h-px flex-1 bg-current opacity-20" />
                </div>
                <h3 className="mt-5 font-black tracking-tight text-3xl md:text-6xl">{step.title}</h3>
                <p className="mt-4 md:mt-5 text-sm md:text-xl leading-relaxed opacity-70 max-w-md">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="md:hidden">
            <div className="sticky top-[calc(50vh-8rem)]">
              <PhoneFrame screen={screen} screenRatio={screenRatio} screenAlt={screenAlt} spot={spot} size="sm" />
              <div className="mt-4 flex justify-center gap-1.5">
                {steps.map((step, i) => (
                  <span key={step.n} className={`h-1 rounded-full transition-all duration-500 ${active === i ? 'w-5 bg-orange' : 'w-1 bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
