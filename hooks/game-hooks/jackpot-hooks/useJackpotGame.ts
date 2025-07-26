import { SupportedChainEnum } from '@/types/common.type'

import {
  createPlaceBetTransactionService,
  getBetAccountService,
  getGameAccountService,
  getRoundService,
} from '@/services/games-service/jackpot/jackpot.blockchain-service'

import useTransaction from '@/hooks/blockchain-hooks'
import useJackpotStore from '@/stores/useJackpotStore'

const useJackpotGame = () => {
  const { transactionError, handleReset, handleSendTransaction } = useTransaction()
  const { setCurrentAddressBetAccount, setGameAccount } = useJackpotStore()

  const handleGetBetAccount = async (walletAddress: string) => {
    const betAccount = await getBetAccountService(walletAddress)
    setCurrentAddressBetAccount(betAccount)
  }

  const handleGetRoundInfo = async (roundId: string) => {
    await getRoundService(Number(roundId))
  }

  const handleGetGameAccount = async () => {
    const gameAccount = await getGameAccountService()
    setGameAccount(gameAccount)
  }

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
    handleGetRoundInfo,
    handleGetBetAccount,
    handleGetGameAccount,
  }
}

export default useJackpotGame
