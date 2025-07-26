export enum CoinSideEnum {
  Heads = 0,
  Tails = 1,
}

export enum FlipGameStatusEnum {
  Created = "created",
  WaitingReady = "waiting_ready",
  Playing = "playing",
  Mining = "mining",
  Awarding = "awarding",
  Finished = "finished",
}
export interface FlipGameInterface {
  status: FlipGameStatusEnum;
  endTime: number;
  deleteTime?: number;
  gameId: number;
  seed: string;
  blockNumber: string | null;
  blockSeed: string | null;
  creatorChoice: 0;
  result: CoinSideEnum | null;
  gameValue: number;
  txHash: string;
  userCreator: FlipPlayerInterface;
  userJoin: FlipPlayerInterface | null;
}

export interface FlipGamePreStartResponseInterface {
  status: FlipGameStatusEnum;
  endTime: number;
  gameId: number;
  creator: string;
  userJoin: FlipPlayerInterface;
}

export interface FlipGameStartResponseInterface {
  status: FlipGameStatusEnum;
  endTime: number;
  gameId: number;
  creator: string;
  seed: string;
  blockNumber: number;
}

export interface FlipPlayerInterface {
  id: string;
  wallet: string;
  name: string;
  avatar: string;
  level: number;
}
