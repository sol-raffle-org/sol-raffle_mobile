import { StatsBackgroundImage } from '@/assets/images'
import { AutoHeightImage } from '@/components/app-image-height'
import { AppPage } from '@/components/app-page'
import AppTabView from '@/components/app-tab-view'
import { StatsLiveWin } from '@/components/stats/stats-live-win'
import { StatsRanking } from '@/components/stats/stats-ranking'
import { StatsTotal } from '@/components/stats/stats-total'

export default function StatsScreen() {
  return (
    <AppTabView>
      <AutoHeightImage source={StatsBackgroundImage} style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <AppPage style={{ flexDirection: 'column' }}>
        <StatsTotal />
        <StatsRanking />
        <StatsLiveWin />
      </AppPage>
    </AppTabView>
  )
}
