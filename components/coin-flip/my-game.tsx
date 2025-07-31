import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import React, { useMemo } from 'react'
import { ScrollView } from 'react-native'
import { AppButton } from '../app-button'
import { AppItemText } from '../app-item-text'
import FlipCard from './flip-card'

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
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'column', gap: 16 }}
    >
      {myGames.map((item, index) => {
        return (
          <FlipCard
            key={index}
            data={item}
            action={
              <AppButton
                variant="contained"
                style={{
                  width: 79,
                  height: 33,
                }}
                onPress={() => handleCallBot(item.gameId)}
              >
                <AppItemText>Call bot</AppItemText>
              </AppButton>
            }
          />
        )
      })}
    </ScrollView>
  )
}
