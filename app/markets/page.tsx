'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, TrendingDown, ArrowUpDown, BarChart2 } from 'lucide-react'
import { COMMODITIES } from '@/lib/mock-data'
import { cn, fmt, fmtPct } from '@/lib/utils'
import CommodityCard from '@/components/widgets/CommodityCard'
import SparkLine from '@/components/charts/SparkLine'

const CATEGORIES = ['All', 'Precious Metals', 'Base Metals', 'Energy', 'Battery Metals']

export default function MarketsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [sortKey, setSortKey] = useState<'name' | 'price' | 'change'>('change')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = COMMODITIES
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mult = sortDir === 'desc' ? -1 : 1
      if (sortKey === 'name') return mult * a.name.localeCompare(b.name)
      if (sortKey === 'price') return mult * (a.price - b.price)
      return mult * (a.changePct24h - b.changePct24h)
    })

  function toggleSort(k: typeof sortKey) {
    if (sortKey === k) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(k); setSortDir('desc') }
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Markets</h1>
          <p className="text-ink-secondary text-sm mt-1">Live commodity prices across metals, energy, and resources</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-secondary">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Market Open · Last updated just now
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search commodities…"
            className="input pl-8 w-52"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150',
                category === c ? 'bg-primary text-white shadow-sm' : 'bg-surface text-ink-secondary hover:bg-surface-hover')}>
              {c}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden border border-surface-border">
            <button onClick={() => setView('grid')} className={cn('px-3 py-1.5 text-xs font-semibold transition-colors', view === 'grid' ? 'bg-primary text-white' : 'bg-white text-ink-secondary hover:bg-surface')}>
              Grid
            </button>
            <button onClick={() => setView('table')} className={cn('px-3 py-1.5 text-xs font-semibold transition-colors', view === 'table' ? 'bg-primary text-white' : 'bg-white text-ink-secondary hover:bg-surface')}>
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Summary stat row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Advancing', value: COMMODITIES.filter(c => c.changePct24h >= 0).length, of: COMMODITIES.length, color: 'text-success' },
          { label: 'Declining', value: COMMODITIES.filter(c => c.changePct24h < 0).length, of: COMMODITIES.length, color: 'text-danger' },
          { label: 'Best Performer', value: [...COMMODITIES].sort((a,b) => b.changePct24h - a.changePct24h)[0].name, extra: fmtPct([...COMMODITIES].sort((a,b) => b.changePct24h - a.changePct24h)[0].changePct24h), color: 'text-success' },
          { label: 'Worst Performer', value: [...COMMODITIES].sort((a,b) => a.changePct24h - b.changePct24h)[0].name, extra: fmtPct([...COMMODITIES].sort((a,b) => a.changePct24h - b.changePct24h)[0].changePct24h), color: 'text-danger' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="label mb-1">{s.label}</p>
            <p className={cn('text-2xl font-black', s.color)}>{s.value}
              {s.of && <span className="text-sm text-ink-secondary font-medium"> / {s.of}</span>}
            </p>
            {s.extra && <p className={cn('text-xs font-bold mt-0.5', s.color)}>{s.extra}</p>}
          </div>
        ))}
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map(c => <CommodityCard key={c.id} commodity={c} />)}
        </div>
      )}

      {/* Table view */}
      {view === 'table' && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border bg-surface/50">
                {([
                  { key: 'name', label: 'Commodity' },
                  { key: 'price', label: 'Price' },
                  { key: 'change', label: '24H Change' },
                  { key: null, label: '7D Trend' },
                  { key: null, label: 'Volume' },
                  { key: null, label: '52W Range' },
                  { key: null, label: '' },
                ] as { key: string | null; label: string }[]).map(col => (
                  <th key={col.label}
                    className={cn('px-4 py-3 text-left text-[11px] font-bold text-ink-secondary uppercase tracking-wide',
                      col.key && 'cursor-pointer hover:text-ink select-none')}
                    onClick={() => col.key && toggleSort(col.key as typeof sortKey)}>
                    <span className="flex items-center gap-1">
                      {col.label}
                      {col.key && <ArrowUpDown size={11} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filtered.map(c => {
                const up = c.changePct24h >= 0
                const rangeWidth = ((c.price - c.weekLow52) / (c.weekHigh52 - c.weekLow52)) * 100
                return (
                  <tr key={c.id} className="hover:bg-surface/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{c.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm text-ink">{c.name}</p>
                          <p className="text-xs text-ink-secondary">{c.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-sm text-ink">${fmt(c.price)}</td>
                    <td className="px-4 py-3">
                      <div className={cn('flex items-center gap-1 text-sm font-bold', up ? 'text-success' : 'text-danger')}>
                        {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {fmtPct(c.changePct24h)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <SparkLine data={c.sparkline} width={72} height={28} />
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-secondary">{c.volume}</td>
                    <td className="px-4 py-3 w-36">
                      <div className="text-[10px] text-ink-secondary flex justify-between mb-1">
                        <span>${fmt(c.weekLow52)}</span><span>${fmt(c.weekHigh52)}</span>
                      </div>
                      <div className="h-1 bg-surface-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${clamp(rangeWidth, 0, 100)}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/markets/${c.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-primary flex items-center gap-1">
                        <BarChart2 size={13} /> View
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)) }
