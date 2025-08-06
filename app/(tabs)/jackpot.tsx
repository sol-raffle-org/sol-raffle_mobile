import { JackpotBackgroundImage } from '@/assets/images'
import { AutoHeightImage } from '@/components/app-image-height'
import { AppPage } from '@/components/app-page'
import AppTabView from '@/components/app-tab-view'
import { JackpotPlayInRound } from '@/components/jackpot/jackpot-play-in-round'
import { JackpotSlotMachineAction } from '@/components/jackpot/jackpot-slot-machine-action'
import useJackpotStore from '@/stores/useJackpotStore'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { WEBVIEW_JACKPOT_URL } from '@env'

export default function JackpotScreen() {
  const { jackpotGameData } = useJackpotStore()

  const [random, setRandom] = useState(0)

  useEffect(() => {
    if (!jackpotGameData) return

    setRandom(Math.random())
  }, [jackpotGameData])

  return (
    <AppTabView>
      <AutoHeightImage source={JackpotBackgroundImage} style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexDirection: 'column', gap: 16, paddingTop: 16 }}
      >
        <View
          style={{
            height: 280,
            width: '100%',
            position: 'relative',
          }}
        >
          <WebView
            source={{ uri: WEBVIEW_JACKPOT_URL }}
            style={{
              width: '100%',
              height: 280,
              position: 'relative',
              zIndex: 10,
              transform: [{ scale: 1.05 }],
              backgroundColor: 'transparent',
            }}
            injectedJavaScript={`
              document.body.style.background = 'transparent';
              document.body.style.backgroundColor = 'transparent';
              true;
            `}
          />
          <View
            style={{
              height: '100%',
              width: '100%',
              zIndex: 20,
              position: 'absolute',
            }}
          />
        </View>

        <AppPage style={{ flexDirection: 'column', gap: 8, marginTop: -30 }}>
          <JackpotSlotMachineAction />
          <JackpotPlayInRound />
        </AppPage>
      </ScrollView>
    </AppTabView>
  )
}
