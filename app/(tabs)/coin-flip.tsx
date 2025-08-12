import { CoinFlipBackgroundImage } from '@/assets/images'
import { AutoHeightImage } from '@/components/app-image-height'
import { AppPage } from '@/components/app-page'
import AppTabView from '@/components/app-tab-view'
import { CoinFlipCreateGame } from '@/components/coin-flip/coin-flip-create'
import { CoinFlipProvider } from '@/components/coin-flip/coin-flip-provider'
import { CoinFlipCreateTabs } from '@/components/coin-flip/coin-flip-tabs'
import { MyGame } from '@/components/coin-flip/my-game'
import { OtherGames } from '@/components/coin-flip/other-games'
import useCoinFlipStore from '@/stores/useCoinflipStore'

export default function CoinFlipScreen() {
  const { gameTab } = useCoinFlipStore()
  return (
    <AppTabView>
      <AutoHeightImage source={CoinFlipBackgroundImage} style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <AppPage>
        <CoinFlipCreateGame />

        <CoinFlipCreateTabs />

        <CoinFlipProvider>
          {gameTab === 0 && <OtherGames />}
          {gameTab === 1 && <MyGame />}
        </CoinFlipProvider>
      </AppPage>
    </AppTabView>
  )
}
