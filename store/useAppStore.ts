import { create } from 'zustand'
import { COMMODITIES, COMPANIES, NEWS_ARTICLES, WATCHLIST_ITEMS, PORTFOLIO } from '@/lib/mock-data'
import type { Commodity, MiningCompany, NewsArticle, WatchlistItem, PortfolioPosition } from '@/types'

interface AppState {
  commodities: Commodity[]
  companies: MiningCompany[]
  news: NewsArticle[]
  watchlist: WatchlistItem[]
  portfolio: PortfolioPosition[]
  selectedCommodity: Commodity | null
  selectedCompany: MiningCompany | null
  setSelectedCommodity: (c: Commodity | null) => void
  setSelectedCompany: (c: MiningCompany | null) => void
  addToWatchlist: (item: WatchlistItem) => void
  removeFromWatchlist: (id: string) => void
}

const useAppStore = create<AppState>((set) => ({
  commodities: COMMODITIES,
  companies: COMPANIES,
  news: NEWS_ARTICLES,
  watchlist: WATCHLIST_ITEMS,
  portfolio: PORTFOLIO,
  selectedCommodity: null,
  selectedCompany: null,
  setSelectedCommodity: (c) => set({ selectedCommodity: c }),
  setSelectedCompany: (c) => set({ selectedCompany: c }),
  addToWatchlist: (item) => set(s => ({ watchlist: [...s.watchlist, item] })),
  removeFromWatchlist: (id) => set(s => ({ watchlist: s.watchlist.filter(w => w.id !== id) })),
}))

export default useAppStore
