'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard, TrendingUp, Globe2, BookOpen,
  Newspaper, BarChart2, Star, Settings, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/',           icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/markets',    icon: TrendingUp,      label: 'Markets' },
  { href: '/mines',      icon: Globe2,          label: 'Mines Map' },
  { href: '/education',  icon: BookOpen,        label: 'Education' },
  { href: '/news',       icon: Newspaper,       label: 'News' },
  { href: '/portfolio',  icon: BarChart2,       label: 'Portfolio' },
  { href: '/watchlist',  icon: Star,            label: 'Watchlist' },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-[240px] flex-shrink-0 h-screen bg-white border-r border-surface-border flex flex-col">
      {/* Logo */}
      <div className="px-5 h-[60px] flex items-center border-b border-surface-border gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-gold-500 flex items-center justify-center">
          <span className="text-white font-black text-xs">Mx</span>
        </div>
        <span className="text-[17px] font-black text-ink tracking-tight">
          metal<span className="text-gold">xbt</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 group',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-ink-secondary hover:bg-surface-hover hover:text-ink'
              )}
            >
              <Icon size={18} className={cn(active ? 'text-primary' : 'text-ink-secondary group-hover:text-ink')} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-primary/50" />}
            </Link>
          )
        })}
      </nav>

      {/* Mascot hint */}
      <div className="mx-3 mb-3 p-3 rounded-2xl bg-gradient-to-br from-gold/10 to-primary/5 border border-gold/20">
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src="/mascot.png" alt="CapyMiner" fill className="object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-ink leading-tight">Gold is up 1.25%</p>
            <p className="text-[11px] text-ink-secondary mt-0.5">Fed signals dovish pivot ✨</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-3 pb-4 border-t border-surface-border pt-3">
        <Link href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-ink-secondary hover:bg-surface-hover hover:text-ink transition-all duration-150">
          <Settings size={18} />
          Settings
        </Link>
        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-2xl hover:bg-surface-hover cursor-pointer transition-all duration-150">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            CM
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">CapyMiner</p>
            <p className="text-[11px] text-ink-secondary truncate">miner@metalxbt.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
