import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import React, { useMemo } from 'react'
import { Button, Text } from 'react-native-paper'
import { AppView } from '../app-view'

export function MyGame() {
  const { appSocket, accountInfo } = useAppStore()
  const { flipGamesTable } = useCoinFlipStore()

  const myGames = useMemo(() => {
    if (!accountInfo || !flipGamesTable?.length) return []

    return flipGamesTable.filter((item) => item?.userCreator?.wallet === accountInfo?.wallet)
  }, [flipGamesTable, accountInfo])

  const handleCallBot = async (gameId: number) => {
    if (!appSocket || !appSocket.connected || !accountInfo) return

    appSocket.emit('fl-call-bot', {
      creator: accountInfo.wallet,
      gameId: gameId,
    })
  }

  return (
    <AppView>
      {myGames.map((item, index) => {
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
              <Button onPress={() => handleCallBot(item.gameId)}>Call bot</Button>
            )}
          </AppView>
        )
      })}
    </AppView>
  )
}
