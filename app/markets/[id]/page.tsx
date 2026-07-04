'use client'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Bell, TrendingUp, TrendingDown, Globe2, Info } from 'lucide-react'
import { COMMODITIES, NEWS_ARTICLES } from '@/lib/mock-data'
import { cn, fmt, fmtPct } from '@/lib/utils'
import dynamic from 'next/dynamic'
import NewsCard from '@/components/widgets/NewsCard'
import SparkLine from '@/components/charts/SparkLine'

const PriceChart = dynamic(() => import('@/components/charts/PriceChart'), { ssr: false })

export default function CommodityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const commodity = COMMODITIES.find(c => c.id === id)

  if (!commodity) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-ink-secondary">
        <p className="text-lg font-semibold mb-2">Commodity not found</p>
        <Link href="/markets" className="btn-primary text-sm">Back to Markets</Link>
      </div>
    )
  }

  const up = commodity.changePct24h >= 0
  const relatedNews = NEWS_ARTICLES.filter(n => n.commodities.includes(commodity.name)).slice(0, 3)
  const rangeWidth = ((commodity.price - commodity.weekLow52) / (commodity.weekHigh52 - commodity.weekLow52)) * 100

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link href="/markets" className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink transition-colors">
          <ArrowLeft size={14} /> Markets
        </Link>
        <span className="text-ink-secondary text-sm">/</span>
        <span className="text-sm font-semibold text-ink">{commodity.name}</span>
      </div>

      {/* Hero row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
            style={{ background: `${commodity.color}15` }}>
            {commodity.emoji}
          </div>
          <div>
            <h1 className="text-3xl font-black text-ink">{commodity.name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-ink-secondary text-sm">{commodity.symbol}</span>
              <span className="w-1 h-1 rounded-full bg-ink-secondary" />
              <span className="text-ink-secondary text-sm">{commodity.unit}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-4xl font-black text-ink">${fmt(commodity.price)}</p>
            <div className={cn('flex items-center justify-end gap-1 text-sm font-bold mt-1', up ? 'text-success' : 'text-danger')}>
              {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {fmtPct(commodity.changePct24h)} today
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary"><Star size={15} /> Watch</button>
            <button className="btn-secondary"><Bell size={15} /> Alert</button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { label: '24H Change', value: `${up ? '+' : ''}${fmtPct(commodity.changePct24h)}`, color: up ? 'text-success' : 'text-danger' },
          { label: '24H High', value: `$${fmt(commodity.price * 1.008)}` },
          { label: '24H Low', value: `$${fmt(commodity.price * 0.994)}` },
          { label: 'Volume', value: commodity.volume },
          { label: '52W High', value: `$${fmt(commodity.weekHigh52)}` },
          { label: '52W Low', value: `$${fmt(commodity.weekLow52)}` },
        ].map(s => (
          <div key={s.label} className="card p-3">
            <p className="label mb-0.5">{s.label}</p>
            <p className={cn('text-base font-black text-ink', s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Info */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 card p-5">
          <h2 className="section-title mb-4">{commodity.name} Price Chart</h2>
          <PriceChart commodityId={commodity.id} color={commodity.color} />
        </div>

        <div className="col-span-4 space-y-4">
          {/* 52W Range */}
          <div className="card p-4">
            <p className="section-title mb-3">52-Week Range</p>
            <div className="space-y-2">
              <div className="h-2 bg-surface-border rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${rangeWidth}%`, background: commodity.color }} />
              </div>
              <div className="flex justify-between text-xs font-semibold text-ink-secondary">
                <span>${fmt(commodity.weekLow52)}</span>
                <span className={cn('font-bold', up ? 'text-success' : 'text-danger')}>${fmt(commodity.price)}</span>
                <span>${fmt(commodity.weekHigh52)}</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-ink-secondary" />
              <p className="section-title">About</p>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{commodity.description}</p>
          </div>

          {/* Sparkline */}
          <div className="card p-4">
            <p className="section-title mb-3">7-Day Trend</p>
            <SparkLine data={commodity.sparkline} width={260} height={60} filled />
          </div>
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div>
          <h2 className="section-title mb-3">Related News</h2>
          <div className="grid grid-cols-3 gap-4">
            {relatedNews.map(n => <NewsCard key={n.id} article={n} />)}
          </div>
        </div>
      )}
    </div>
  )
}
