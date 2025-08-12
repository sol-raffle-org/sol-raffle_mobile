import { ERR_MSG_BET_BALANCE } from '@/constants/blockchain.const'
import useAccount from '@/hooks/account-hooks/useAccount'
import useTransaction from '@/hooks/blockchain-hooks'
import useCoinFlipGame from '@/hooks/game-hooks/coin-flip-hooks/useCoinFlipGame'
import useAppStore from '@/stores/useAppStore'
import { PlayingFlipGameItem } from '@/types/coin-flip.type'
import { BlockchainTransactionStatusEnum, SupportedChainEnum } from '@/types/common.type'
import { isNil } from '@/utils/common.utils'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { AppButton } from '../app-button'
import { AppItemText } from '../app-item-text'
import { useToast } from '../toast/app-toast-provider'
import { useCoinFlipProvider } from './coin-flip-provider'
import FlipCard from './flip-card'
import { CallBotButton } from './my-game'

export function OtherGames() {
  const { playingGames } = useCoinFlipProvider()
  const { accountInfo } = useAppStore()

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'column', gap: 16 }}
    >
      {Object.values(playingGames).map((item, index) => {
        return (
          <FlipCard
            key={index}
            data={item}
            action={
              item.userCreator.wallet === accountInfo?.wallet ? (
                <CallBotButton gameId={item.gameId} />
              ) : (
                <JoinGameButton gameData={item} />
              )
            }
          />
        )
      })}
    </ScrollView>
  )
}

export const JoinGameButton = ({ gameData }: { gameData: PlayingFlipGameItem }) => {
  const { handleGetTransactionResult } = useTransaction()
  const { handleGetBalance } = useAccount()
  const { appSocket, accountInfo, balance, setBalance } = useAppStore()
  const { showToast } = useToast()
  const { transactionError, handleReset, handleJoinFlipGame } = useCoinFlipGame()

  const [isLoading, setIsLoading] = useState(false)

  const [txHash, setTxHash] = useState('')
  const [txStatus, setTxStatus] = useState<BlockchainTransactionStatusEnum | undefined>(undefined)

  const handleGetTxStatus = async () => {
    if (!txHash) return

    const status = await handleGetTransactionResult(SupportedChainEnum.Solana, txHash)

    if (status === BlockchainTransactionStatusEnum.LOADING) return
    setTxStatus(status)

    if (status === BlockchainTransactionStatusEnum.SUCCESS) {
      handleGetBalance()
      setTxHash('')
    } else {
      showToast({ type: 'error', subtitle: 'Transaction failed' })
      setTxHash('')
    }
  }

  const handleJoinGame = async () => {
    console.log('CLICKED_JOIN_GAME')
    if (!appSocket || !appSocket.connected || !accountInfo) return

    setIsLoading(true)

    console.log('STARTED_EMIT_JOIN_GAME')
    appSocket.emit('fl-sitdown-table', {
      creator: gameData.userCreator.wallet,
      gameId: gameData.gameId,
    })

    await 2000

    const hash = await handleJoinFlipGame(accountInfo.wallet, gameData.userCreator.wallet, gameData.gameId)

    if (hash) {
      setTxHash(hash)
      setBalance(Math.max(0, balance - Number(gameData.gameValue || 0)))
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (!transactionError || !appSocket || !appSocket.connected || !gameData) return
    appSocket.emit('fl-leave-table', {
      creator: gameData.userCreator.wallet,
      gameId: gameData.gameId,
    })

    if (transactionError === ERR_MSG_BET_BALANCE) {
      handleGetBalance()
      showToast({ type: 'error', subtitle: 'Not enough balance' })
    } else {
      showToast({ type: 'error', subtitle: 'Transaction failed' })
    }

    handleReset()
  }, [transactionError, appSocket, gameData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let getStatusInterval: any = undefined

    getStatusInterval = setInterval(async () => {
      handleGetTxStatus()
    }, 3000)

    if (!txHash || (!isNil(txStatus) && txStatus !== BlockchainTransactionStatusEnum.LOADING)) {
      clearInterval(getStatusInterval)
      return
    }

    return () => {
      clearInterval(getStatusInterval)
    }
  }, [txHash, txStatus]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let getStatusInterval: any = undefined

    getStatusInterval = setInterval(async () => {
      handleGetTxStatus()
    }, 3000)

    if (!txHash || (!isNil(txStatus) && txStatus !== BlockchainTransactionStatusEnum.LOADING)) {
      clearInterval(getStatusInterval)
      return
    }

    return () => {
      clearInterval(getStatusInterval)
    }
  }, [txHash, txStatus]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppButton
      variant="contained"
      style={{
        width: 79,
        height: 33,
      }}
      onPress={() => handleJoinGame()}
      disabled={isLoading}
    >
      {isLoading ? <ActivityIndicator /> : <AppItemText>Join game</AppItemText>}
    </AppButton>
  )
}
