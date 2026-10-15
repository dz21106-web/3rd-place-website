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
  /** 照らした部分の上に出す小さなラベル */
  screenLabel: string
  /** このステップでズームして照らす、スクリーンショット上の範囲 */
  spot: Spot
}

interface StickyPhoneStepsProps {
  steps: Step[]
  /** アプリのスクリーンショット */
  screen: string
  /** スクリーンショットの元の縦横比（幅 / 高さ）。画面の枠をこれに合わせ、切り抜かずに見せる */
  screenRatio: number
  screenAlt: string
  /** 番号の前に付ける文字（STEP 01 / POINT 01 など） */
  kicker?: string
}

/** 寄りすぎると画像が粗くなるので、ズームの上限を決めておく */
const MAX_ZOOM = 2.6
/** 1ステップ進むのに必要なスクロール量（画面の高さに対する %。100 = 画面1枚分） */
const STEP_SCROLL = 60

/**
 * スマホ本体ごと拡大し、spot が表示枠（stage）の中央に来るようにする。
 * stageToPhone = 表示枠の幅 ÷ スマホの幅。照らす範囲が表示枠の幅 9 割・高さ 8 割に収まる倍率を選ぶ。
 * 返す x, y はスマホの大きさに対する % で、拡大する前に spot の中心をスマホの中心へ動かす量。
 */
function focusOn(spot: Spot | null, stageToPhone: number) {
  if (!spot) return { zoom: 1, x: 0, y: 0 }
  const left = spot.left ?? 3
  const width = spot.width ?? 94
  const zoom = Math.max(1, Math.min(MAX_ZOOM, (90 * stageToPhone) / width, 80 / spot.height))
  return { zoom, x: 50 - (left + width / 2), y: 50 - (spot.top + spot.height / 2) }
}

/**
 * アプリ画面を1つだけ画面に固定し、スクロールに合わせてスマホ本体ごと各ステップの部分へズームしていく。
 * 最初（どのステップにも入る前）はアプリ全体を見せ、そこから途切れずに説明へ入る。
 * PC: 左に画面、右に説明 / スマホ: 上に画面、下に説明。
 */
export default function StickyPhoneSteps({ steps, screen, screenRatio, screenAlt, kicker = 'STEP' }: StickyPhoneStepsProps) {
  // -1 = まだステップに入っていない（全体を見せる）
  const [active, setActive] = useState(-1)
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([])
  const stageRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  // 表示枠の幅 ÷ スマホの幅。画面サイズが変わったら測り直す
  const [stageToPhone, setStageToPhone] = useState(1)

  useEffect(() => {
    const stage = stageRef.current
    const phone = phoneRef.current
    if (!stage || !phone) return
    const measure = () => setStageToPhone(stage.offsetWidth / Math.max(1, phone.offsetWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    // 画面の真ん中の線を通過した目印で、いまのステップを決める
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    triggerRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [steps.length])

  const spot = steps[active]?.spot ?? null
  const { zoom, x, y } = focusOn(spot, stageToPhone)

  return (
    // 高さ = 固定する画面1枚分 + 全体を見せる半ステップ + ステップ数分。この間、中身は sticky で固定される
    <div className="relative" style={{ height: `${100 + (steps.length + 0.5) * STEP_SCROLL}svh` }}>
      {/* スクロール量の目印（見えない）。画面の真ん中の線がどの目印にあるかで、いまのステップが決まる。
          先頭は固定が始まるまでの半画面 + 半ステップ、最後は固定が終わるまでの半画面を足す */}
      <div className="absolute inset-0 flex flex-col" aria-hidden="true">
        {[-1, ...steps.map((_, i) => i)].map(i => {
          const h = i === -1 ? 50 + STEP_SCROLL / 2 : i === steps.length - 1 ? STEP_SCROLL + 50 : STEP_SCROLL
          return <div key={i} ref={el => { triggerRefs.current[i + 1] = el }} data-index={i} style={{ height: `${h}svh` }} />
        })}
      </div>

      <div className="sticky top-0 h-[100svh] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 pt-20 pb-6 md:py-0">
        {/* 表示枠。スマホ本体ごと拡大するので、はみ出した部分は隠す */}
        <div ref={stageRef} className="relative w-full md:w-1/2 h-[56svh] md:h-[80svh] max-h-[760px] flex-shrink-0 overflow-hidden">
          <div
            ref={phoneRef}
            className="absolute left-1/2 top-1/2 h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
            style={{ aspectRatio: `${screenRatio}`, transform: `translate(-50%, -50%) scale(${zoom}) translate(${x}%, ${y}%)` }}
          >
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] bg-sumi p-2 md:p-2.5 shadow-2xl shadow-black/40 ring-1 ring-black">
              <div className="relative w-full h-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-sumi">
                <Image src={img(screen, 'full')} alt={screenAlt} fill sizes="(max-width: 768px) 90vw, 50vw" className="object-cover object-top" />
                {/* 照らす枠: 外側を影で少し暗くし、オレンジの線で囲む */}
                <div
                  className={`absolute rounded-xl ring-2 ring-orange transition-all duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${spot ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    top: `${spot?.top ?? 0}%`,
                    height: `${spot?.height ?? 0}%`,
                    left: `${spot?.left ?? 3}%`,
                    width: `${spot?.width ?? 94}%`,
                    boxShadow: '0 0 0 999px rgb(0 0 0 / 0.35)',
                  }}
                  aria-hidden="true"
                />
                {/* ダイナミックアイランド */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-20 h-5 rounded-full bg-black" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* 説明。ステップごとに重ねて置き、いまのものだけを見せる */}
        <div className="relative w-full max-w-md flex-1 md:flex-none md:h-[60svh] px-2">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className={`absolute inset-x-2 top-0 md:top-1/2 md:-translate-y-1/2 transition-all duration-500 ${active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
              aria-hidden={active !== i}
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-orange/15 text-orange flex items-center justify-center flex-shrink-0">{step.icon}</span>
                <span className="font-display-en font-extrabold text-orange md:text-lg">{kicker} {step.n}</span>
              </div>
              <h3 className="mt-3 md:mt-5 font-heading font-bold tracking-tight text-2xl md:text-5xl">{step.title}</h3>
              <p className="mt-2 md:mt-5 body-text text-sm md:text-lg leading-relaxed">{step.desc}</p>
            </div>
          ))}

          {/* 全体を見せている間の案内 */}
          <p className={`absolute inset-x-2 top-0 md:top-1/2 md:-translate-y-1/2 font-display-en text-sm md:text-base font-bold transition-opacity duration-500 ${active === -1 ? 'opacity-60' : 'opacity-0'}`} aria-hidden="true">
            Scroll ↓
          </p>

          {/* 進み具合 */}
          <div className="absolute left-2 bottom-0 md:bottom-0 flex gap-2">
            {steps.map((step, i) => (
              <span key={step.n} className={`h-1.5 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-orange' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
