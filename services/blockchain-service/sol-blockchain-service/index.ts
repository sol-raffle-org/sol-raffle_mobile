import {
  BlockchainServiceInterface,
  ReqGetTransactionResultInterface,
} from "..";
import { getSolanaRpcEndpoint } from "@/utils/blockchain.utils";
import { getTransactionResult } from "./get-transaction-result";
import { BlockchainTransactionStatusEnum } from "@/types/common.type";

export class SolBlockchainService implements BlockchainServiceInterface {
  getRpcEndpoint(rpcUrl?: string): string {
    return getSolanaRpcEndpoint(rpcUrl);
  }

  async getTransactionResult(
    getTransactionResultData: ReqGetTransactionResultInterface
  ): Promise<BlockchainTransactionStatusEnum> {
    const { rpcEndpoint: rpcUrl } = getTransactionResultData;
    const rpcEndpoint = this.getRpcEndpoint(rpcUrl);
    const result = await getTransactionResult({
      ...getTransactionResultData,
      rpcEndpoint,
    });

    return result;
  }
}
