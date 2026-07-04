'use client'
import { useState } from 'react'
import { Bell, Plus, Trash2, TrendingUp, TrendingDown, Search } from 'lucide-react'
import { WATCHLIST_ITEMS } from '@/lib/mock-data'
import { cn, fmt, fmtPct } from '@/lib/utils'
import SparkLine from '@/components/charts/SparkLine'
import type { WatchlistItem } from '@/types'

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>(WATCHLIST_ITEMS)
  const [search, setSearch]   = useState('')
  const [alertModal, setAlertModal] = useState<WatchlistItem | null>(null)

  const filtered = items.filter(i =>
    i.commodity.toLowerCase().includes(search.toLowerCase()) ||
    i.symbol.toLowerCase().includes(search.toLowerCase())
  )

  function remove(id: string) { setItems(prev => prev.filter(i => i.id !== id)) }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Watchlist</h1>
          <p className="text-ink-secondary text-sm mt-1">Monitor your favourite commodities and set price alerts</p>
        </div>
        <button className="btn-primary"><Plus size={15} /> Add Asset</button>
      </div>

      {/* Search */}
      <div className="relative w-56">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search watchlist…" className="input pl-8 w-full" />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-border bg-surface/50">
              {['Asset', 'Price', '24H Change', '7D Trend', 'Alert', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-ink-secondary uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {filtered.map(w => {
              const up = w.changePct >= 0
              return (
                <tr key={w.id} className="hover:bg-surface/40 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                        style={{ background: `${w.color}18` }}>{w.emoji}</div>
                      <div>
                        <p className="font-semibold text-sm text-ink">{w.commodity}</p>
                        <p className="text-xs text-ink-secondary">{w.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-ink">${fmt(w.price)}</td>
                  <td className="px-5 py-3.5">
                    <div className={cn('flex items-center gap-1 text-sm font-bold', up ? 'text-success' : 'text-danger')}>
                      {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {fmtPct(w.changePct)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <SparkLine data={w.sparkline} width={72} height={28} />
                  </td>
                  <td className="px-5 py-3.5">
                    {w.alertPrice ? (
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-lg">
                        Alert @ ${fmt(w.alertPrice)}
                      </span>
                    ) : (
                      <span className="text-xs text-ink-secondary">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setAlertModal(w)}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <Bell size={13} />
                      </button>
                      <button onClick={() => remove(w.id)}
                        className="p-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-ink-secondary">
            <Bell size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No items in your watchlist</p>
            <p className="text-sm mt-1">Add commodities to track them here</p>
          </div>
        )}
      </div>

      {/* Alert modal */}
      {alertModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={() => setAlertModal(null)}>
          <div className="bg-white rounded-3xl shadow-float p-6 w-80" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-ink text-lg mb-1">Set Price Alert</h3>
            <p className="text-sm text-ink-secondary mb-4">{alertModal.emoji} {alertModal.commodity}</p>
            <label className="label mb-1.5 block">Alert when price reaches</label>
            <input type="number" className="input w-full mb-4" defaultValue={alertModal.price} />
            <div className="flex gap-2">
              <button onClick={() => setAlertModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => setAlertModal(null)} className="btn-primary flex-1">Set Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
