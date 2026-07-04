'use client'
import Link from 'next/link'
import { cn, fmt, fmtPct } from '@/lib/utils'
import SparkLine from '@/components/charts/SparkLine'
import type { Commodity } from '@/types'

interface Props {
  commodity: Commodity
  compact?: boolean
}

export default function CommodityCard({ commodity: c, compact = false }: Props) {
  const up = c.changePct24h >= 0

  if (compact) {
    return (
      <Link href={`/markets/${c.id}`}>
        <div className="card-hover p-4 cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: `${c.color}18` }}>
                {c.emoji}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{c.name}</p>
                <p className="text-xs text-ink-secondary">{c.symbol}</p>
              </div>
            </div>
            <span className={cn('text-xs font-bold px-2 py-0.5 rounded-lg', up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
              {fmtPct(c.changePct24h)}
            </span>
          </div>
          <p className="text-lg font-black text-ink">${fmt(c.price)}<span className="text-xs font-medium text-ink-secondary ml-1">{c.unit}</span></p>
          <div className="mt-2">
            <SparkLine data={c.sparkline} width={120} height={28} />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/markets/${c.id}`}>
      <div className="card-hover p-5 cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: `${c.color}18` }}>
              {c.emoji}
            </div>
            <div>
              <p className="font-bold text-ink">{c.name}</p>
              <p className="text-xs text-ink-secondary">{c.symbol}{c.unit}</p>
            </div>
          </div>
          <span className={cn('text-sm font-bold px-2.5 py-1 rounded-xl', up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
            {fmtPct(c.changePct24h)}
          </span>
        </div>

        <p className="text-2xl font-black text-ink mb-1">${fmt(c.price)}</p>
        <p className={cn('text-sm font-semibold mb-3', up ? 'text-success' : 'text-danger')}>
          {up ? '▲' : '▼'} ${Math.abs(c.change24h).toFixed(2)} today
        </p>

        <SparkLine data={c.sparkline} width={180} height={40} />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-border">
          <div>
            <p className="text-[10px] text-ink-secondary uppercase tracking-wider font-semibold">Volume</p>
            <p className="text-xs font-bold text-ink">{c.volume24h.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-ink-secondary uppercase tracking-wider font-semibold">24H High</p>
            <p className="text-xs font-bold text-ink">${fmt(c.high24h)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
