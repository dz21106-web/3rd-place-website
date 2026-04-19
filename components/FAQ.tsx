'use client'

import { useState, ReactNode } from 'react'

interface FAQItem {
  q: string
  a: string | ReactNode
}

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left gap-6 group cursor-pointer"
          >
            <span className="font-semibold text-navy text-base md:text-lg group-hover:text-orange transition-colors duration-200">
              {item.q}
            </span>
            <span className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-orange group-hover:bg-orange group-hover:border-orange group-hover:text-white transition-all duration-200">
              {open === i ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 pb-6' : 'max-h-0'}`}>
            <div className="text-slate-600 leading-relaxed">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
