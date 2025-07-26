import { web3 } from "@coral-xyz/anchor";
import { SolBlockchainService } from "./sol-blockchain-service";

import {
  SupportedChainEnum,
  BlockchainTransactionStatusEnum,
} from "@/types/common.type";

export interface BlockchainServiceInterface {
  getRpcEndpoint(): string;
  getTransactionResult(
    getTransactionResultData: ReqGetTransactionResultInterface
  ): Promise<BlockchainTransactionStatusEnum>;
}

export const getBlockchainServiceByChain = (chain: SupportedChainEnum) => {
  switch (chain) {
    case SupportedChainEnum.Solana:
      return new SolBlockchainService();
    default:
      return null;
  }
};

export interface ReqGetTransactionResultInterface {
  txHash: string;
  rpcEndpoint?: string | web3.Cluster;
}
