'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Globe2 } from 'lucide-react'
import CapybaraAssistant from '@/components/widgets/CapybaraAssistant'

const GlobeMap = dynamic(() => import('@/components/globe/GlobeMap'), { ssr: false })

export default function MinesPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">World Mines</h1>
          <p className="text-ink-secondary text-sm mt-1">
            Click any marker to explore mining operations — NYSE-listed companies mapped globally
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-secondary">
          <Globe2 size={15} />
          <span>20 companies · 6 continents</span>
        </div>
      </div>

      <Suspense fallback={
        <div className="card h-[640px] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
            <p className="text-sm text-ink-secondary font-medium">Loading globe…</p>
          </div>
        </div>
      }>
        <GlobeMap />
      </Suspense>

      <CapybaraAssistant />
    </div>
  )
}
