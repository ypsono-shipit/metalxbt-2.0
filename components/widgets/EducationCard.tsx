'use client'
import { Clock, Zap, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EducationLesson } from '@/types'

interface Props { lesson: EducationLesson }

const LEVEL_STYLE: Record<string, string> = {
  beginner:     'bg-success/10 text-success',
  intermediate: 'bg-primary/10 text-primary',
  advanced:     'bg-danger/10 text-danger',
}

export default function EducationCard({ lesson: l }: Props) {
  return (
    <div className={cn('card-hover p-5 cursor-pointer group relative overflow-hidden', l.completed && 'border-success/30')}>
      {l.completed && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 size={18} className="text-success" />
        </div>
      )}

      <div className="text-3xl mb-3">{l.emoji}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-lg capitalize', LEVEL_STYLE[l.category])}>
          {l.category}
        </span>
      </div>

      <h3 className="font-bold text-ink text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
        {l.title}
      </h3>
      <p className="text-xs text-ink-secondary line-clamp-2 mb-3">{l.description}</p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] text-ink-secondary mb-1">
          <span>{l.progress}% complete</span>
          <span>{l.learners} learners</span>
        </div>
        <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-600 transition-all duration-500"
            style={{ width: `${l.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-ink-secondary">
          <span className="flex items-center gap-1"><Clock size={11} />{l.readTime}</span>
          <span className="flex items-center gap-1"><Zap size={11} className="text-gold" />+{l.xp} XP</span>
        </div>
        <button className={cn(
          'text-[11px] font-bold px-3 py-1 rounded-lg transition-all duration-150',
          l.completed
            ? 'bg-surface text-ink-secondary hover:bg-surface-hover'
            : 'bg-primary text-white hover:bg-primary-600'
        )}>
          {l.completed ? 'Review' : l.progress > 0 ? 'Continue' : 'Start'}
        </button>
      </div>
    </div>
  )
}
