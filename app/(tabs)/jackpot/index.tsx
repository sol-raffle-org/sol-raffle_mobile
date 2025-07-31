import { AppView } from '@/components/app-view'
import { JackpotPlayInRound } from '@/components/jackpot/jackpot-play-in-round'
import { JackpotSlotMachineAction } from '@/components/jackpot/jackpot-slot-machine-action'
import useJackpotStore from '@/stores/useJackpotStore'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function JackpotScreen() {
  const { jackpotGameData } = useJackpotStore()

  const [random, setRandom] = useState(0)

  useEffect(() => {
    if (!jackpotGameData) return

    setRandom(Math.random())
  }, [jackpotGameData])
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <View
        style={{
          height: 280,
          width: '100%',
          position: 'relative',
          marginBottom: -22,
        }}
      >
        <WebView
          // key={random}
          source={{ uri: 'https://dev-frontend.solraffle.xyz/jackpot-wv' }}
          style={{ height: 280, width: '100%', marginBottom: -28 }}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 20,
          }}
        />
      </View>

      <AppView style={{ flex: 1, padding: 8 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexDirection: 'column', gap: 8 }}
        >
          <JackpotSlotMachineAction />

          <JackpotPlayInRound />
        </ScrollView>
      </AppView>
    </View>
  )
}
