import useAppStore from '@/stores/useAppStore'
import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { ScrollView } from 'react-native'
import { AppButton } from '../app-button'
import { AppItemText } from '../app-item-text'
import { useToast } from '../toast/app-toast-provider'
import { getUniqueKey, useCoinFlipProvider } from './coin-flip-provider'
import FlipCard from './flip-card'

export function MyGame() {
  const { accountInfo } = useAppStore()
  const { playingGames } = useCoinFlipProvider()

  const myGames = useMemo(() => {
    if (!accountInfo || !playingGames) return []

    return sortBy(
      Object.values(playingGames).filter((item) => item?.userCreator?.wallet === accountInfo?.wallet),
      ['gameIndex'],
    )
  }, [playingGames, accountInfo])

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'column', gap: 16 }}
    >
      {myGames.map((item) => {
        return (
          <FlipCard
            key={getUniqueKey(item.gameId, item.userCreator.wallet)}
            data={item}
            action={<CallBotButton gameId={item.gameId} />}
          />
        )
      })}
    </ScrollView>
  )
}

export const CallBotButton = ({ gameId }: { gameId: number }) => {
  const { appSocket, accountInfo } = useAppStore()
  const { showToast } = useToast()

  const handleCallBot = async (gameId: number) => {
    console.log('CLICKED_CALL_BOT')
    if (!appSocket) {
      showToast({
        type: 'error',
        subtitle: 'appSocket not defined',
      })
    } else if (!appSocket.connected) {
      showToast({
        type: 'error',
        subtitle: 'socket_connected not defined',
      })
    } else if (!accountInfo) {
      showToast({
        type: 'error',
        subtitle: 'accountInfo not defined',
      })
    } else {
      console.log('STARTED_EMIT_CALL_BOT')

      appSocket.emit('fl-call-bot', {
        creator: accountInfo.wallet,
        gameId: gameId,
      })
    }
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
