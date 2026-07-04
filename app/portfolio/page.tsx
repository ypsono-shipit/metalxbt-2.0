'use client'
import { TrendingUp, TrendingDown, PieChart, ArrowRight } from 'lucide-react'
import { PORTFOLIO } from '@/lib/mock-data'
import { cn, fmt, fmtPct } from '@/lib/utils'
import StatCard from '@/components/widgets/StatCard'
import SparkLine from '@/components/charts/SparkLine'
import Link from 'next/link'

const totalValue  = PORTFOLIO.reduce((s, p) => s + p.value, 0)
const totalPnl    = PORTFOLIO.reduce((s, p) => s + p.pnl, 0)
const totalPnlPct = (totalPnl / (totalValue - totalPnl)) * 100

export default function PortfolioPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">Portfolio</h1>
        <p className="text-ink-secondary text-sm mt-1">Track your commodity positions and P&amp;L</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Value" value={`$${fmt(totalValue)}`}
          icon={<PieChart size={16} className="text-primary" />} accent="#4F7CFF" />
        <StatCard label="Today's P&L" value={`${totalPnl >= 0 ? '+' : ''}$${fmt(totalPnl)}`}
          change={fmtPct(totalPnlPct)} changePositive={totalPnl >= 0}
          icon={<TrendingUp size={16} className="text-success" />} accent="#2ECC71" />
        <StatCard label="Positions" value={PORTFOLIO.length.toString()}
          icon={<ArrowRight size={16} className="text-ink-secondary" />} />
        <StatCard label="Best Performer"
          value={[...PORTFOLIO].sort((a,b) => b.pnlPct - a.pnlPct)[0].commodity}
          change={fmtPct([...PORTFOLIO].sort((a,b) => b.pnlPct - a.pnlPct)[0].pnlPct)} changePositive
          icon={<TrendingUp size={16} className="text-success" />} accent="#2ECC71" />
      </div>

      {/* Positions table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-surface-border">
          <h2 className="section-title">Open Positions</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-surface/50">
              {['Asset', 'Avg. Entry', 'Mark Price', 'Quantity', 'Position Value', 'P&L', '7D Trend', ''].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-ink-secondary uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {PORTFOLIO.map(p => {
              const up = p.pnlPct >= 0
              return (
                <tr key={p.id} className="hover:bg-surface/40 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: `${p.color}18` }}>{p.emoji}</div>
                      <div>
                        <p className="font-semibold text-sm text-ink">{p.commodity}</p>
                        <p className="text-xs text-ink-secondary">{p.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink font-medium">${fmt(p.avgEntry)}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-ink">${fmt(p.markPrice)}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-secondary">{p.quantity} {p.unit}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-ink">${fmt(p.value)}</td>
                  <td className="px-5 py-3.5">
                    <div className={cn('text-sm font-black', up ? 'text-success' : 'text-danger')}>
                      {up ? '+' : ''}${fmt(p.pnl)}
                    </div>
                    <div className={cn('text-xs font-semibold', up ? 'text-success' : 'text-danger')}>
                      {fmtPct(p.pnlPct)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <SparkLine data={p.sparkline} width={72} height={28} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Link href={`/markets/${p.id}`}
                      className="opacity-0 group-hover:opacity-100 btn-ghost text-xs transition-opacity">
                      Trade →
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Allocation */}
      <div className="card p-5">
        <h2 className="section-title mb-4">Allocation</h2>
        <div className="space-y-3">
          {PORTFOLIO.map(p => {
            const pct = (p.value / totalValue) * 100
            return (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-base w-6 text-center flex-shrink-0">{p.emoji}</span>
                <p className="text-sm font-semibold text-ink w-28 flex-shrink-0">{p.commodity}</p>
                <div className="flex-1 h-2 bg-surface-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: p.color }} />
                </div>
                <span className="text-xs font-bold text-ink-secondary w-12 text-right flex-shrink-0">{pct.toFixed(1)}%</span>
                <span className="text-xs font-bold text-ink w-20 text-right flex-shrink-0">${fmt(p.value)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
