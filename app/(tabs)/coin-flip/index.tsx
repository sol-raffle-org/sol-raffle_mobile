import { AppPage } from '@/components/app-page'
import { CoinFlipCreateGame } from '@/components/coin-flip/coin-flip-create'
import { CoinFlipGame } from '@/components/coin-flip/coin-flip-game'
import { CoinFlipTabs } from '@/components/coin-flip/coin-flip-tabs'

export default function CoinFlipScreen() {
  return (
    <AppPage>
      <CoinFlipCreateGame />
      <CoinFlipTabs />
      <CoinFlipGame />
    </AppPage>
  )
}
