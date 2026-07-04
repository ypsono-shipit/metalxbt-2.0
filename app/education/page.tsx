'use client'
import { useState } from 'react'
import { BookOpen, Zap, Trophy, Star } from 'lucide-react'
import { LESSONS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import EducationCard from '@/components/widgets/EducationCard'

const LEVELS = ['All', 'beginner', 'intermediate', 'advanced']

export default function EducationPage() {
  const [level, setLevel] = useState('All')

  const filtered = LESSONS.filter(l => level === 'All' || l.category === level)
  const totalXp   = LESSONS.filter(l => l.completed).reduce((s, l) => s + l.xp, 0)
  const done      = LESSONS.filter(l => l.completed).length

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Education Hub</h1>
          <p className="text-ink-secondary text-sm mt-1">Master commodities investing — from the basics to advanced strategy</p>
        </div>
      </div>

      {/* Progress banner */}
      <div className="card p-5 bg-gradient-to-r from-primary/5 via-white to-gold/5">
        <div className="grid grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen size={18} className="text-primary" />
            </div>
            <div>
              <p className="label">Lessons Done</p>
              <p className="text-xl font-black text-ink">{done} / {LESSONS.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center">
              <Zap size={18} className="text-gold" />
            </div>
            <div>
              <p className="label">XP Earned</p>
              <p className="text-xl font-black text-ink">{totalXp.toLocaleString()} XP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-success/10 flex items-center justify-center">
              <Trophy size={18} className="text-success" />
            </div>
            <div>
              <p className="label">Current Streak</p>
              <p className="text-xl font-black text-ink">3 days 🔥</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-danger/10 flex items-center justify-center">
              <Star size={18} className="text-danger" />
            </div>
            <div>
              <p className="label">Rank</p>
              <p className="text-xl font-black text-ink">Silver Miner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level filter */}
      <div className="flex items-center gap-2">
        {LEVELS.map(l => (
          <button key={l} onClick={() => setLevel(l)}
            className={cn(
              'px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all duration-150',
              level === l
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-ink-secondary hover:bg-surface-hover'
            )}>
            {l === 'All' ? 'All Levels' : l}
          </button>
        ))}
        <span className="ml-auto text-xs text-ink-secondary">{filtered.length} lessons</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filtered.map(l => <EducationCard key={l.id} lesson={l} />)}
      </div>
    </div>
  )
}
