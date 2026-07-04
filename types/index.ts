export interface Commodity {
  id: string
  name: string
  symbol: string
  emoji: string
  price: number
  change24h: number
  changePct24h: number
  high24h: number
  low24h: number
  volume24h: number
  volume: string
  weekHigh52: number
  weekLow52: number
  description: string
  marketCap?: number
  unit: string
  color: string
  category: 'precious' | 'base' | 'energy' | 'battery'
  sparkline: number[]
}

export interface MiningCompany {
  id: string
  name: string
  ticker: string
  exchange: 'NYSE' | 'NASDAQ' | 'ASX' | 'LSE' | 'OTC'
  country: string
  lat: number
  lon: number
  commodity: string[]
  color: string
  initials: string
  price: number
  change: number
  cap: string
  pe: string
  ev: string
  div: string
  range52w: string
  description: string
  status: 'Operating' | 'Development' | 'Care & Maintenance'
  capacity: string
  production: string
  reserves: string
  employees: string
  founded: string
  operations: string[]
  news: { headline: string; time: string }[]
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  category: 'macro' | 'metals' | 'mining' | 'energy' | 'agriculture'
  sentiment: 'bullish' | 'bearish' | 'neutral'
  source: string
  time: string
  readTime: string
  thumbnail: string
  commodities: string[]
}

export interface EducationLesson {
  id: string
  title: string
  description: string
  category: 'beginner' | 'intermediate' | 'advanced'
  readTime: string
  xp: number
  progress: number
  completed: boolean
  emoji: string
  learners: string
}

export interface PortfolioPosition {
  id: string
  commodity: string
  symbol: string
  emoji: string
  color: string
  size: number
  quantity: number
  unit: string
  entryPrice: number
  avgEntry: number
  markPrice: number
  value: number
  pnl: number
  pnlPct: number
  allocation: number
  sparkline: number[]
  type: 'long' | 'short'
}

export interface WatchlistItem {
  id: string
  commodity: string
  symbol: string
  emoji: string
  price: number
  change: number
  changePct: number
  color: string
  alerts: number
  alertPrice?: number
  sparkline: number[]
}
