import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { AppButton } from '../app-button'
import { AppItemText } from '../app-item-text'
import FlipCard from './flip-card'

export function MyGame() {
  const { accountInfo } = useAppStore()
  const { flipGamesTable } = useCoinFlipStore()

  const myGames = useMemo(() => {
    if (!accountInfo || !flipGamesTable?.length) return []

    return flipGamesTable.filter((item) => item?.userCreator?.wallet === accountInfo?.wallet)
  }, [flipGamesTable, accountInfo])

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'column', gap: 16 }}
    >
      {myGames.map((item, index) => {
        return <FlipCard key={index} data={item} action={<CallBotButton gameId={item.gameId} />} />
      })}
    </ScrollView>
  )
}

export const CallBotButton = ({ gameId }: { gameId: number }) => {
  const { appSocket, accountInfo } = useAppStore()

  const handleCallBot = async (gameId: number) => {
    if (!appSocket || !appSocket.connected || !accountInfo) return

    appSocket.emit('fl-call-bot', {
      creator: accountInfo.wallet,
      gameId: gameId,
    })
  }

  return (
    <View
      style={{
        backgroundColor: '#133018',
        borderRadius: 2,
        paddingBottom: 3,
      }}
    >
      <AppButton
        style={{
          width: 79,
          height: 33,
        }}
        onPress={() => handleCallBot(gameId)}
      >
        <AppItemText>Call bot</AppItemText>
      </AppButton>
    </View>
  )
}
