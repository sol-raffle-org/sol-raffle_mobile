import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export interface JackpotRoundInfoInterface {
  blockNumber: BN
  createdAt: BN
  id: BN
  nextBetNumber: BN
  serverSeed: number[]
  startedAt: BN
  status: any
  totalAmount: BN
  totalBets: BN
  winner: PublicKey | null
  winningNumber: BN
}

export interface BetAccountInfoInterface {
  player: PublicKey
  totalBets: BN
  totalAmount: BN
  totalWins: BN
  totalWinsAmount: BN
  bets: any[]
}

export interface GameAccountInfoInterface {
  authority: PublicKey
  feeAccount: PublicKey
  currentRoundId: BN
  totalRounds: BN
  isMaintenance: boolean
}

export type BetItemInfoType = {
  wagered: number
  totalUserWagered: number
  totalPot: number
  ticketStart: number
  ticketEnd: number
}

export type BetUserInfoType = {
  id: string
  wallet: string
  name: string
  avatar: string
  level: number
}

export interface PlayerBetInterface {
  betInfo: BetItemInfoType
  userInfo: BetUserInfoType
}

export enum JackpotGameStatus {
  NotStart = 'not_started',
  Pending = 'pending',
  Playing = 'playing',
  Mining = 'mining',
  Awarding = 'awarding',
  Maintenance = 'maintenance',
}

export interface JackpotGameDataInterface {
  status: JackpotGameStatus
  endTime: number
  gameId: number
  serverSeed: string
  blockNumber?: string | null
  winner?: null | {
    ticket: number
  }
  bets: PlayerBetInterface[]
}

export enum WinTypeEnum {
  RecentWin = 'recent_win',
  LuckyWin = 'lucky_win',
  BigWin = 'big_win',
}
export interface JackpotWinnerItemInterface {
  type: WinTypeEnum
  userId: string
  name: string
  gameType: 'jackpot'
  gameValue: number
  round: number
  message: string
  createdAt: number
  avatar?: string
  level?: number
}

export interface JackpotWinnerListInterface {
  data: JackpotWinnerItemInterface[]
}

export interface GameStatusUpdateInterface {
  status: JackpotGameStatus
  endTime: number
  gameId: number
  serverSeed: string
  blockNumber?: number | null
  winner?: null | {
    ticket: number
  }
  bets?: PlayerBetInterface[]
}
