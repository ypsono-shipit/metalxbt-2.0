'use client'
import { Bookmark, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NewsArticle } from '@/types'

interface Props {
  article: NewsArticle
  compact?: boolean
  featured?: boolean
}

const CATEGORY_COLORS: Record<string, string> = {
  macro:       'bg-purple-100 text-purple-700',
  metals:      'bg-amber-100 text-amber-700',
  mining:      'bg-stone-100 text-stone-700',
  energy:      'bg-blue-100 text-blue-700',
  agriculture: 'bg-green-100 text-green-700',
}

export default function NewsCard({ article: a, compact = false }: Props) {
  const SentimentIcon = a.sentiment === 'bullish' ? TrendingUp : a.sentiment === 'bearish' ? TrendingDown : Minus
  const sentimentColor = a.sentiment === 'bullish' ? 'text-success' : a.sentiment === 'bearish' ? 'text-danger' : 'text-ink-secondary'

  if (compact) {
    return (
      <div className="flex items-start gap-3 py-3 border-b border-surface-border last:border-0 cursor-pointer hover:bg-surface-hover -mx-2 px-2 rounded-xl transition-colors">
        <span className="text-2xl mt-0.5 flex-shrink-0">{a.thumbnail}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink leading-snug line-clamp-2">{a.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-ink-secondary">{a.time}</span>
            <span className={cn('text-xs font-bold px-1.5 py-0.5 rounded-md capitalize', CATEGORY_COLORS[a.category])}>
              {a.category}
            </span>
            <SentimentIcon size={11} className={sentimentColor} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-hover p-5 cursor-pointer group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-3xl">{a.thumbnail}</span>
        <div className="flex items-center gap-2">
          <span className={cn('text-xs font-bold px-2 py-0.5 rounded-lg capitalize', CATEGORY_COLORS[a.category])}>
            {a.category}
          </span>
          <button className="p-1 rounded-lg hover:bg-surface transition-colors">
            <Bookmark size={14} className="text-ink-secondary" />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-ink leading-snug mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
      <p className="text-sm text-ink-secondary line-clamp-2 mb-3">{a.summary}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-ink-secondary">
          <span className="font-semibold">{a.source}</span>
          <span>·</span>
          <span>{a.time}</span>
          <span>·</span>
          <span>{a.readTime} read</span>
        </div>
        <div className={cn('flex items-center gap-1 text-xs font-bold', sentimentColor)}>
          <SentimentIcon size={12} />
          <span className="capitalize">{a.sentiment}</span>
        </div>
      </div>
    </div>
  )
}
