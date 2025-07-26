import { CoinSideEnum } from "@/types/coin-flip.type";
import {
  createJoinGameTransactionService,
  createNewGameTransactionService,
} from "@/services/games-service/coin-flip/coin-flip.blockchain-service";
import useTransaction from "@/hooks/blockchain-hooks";
import { SupportedChainEnum } from "@/types/common.type";

const useCoinFlipGame = () => {
  const { transactionError, handleReset, handleSendTransaction } =
    useTransaction();

  const handleCreateNewFlipGame = async (
    walletAddress: string,
    betAmount: number,
    side: CoinSideEnum
  ) => {
    try {
      const newGameTransaction = await createNewGameTransactionService(
        walletAddress,
        betAmount,
        side
      );

      if (!newGameTransaction) return "";

      const txHash = await handleSendTransaction(
        SupportedChainEnum.Solana,
        newGameTransaction
      );

      return txHash;
    } catch (error) {
      console.error("Error while send bet transaction", error);
      return;
    }
  };

  const handleJoinFlipGame = async (
    walletAddress: string,
    creatorAddress: string,
    gameId: number
  ) => {
    try {
      const joinGameTransaction = await createJoinGameTransactionService(
        walletAddress,
        creatorAddress,
        gameId
      );

      if (!joinGameTransaction) return "";

      const txHash = await handleSendTransaction(
        SupportedChainEnum.Solana,
        joinGameTransaction
      );

      return txHash;
    } catch (error) {
      console.error("Error while send bet transaction", error);
      return;
    }
  };

  return {
    transactionError,
    handleReset,
    handleJoinFlipGame,
    handleCreateNewFlipGame,
  };
};

export default useCoinFlipGame;
