import { SupportedChainEnum } from '@/types/common.type'

import { createPlaceBetTransactionService } from '@/services/games-service/jackpot/jackpot.blockchain-service'

import useTransaction from '@/hooks/blockchain-hooks'

const useJackpotGame = () => {
  const { transactionError, handleReset, handleSendTransaction } = useTransaction()

  const handlePlaceBet = async (walletAddress: string, betAmount: number) => {
    try {
      const betTransaction = await createPlaceBetTransactionService(walletAddress, betAmount)
      if (!betTransaction) return ''

      const txHash = await handleSendTransaction(SupportedChainEnum.Solana, betTransaction)

      return txHash
    } catch (error) {
      console.error('Error while send bet transaction', error)
      return
    }
  }

  return {
    transactionError,

    handleReset,
    handlePlaceBet,
  }
}

export default useJackpotGame
