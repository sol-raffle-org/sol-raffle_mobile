import { useState } from "react";
import { web3 } from "@coral-xyz/anchor";
import { getSVMRpcEndpoint } from "@/utils/blockchain.utils";
import { USER_REJECTED_MESSAGE } from "@/constants/app.const";
import { getBlockchainServiceByChain } from "@/services/blockchain-service";

import {
  SupportedChainEnum,
  BlockchainTransactionStatusEnum,
} from "@/types/common.type";

import useSolanaTransaction from "./useSolanaTransaction";

const useTransaction = () => {
  const { handleSendSolanaTransaction } = useSolanaTransaction();

  const [transactionHash, setTransactionHash] = useState("");
  const [transactionError, setTransactionError] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<
    BlockchainTransactionStatusEnum | undefined
  >(undefined);

  const handleSendTransaction = async (
    selectedChain: SupportedChainEnum,
    data: web3.Transaction | web3.Transaction[] | any // NOTE: Update additional type when implement new chain
  ) => {
    try {
      let resTransaction = { txHash: "", messageError: "" };
      if (selectedChain === SupportedChainEnum.Solana) {
        resTransaction = await handleSendSolanaTransaction(data);
      }

      if (resTransaction.messageError) {
        setTransactionError(resTransaction.messageError);
        if (
          !resTransaction.messageError
            .toLowerCase()
            .includes(USER_REJECTED_MESSAGE.toLowerCase())
        ) {
          setTransactionStatus(BlockchainTransactionStatusEnum.FAILED);
        } else {
          setTransactionStatus(undefined);
        }
      }

      setTransactionHash(resTransaction.txHash);

      return resTransaction.txHash;
    } catch (error: any) {
      console.log("err", error);
      setTransactionHash("");
      setTransactionError(error.message);
      setTransactionStatus(BlockchainTransactionStatusEnum.FAILED);
    }
  };

  const handleGetTransactionResult = async (
    chain: SupportedChainEnum,
    txHash: string
  ) => {
    try {
      let txStatus = BlockchainTransactionStatusEnum.LOADING;

      const rpcEndpoint = getSVMRpcEndpoint(chain);

      txStatus = (await getBlockchainServiceByChain(
        chain
      )?.getTransactionResult({
        txHash,
        rpcEndpoint,
      })) as BlockchainTransactionStatusEnum;

      setTransactionStatus(txStatus);
      return txStatus as BlockchainTransactionStatusEnum;
    } catch (error) {
      console.log(error);
      setTransactionStatus(BlockchainTransactionStatusEnum.FAILED);
      setTransactionError(error ? error.toString() : "Something went wrong");
      return BlockchainTransactionStatusEnum.FAILED;
    }
  };

  const handleReset = () => {
    setTransactionHash("");
    setTransactionError("");
    setTransactionStatus(undefined);
  };

  return {
    transactionHash,
    transactionError,
    transactionStatus,

    handleReset,
    setTransactionError,
    setTransactionStatus,
    handleSendTransaction,
    handleGetTransactionResult,
  };
};

export default useTransaction;
