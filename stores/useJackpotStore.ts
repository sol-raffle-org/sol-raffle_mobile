import {
  BetAccountInfoInterface,
  GameAccountInfoInterface,
  JackpotGameDataInterface,
  JackpotWinnerListInterface,
} from '@/types/jackpot.type'
import {
  JackpotFairnessItemInterface,
  JackpotFairnessTransactionInterface,
  JackpotTransactionItemType,
} from '@/types/service.type'
import { create } from 'zustand'

interface JackpotStore {
  isFetching: boolean
  setIsFetching: (value: boolean) => void

  isMuted: boolean
  setIsMuted: (value: boolean) => void

  page: number
  setPage: (value: number) => void

  totalItems: number
  setTotalItems: (value: number) => void

  // NOTE: For user Jackpot history
  userJackpotHistory?: JackpotTransactionItemType[]
  setUserJackpotHistory: (value?: JackpotTransactionItemType[]) => void

  // NOTE: For Jackpot fairness
  jackpotFairness?: JackpotFairnessItemInterface[]
  setJackpotFairness: (value?: JackpotFairnessItemInterface[]) => void

  currentRoundTransaction?: JackpotFairnessTransactionInterface[]
  setCurrentRoundTransaction: (value?: JackpotFairnessTransactionInterface[]) => void

  // Note: For Jackpot game
  currentAddressBetAccount?: BetAccountInfoInterface
  setCurrentAddressBetAccount: (value?: BetAccountInfoInterface) => void

  isBettingJackpot: boolean
  setIsBettingJackpot: (value: boolean) => void

  showWinGlow: boolean
  setShowWinGlow: (value: boolean) => void

  gameAccount?: GameAccountInfoInterface
  setGameAccount: (value?: GameAccountInfoInterface) => void

  winnerList?: JackpotWinnerListInterface
  setWinnerList: (value?: JackpotWinnerListInterface) => void

  jackpotGameData?: JackpotGameDataInterface
  setJackpotGameData: (value?: JackpotGameDataInterface) => void
}

const useJackpotStore = create<JackpotStore>()((set) => ({
  isFetching: false,
  setIsFetching: (value: boolean) => set({ isFetching: value }),

  isBettingJackpot: false,
  setIsBettingJackpot: (value: boolean) => set({ isBettingJackpot: value }),

  page: 1,
  setPage: (value) => set({ page: value }),

  isMuted: false,
  setIsMuted: (value) => set({ isMuted: value }),

  totalItems: 0,
  setTotalItems: (value) => set({ totalItems: value }),

  // NOTE: For user Jackpot history
  userJackpotHistory: undefined,
  setUserJackpotHistory: (value) => set({ userJackpotHistory: value }),

  // NOTE: For Jackpot fairness
  jackpotFairness: undefined,
  setJackpotFairness: (value) => set({ jackpotFairness: value }),

  currentRoundTransaction: undefined,
  setCurrentRoundTransaction: (value) => set({ currentRoundTransaction: value }),

  // Note: For Jackpot game

  currentAddressBetAccount: undefined,
  setCurrentAddressBetAccount: (value?: BetAccountInfoInterface) => set({ currentAddressBetAccount: value }),

  showWinGlow: false,
  setShowWinGlow: (value: boolean) => set({ showWinGlow: value }),

  gameAccount: undefined,
  setGameAccount: (value?: GameAccountInfoInterface) => set({ gameAccount: value }),

  winnerList: undefined,
  setWinnerList: (value?: JackpotWinnerListInterface) => set({ winnerList: value }),

  jackpotGameData: undefined,
  setJackpotGameData: (value?: JackpotGameDataInterface) => set({ jackpotGameData: value }),
}))

export default useJackpotStore
