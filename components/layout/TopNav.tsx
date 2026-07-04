'use client'
import { useState } from 'react'
import { Search, Bell, Sun, Moon, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TopNav() {
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <header className="h-[60px] bg-white border-b border-surface-border px-6 flex items-center gap-4 flex-shrink-0">
      {/* Search */}
      <div className={cn(
        'flex items-center gap-2.5 flex-1 max-w-[420px] px-3.5 py-2 rounded-2xl border transition-all duration-150',
        query ? 'border-primary shadow-glow bg-white' : 'border-surface-border bg-surface hover:bg-white hover:border-ink-disabled'
      )}>
        <Search size={15} className="text-ink-muted flex-shrink-0" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search commodities, companies, mines…"
          className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
        />
        <div className="flex items-center gap-1 flex-shrink-0">
          <kbd className="px-1.5 py-0.5 rounded-md bg-surface border border-surface-border text-[10px] text-ink-secondary font-mono">⌘K</kbd>
        </div>
      </div>

      <div className="flex-1" />

      {/* Market status */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-success/10 border border-success/20">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-soft" />
        <span className="text-xs font-bold text-success">Market Open</span>
      </div>

      {/* Ticker strip */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-semibold">
        <span className="text-ink-secondary">XAU</span>
        <span className="text-ink font-bold">$2,387.45</span>
        <span className="text-success">+1.25%</span>
        <span className="w-px h-4 bg-surface-border" />
        <span className="text-ink-secondary">HG</span>
        <span className="text-ink font-bold">$4.39</span>
        <span className="text-danger">-0.41%</span>
      </div>

      {/* Actions */}
      <button className="relative p-2 rounded-xl hover:bg-surface-hover transition-all duration-150">
        <Bell size={18} className="text-ink-secondary" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border border-white" />
      </button>

      <button
        onClick={() => setDark(d => !d)}
        className="p-2 rounded-xl hover:bg-surface-hover transition-all duration-150"
      >
        {dark ? <Sun size={18} className="text-gold" /> : <Moon size={18} className="text-ink-secondary" />}
      </button>

      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:scale-105 transition-transform">
        CM
      </div>
    </header>
  )
}
