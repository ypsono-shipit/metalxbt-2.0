'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, MessageCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const MESSAGES = [
  { text: "Gold rallied 1.25% because yields declined after the Fed signal 💡", context: "markets" },
  { text: "Copper inventories are falling — tight supply ahead ⚡", context: "markets" },
  { text: "You're on a 3-day learning streak! Keep it up 🔥", context: "education" },
  { text: "Want to learn why Uranium moved +2.18% today? ☢️", context: "news" },
  { text: "Iron ore steady as China announces infrastructure package 🏗️", context: "markets" },
  { text: "New lesson available: The Nuclear Renaissance 🎓", context: "education" },
]

interface Props {
  position?: 'fixed' | 'inline'
  className?: string
}

export default function CapybaraAssistant({ position = 'fixed', className }: Props) {
  const [open, setOpen] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [input, setInput] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  if (!visible && position === 'fixed') return null

  if (position === 'inline') {
    return (
      <div className={cn('card p-4 flex items-start gap-3', className)}>
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image src="/mascot.png" alt="CapyMiner" fill className="object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles size={12} className="text-gold" />
            <span className="text-xs font-bold text-gold">CapyMiner says</span>
          </div>
          <p className="text-sm font-medium text-ink leading-relaxed">{MESSAGES[msgIdx].text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-[340px] bg-white rounded-3xl shadow-float border border-surface-border overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-gold/90 to-gold p-4 flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/mascot.png" alt="CapyMiner" fill className="object-contain" />
            </div>
            <div>
              <p className="font-bold text-ink text-sm">CapyMiner Assistant</p>
              <p className="text-xs text-ink/70">Your mining & metals sidekick</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto p-1.5 rounded-xl hover:bg-black/10 transition-colors">
              <X size={16} className="text-ink" />
            </button>
          </div>
          <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
            {MESSAGES.slice(0, 4).map((m, i) => (
              <div key={i} className={cn(
                'flex gap-2.5',
                i % 2 !== 0 && 'flex-row-reverse'
              )}>
                {i % 2 === 0 && (
                  <div className="w-7 h-7 relative flex-shrink-0 mt-0.5">
                    <Image src="/mascot.png" alt="CapyMiner" fill className="object-contain" />
                  </div>
                )}
                <div className={cn(
                  'max-w-[80%] px-3 py-2 rounded-2xl text-xs font-medium leading-relaxed',
                  i % 2 === 0
                    ? 'bg-surface text-ink rounded-tl-sm'
                    : 'bg-primary text-white rounded-tr-sm'
                )}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-surface-border flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask CapyMiner anything…"
              className="flex-1 px-3 py-2 rounded-xl text-xs border border-surface-border outline-none focus:border-primary transition-colors"
            />
            <button className="btn-primary text-xs px-3 py-2">Send</button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-14 h-14 rounded-full shadow-float hover:scale-105 active:scale-95 transition-all duration-150"
      >
        <Image src="/mascot.png" alt="CapyMiner" fill className="object-contain" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
          <MessageCircle size={10} className="text-white" />
        </span>
      </button>
    </div>
  )
}
