import { ERR_MSG_BET_BALANCE } from '@/constants/blockchain.const'
import useAccount from '@/hooks/account-hooks/useAccount'
import useTransaction from '@/hooks/blockchain-hooks'
import useCoinFlipGame from '@/hooks/game-hooks/coin-flip-hooks/useCoinFlipGame'
import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import { FlipGameInterface } from '@/types/coin-flip.type'
import { BlockchainTransactionStatusEnum, SupportedChainEnum } from '@/types/common.type'
import { isNil } from '@/utils/common.utils'
import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import { AppButton } from '../app-button'
import { AppItemText } from '../app-item-text'
import { useToast } from '../toast/app-toast-provider'
import FlipCard from './flip-card'

export function OtherGames() {
  const { flipGamesTable } = useCoinFlipStore()
  const { accountInfo } = useAppStore()

  const otherGames = useMemo(() => {
    if (!accountInfo) return flipGamesTable || []

    if (!flipGamesTable?.length) return []

    return flipGamesTable.filter((item) => item?.userCreator?.wallet !== accountInfo?.wallet)
  }, [flipGamesTable, accountInfo])

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'column', gap: 16 }}
    >
      {otherGames.map((item, index) => {
        return <FlipCard key={index} data={item} action={<JoinGameButton gameData={item} />} />
      })}
    </ScrollView>
  )
}

const JoinGameButton = ({ gameData }: { gameData: FlipGameInterface }) => {
  const { handleGetTransactionResult } = useTransaction()
  const { handleGetBalance } = useAccount()
  const { appSocket, accountInfo, balance, setBalance } = useAppStore()
  const { showToast } = useToast()
  const { transactionError, handleReset, handleJoinFlipGame } = useCoinFlipGame()

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
    if (!appSocket || !appSocket.connected || !accountInfo) return

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
    >
      <AppItemText>Join game</AppItemText>
    </AppButton>
  )
}
