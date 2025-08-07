import { FlipGameInterface } from '@/types/coin-flip.type'
import { create } from 'zustand'

interface CoinFlipStore {
  isFetching: boolean
  setIsFetching: (value: boolean) => void

  page: number
  setPage: (value: number) => void

  totalItems: number
  setTotalItems: (value: number) => void

  flipGamesTable?: FlipGameInterface[]
  setFlipGamesTable: (value?: FlipGameInterface[]) => void

  gameTab: 0 | 1
  setGameTab: (value: 0 | 1) => void

  count: number
  setCount: (value: number) => void

  // NOTE: For Coin Flip fairness
  coinFlipFairness?: any[]
  setCoinFlipFairness: (value?: any[]) => void

  currentTransaction?: any
  setCurrentTransaction: (value?: any) => void
}

const useCoinFlipStore = create<CoinFlipStore>((set) => ({
  isFetching: false,
  setIsFetching: (value: boolean) => set({ isFetching: value }),

  page: 1,
  setPage: (value) => set({ page: value }),

  totalItems: 0,
  setTotalItems: (value) => set({ totalItems: value }),

  gameTab: 0,
  setGameTab: (value: 0 | 1) => set({ gameTab: value }),

  count: 0,
  setCount: (value: number) => set({ count: value }),

  flipGamesTable: undefined,
  setFlipGamesTable: (value?: FlipGameInterface[]) => set({ flipGamesTable: value }),

  coinFlipFairness: undefined,
  setCoinFlipFairness: (value) => set({ coinFlipFairness: value }),

  currentTransaction: undefined,
  setCurrentTransaction: (value?: any) => set({ currentTransaction: value }),
}))

export default useCoinFlipStore
