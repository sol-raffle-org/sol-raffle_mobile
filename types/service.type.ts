import { AccountInterface } from "./app.type";

export interface BaseResponseData<T> {
  statusCode: number;
  message?: string;
  error?: string;
  data: T;
}

export interface ApiResponseInterface {
  status: number;
  data: object;
}

// Authentication
export type GetNonceServiceType = {
  nonce: string;
  message: string;
  walletAddress: string;
};

export type PostVerifyServiceType = {
  user: AccountInterface;
  accessToken: string;
};

// Systems
export type SystemStatsServiceType = {
  totalBet: number;
  totalWagered: string;
  totalPlayer: number;
};

export type SystemTopPlayerType = {
  id: string;
  avatar: string;
  name: string;
  wallet: string;
  value: number;
};

export type JackpotTransactionItemType = {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  gameId: number;
  gameType: "jackpot";
  ticketStart: number;
  ticketEnd: number;
  selectedSide: number;
  tx: string;
  wagered: number;
  rewarded: number;
  isWin: boolean;
};

export interface GetUserJackpotHistoryInterface {
  pageData: JackpotTransactionItemType[];
  pageNum: number;
  total: number;
}

export type LevelItemType = {
  deepLevel: number;
  totalRef: number;
  totalWagered: number;
  totalEarned: number;
};

export type ClaimLogItemType = {
  createdAt: string;
  id: string;
  status: ClaimStatusEnum;
  claimAmount: number;
  tx: string;
};

export enum ClaimStatusEnum {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface GetAffiliateInfoInterface {
  data?: {
    totalRef: number;
    totalWagered: number;
    totalEarn: number;
    totalClaimable: number;

    levels?: LevelItemType[];
    claimLogs?: ClaimLogItemType[];
  };
}

export interface JackpotFairnessInterface {
  pageData: JackpotFairnessItemInterface[];
  pageNum: number;
  total: number;
}

export interface JackpotFairnessItemInterface {
  createdAt: string;
  updatedAt: string;
  id: string;
  gameId: number;
  gameType: "jackpot";
  gameValue: string;
  serverSeed: string;
  openAt: string;
  closeAt: string;
  blockNumber: number;
  blockSeed: string;
  ticket: number;
  winnerUserId: string;
  winnerTx?: string;
  winnerAvatar: string;
  winnerName: string;
  winnerTotalWagered: string;
  winnerValue: string;
  isOpening: boolean;
}

export interface JackpotFairnessTransactionInterface {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  avatar: string;
  userId: string;
  gameId: number;
  gameType: "jackpot";
  ticketStart: number;
  ticketEnd: number;
  selectedSide: number;
  tx: string;
  wagered: number;
  rewarded: number;
  isWin: boolean;
}

export interface ClaimReferralRewardInterface {
  data?: {
    id: string;
    status: string;
    claimAmount: number;
    tx?: string | null;
    createdAt: string;
  };
  errorCode?: number;
  message?: string;
  statusCode?: number;
}
