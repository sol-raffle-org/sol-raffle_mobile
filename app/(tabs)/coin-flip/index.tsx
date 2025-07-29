import { AppPage } from '@/components/app-page'
import { CoinFlipCreateGame } from '@/components/coin-flip/coin-flip-create'
import { CoinFlipCreateTabs } from '@/components/coin-flip/coin-flip-tabs'
import { MyGame } from '@/components/coin-flip/my-game'
import { OtherGames } from '@/components/coin-flip/other-games'
import useCoinFlipStore from '@/stores/useCoinflipStore'

export default function CoinFlipScreen() {
  const { gameTab } = useCoinFlipStore()
  return (
    <AppPage>
      <CoinFlipCreateGame />

      <CoinFlipCreateTabs />

      {gameTab === 0 && <OtherGames />}
      {gameTab === 1 && <MyGame />}
    </AppPage>
  )
}
