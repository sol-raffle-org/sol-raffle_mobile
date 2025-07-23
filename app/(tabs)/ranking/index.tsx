import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'

export default function RankingScreen() {
  return (
    <AppPage>
      <AppText style={{ opacity: 0.5, fontSize: 14 }}>
        This is the <AppText style={{ fontWeight: 'bold' }}>Ranking</AppText> screen. Configure app info and clusters in{' '}
        <AppText style={{ fontWeight: 'bold' }}>constants/app-config.tsx</AppText>.{'\n\n'}
        Note: This screen is currently under development and may not be fully functional.
      </AppText>
    </AppPage>
  )
}
