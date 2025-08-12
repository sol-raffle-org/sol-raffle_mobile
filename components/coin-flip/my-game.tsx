import useAppStore from '@/stores/useAppStore'
import React, { useMemo } from 'react'
import { ScrollView } from 'react-native'
import { AppButton } from '../app-button'
import { AppItemText } from '../app-item-text'
import { useCoinFlipProvider } from './coin-flip-provider'
import FlipCard from './flip-card'

export function MyGame() {
  const { accountInfo } = useAppStore()
  const { playingGames } = useCoinFlipProvider()

  const myGames = useMemo(() => {
    if (!accountInfo || !playingGames) return []

    return Object.values(playingGames).filter((item) => item?.userCreator?.wallet === accountInfo?.wallet)
  }, [playingGames, accountInfo])

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
    console.log('CLICKED_CALL_BOT')
    if (!appSocket || !appSocket.connected || !accountInfo) return

    console.log('STARTED_EMIT_CALL_BOT')

    appSocket.emit('fl-call-bot', {
      creator: accountInfo.wallet,
      gameId: gameId,
    })
  }

  return (
    <AppButton
      style={{
        width: 79,
        height: 33,
      }}
      onPress={() => handleCallBot(gameId)}
    >
      <AppItemText>Call bot</AppItemText>
    </AppButton>
  )
}
