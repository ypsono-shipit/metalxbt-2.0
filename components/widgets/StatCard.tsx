'use client'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  value: string
  change?: string
  changePositive?: boolean
  icon?: ReactNode
  accent?: string
  className?: string
}

export default function StatCard({ label, value, change, changePositive, icon, accent, className }: Props) {
  return (
    <div className={cn('stat-card group', className)}>
      <div className="flex items-center justify-between">
        <p className="label">{label}</p>
        {icon && (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accent ? `${accent}18` : undefined }}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-black text-ink mt-1">{value}</p>
      {change && (
        <div className={cn('flex items-center gap-1 text-sm font-semibold', changePositive ? 'text-success' : 'text-danger')}>
          {changePositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </div>
      )}
    </div>
  )
}
