import { AppPage } from '@/components/app-page'
import { StatsLiveWin } from '@/components/stats/stats-live-win'
import { StatsRanking } from '@/components/stats/stats-ranking'
import { StatsTotal } from '@/components/stats/stats-total'

export default function StatsScreen() {
  return (
    <AppPage style={{ flexDirection: 'column', paddingBottom: 0 }}>
      <StatsTotal />
      <StatsRanking />
      <StatsLiveWin />
    </AppPage>
  )
}
