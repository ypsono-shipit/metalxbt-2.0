import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmt(n: number, decimals = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function fmtCompact(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

export function fmtPct(n: number) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`
}

export function genSparkline(length = 20, up = true): number[] {
  const pts: number[] = []
  let v = 100 + Math.random() * 20
  for (let i = 0; i < length; i++) {
    v += (Math.random() - (up ? 0.45 : 0.55)) * 5
    v = Math.max(70, Math.min(160, v))
    pts.push(v)
  }
  return pts
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
