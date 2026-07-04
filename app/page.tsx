'use client'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, TrendingDown, ArrowRight, Zap, Globe2, BookOpen, Bell } from 'lucide-react'
import { COMMODITIES, NEWS_ARTICLES, LESSONS, PORTFOLIO, WATCHLIST_ITEMS } from '@/lib/mock-data'
import { cn, fmt, fmtPct } from '@/lib/utils'
import CommodityCard from '@/components/widgets/CommodityCard'
import NewsCard from '@/components/widgets/NewsCard'
import EducationCard from '@/components/widgets/EducationCard'
import StatCard from '@/components/widgets/StatCard'
import SparkLine from '@/components/charts/SparkLine'
import CapybaraAssistant from '@/components/widgets/CapybaraAssistant'

const totalPnl = PORTFOLIO.reduce((s, p) => s + p.pnl, 0)
const totalValue = 24532.18

export default function Dashboard() {
  const gainers = [...COMMODITIES].sort((a,b) => b.changePct24h - a.changePct24h).slice(0,3)
  const losers  = [...COMMODITIES].sort((a,b) => a.changePct24h - b.changePct24h).slice(0,3)

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* ── Hero ── */}
      <div className="card overflow-hidden relative bg-gradient-to-br from-white via-white to-primary/5">
        <div className="p-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink-secondary mb-2">Good morning, Miner! 👋</p>
            <h1 className="text-4xl font-black text-ink tracking-tight leading-tight">
              Trade Metals.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">Build Wealth.</span>
            </h1>
            <p className="text-ink-secondary mt-3 mb-6 max-w-sm">
              Your professional commodities terminal — mines, markets, and education in one place.
            </p>
            <div className="flex gap-3">
              <Link href="/markets" className="btn-primary">
                Explore Markets <ArrowRight size={15} />
              </Link>
              <Link href="/mines" className="btn-secondary">
                <Globe2 size={15} /> World Mines
              </Link>
            </div>
          </div>
          <div className="relative w-52 h-52 flex-shrink-0 hidden xl:block">
            <Image src="/mascot.png" alt="CapyMiner" fill className="object-contain drop-shadow-2xl" priority />
            <div className="absolute -top-2 -right-2 bg-gold rounded-2xl px-3 py-1.5 shadow-float">
              <p className="text-xs font-black text-ink">XAU +1.25% ✨</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Portfolio Overview + Watchlist ── */}
      <div className="grid grid-cols-12 gap-4">
        {/* Portfolio summary */}
        <div className="col-span-4 card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-title">Portfolio</p>
            <Link href="/portfolio" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mb-4">
            <p className="label mb-1">Total Value</p>
            <p className="text-3xl font-black text-ink">${fmt(totalValue)}</p>
            <div className={cn('flex items-center gap-1 text-sm font-semibold mt-1', totalPnl >= 0 ? 'text-success' : 'text-danger')}>
              {totalPnl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {totalPnl >= 0 ? '+' : ''}${fmt(Math.abs(totalPnl))} today
            </div>
          </div>
          {/* Mini positions */}
          <div className="space-y-2.5">
            {PORTFOLIO.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${p.color}18` }}>{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink">{p.commodity}</p>
                  <p className="text-xs text-ink-secondary">${fmt(p.markPrice)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">${fmt(p.pnl > 0 ? p.pnl : Math.abs(p.pnl))}</p>
                  <span className={cn('text-xs font-bold', p.pnlPct >= 0 ? 'text-success' : 'text-danger')}>
                    {fmtPct(p.pnlPct)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist */}
        <div className="col-span-4 card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-title">Watchlist</p>
            <Link href="/watchlist" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-1">
            {WATCHLIST_ITEMS.map(w => {
              const up = w.changePct >= 0
              return (
                <div key={w.id} className="flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-surface cursor-pointer transition-colors group">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: `${w.color}18` }}>{w.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink">{w.commodity}</p>
                    <p className="text-xs text-ink-secondary">{w.symbol}</p>
                  </div>
                  <SparkLine data={w.sparkline} width={48} height={20} />
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-ink">${fmt(w.price)}</p>
                    <span className={cn('text-xs font-bold', up ? 'text-success' : 'text-danger')}>{fmtPct(w.changePct)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-4 space-y-4">
          <StatCard label="24H P&L" value={`+$${fmt(totalPnl)}`} change="+5.36% today" changePositive icon={<TrendingUp size={16} className="text-success" />} accent="#2ECC71" />
          <div className="card p-5">
            <p className="section-title mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Set Alert',   icon: Bell,    href: '/watchlist', color: 'text-danger' },
                { label: 'View Mines',  icon: Globe2,  href: '/mines',     color: 'text-primary' },
                { label: 'Learn',       icon: BookOpen,href: '/education',  color: 'text-success' },
                { label: 'Markets',     icon: TrendingUp, href: '/markets', color: 'text-gold' },
              ].map(({ label, icon: Icon, href, color }) => (
                <Link key={href} href={href}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface hover:bg-surface-hover transition-colors cursor-pointer">
                  <Icon size={20} className={color} />
                  <span className="text-xs font-semibold text-ink">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Trending Commodities ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">Trending Commodities</h2>
          <Link href="/markets" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
            All markets <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {COMMODITIES.slice(0, 4).map(c => <CommodityCard key={c.id} commodity={c} />)}
        </div>
      </div>

      {/* ── Gainers / Losers / News ── */}
      <div className="grid grid-cols-12 gap-4">
        {/* Gainers */}
        <div className="col-span-3 card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-success" />
            <p className="section-title">Top Gainers</p>
          </div>
          <div className="space-y-2">
            {gainers.map(c => (
              <Link key={c.id} href={`/markets/${c.id}`}>
                <div className="flex items-center gap-2.5 py-2 px-2 rounded-xl hover:bg-surface transition-colors cursor-pointer">
                  <span className="text-xl">{c.emoji}</span>
                  <div className="flex-1"><p className="text-sm font-semibold">{c.name}</p><p className="text-xs text-ink-secondary">${fmt(c.price)}</p></div>
                  <span className="text-sm font-bold text-success">{fmtPct(c.changePct24h)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div className="col-span-3 card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={16} className="text-danger" />
            <p className="section-title">Top Losers</p>
          </div>
          <div className="space-y-2">
            {losers.map(c => (
              <Link key={c.id} href={`/markets/${c.id}`}>
                <div className="flex items-center gap-2.5 py-2 px-2 rounded-xl hover:bg-surface transition-colors cursor-pointer">
                  <span className="text-xl">{c.emoji}</span>
                  <div className="flex-1"><p className="text-sm font-semibold">{c.name}</p><p className="text-xs text-ink-secondary">${fmt(c.price)}</p></div>
                  <span className="text-sm font-bold text-danger">{fmtPct(c.changePct24h)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* News */}
        <div className="col-span-6 card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="section-title">Latest News</p>
            <Link href="/news" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-surface-border">
            {NEWS_ARTICLES.slice(0, 4).map(a => <NewsCard key={a.id} article={a} compact />)}
          </div>
        </div>
      </div>

      {/* ── Education ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="section-title">Continue Learning</h2>
            <p className="text-xs text-ink-secondary mt-0.5">You're on a 3-day streak 🔥 — keep going!</p>
          </div>
          <Link href="/education" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
            All lessons <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {LESSONS.slice(0, 4).map(l => <EducationCard key={l.id} lesson={l} />)}
        </div>
      </div>

      {/* Capybara Assistant */}
      <CapybaraAssistant />
    </div>
  )
}
