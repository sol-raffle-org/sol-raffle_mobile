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
import { Button, Text } from 'react-native-paper'
import { AppView } from '../app-view'
import { useToast } from '../toast/app-toast-provider'

export function OtherGames() {
  const { flipGamesTable } = useCoinFlipStore()
  const { accountInfo } = useAppStore()

  const otherGames = useMemo(() => {
    if (!accountInfo) return flipGamesTable || []

    if (!flipGamesTable?.length) return []

    return flipGamesTable.filter((item) => item?.userCreator?.wallet !== accountInfo?.wallet)
  }, [flipGamesTable, accountInfo])

  return (
    <AppView>
      {otherGames.map((item, index) => {
        return (
          <AppView
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 4,
              borderWidth: 1,
              borderColor: 'white',
            }}
          >
            <AppView>
              <Text>Creator data</Text>
              <Text>Bet: {item.creatorChoice === 0 ? 'Heads' : 'Tails'}</Text>
            </AppView>

            <Text>{item.result === 0 ? 'Heads' : item.result === 1 ? 'Tails' : 'Waiting result'}</Text>

            {item.userJoin ? (
              <AppView>
                <Text>User join data</Text>
                <Text>Bet: {item.creatorChoice === 0 ? 'Tails' : 'Heads'}</Text>
              </AppView>
            ) : (
              <JoinGameButton gameData={item} />
            )}
          </AppView>
        )
      })}
    </AppView>
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

  return <Button onPress={() => handleJoinGame()}>Join game</Button>
}
