'use client'
import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { NEWS_ARTICLES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import NewsCard from '@/components/widgets/NewsCard'

const SENTIMENTS = ['All', 'Bullish', 'Bearish', 'Neutral']
const CATEGORIES = ['All', 'Gold', 'Copper', 'Uranium', 'Iron Ore', 'Lithium', 'Macro', 'Policy']

export default function NewsPage() {
  const [search, setSearch]       = useState('')
  const [sentiment, setSentiment] = useState('All')
  const [category, setCategory]   = useState('All')

  const filtered = NEWS_ARTICLES.filter(a => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    if (sentiment !== 'All' && a.sentiment.toLowerCase() !== sentiment.toLowerCase()) return false
    if (category !== 'All' && !a.commodities.some(c => c.toLowerCase().includes(category.toLowerCase()))) return false
    return true
  })

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">News & Analysis</h1>
        <p className="text-ink-secondary text-sm mt-1">Curated commodity intelligence, macro events, and mine-level updates</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search headlines…" className="input pl-8 w-56" />
        </div>

        <div className="flex gap-1.5">
          {SENTIMENTS.map(s => (
            <button key={s} onClick={() => setSentiment(s)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150',
                sentiment === s ? 'bg-primary text-white' : 'bg-surface text-ink-secondary hover:bg-surface-hover')}>
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150',
                category === c ? 'bg-gold/20 text-ink border border-gold/30' : 'bg-surface text-ink-secondary hover:bg-surface-hover')}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-ink-secondary">
          <p className="text-lg font-semibold mb-1">No results</p>
          <p className="text-sm">Try different filters or a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Featured article */}
          {featured && (
            <div className="col-span-5">
              <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Top Story</p>
              <NewsCard article={featured} featured />
            </div>
          )}

          {/* Article grid */}
          <div className="col-span-7">
            <p className="text-xs font-bold text-ink-secondary mb-3 uppercase tracking-wider">{rest.length} More Articles</p>
            <div className="space-y-0 divide-y divide-surface-border">
              {rest.map(a => <NewsCard key={a.id} article={a} compact />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
