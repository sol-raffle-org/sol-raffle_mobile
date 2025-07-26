import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { AppItemText } from '../app-item-text'
import { CoinFlipIcon, SolanaIcon, UserGroupIcon } from '../icons'
import { StatsView } from './stats-view'

export function StatsTotal() {
  const { t } = useTranslation()

  const data = [
    { icon: <SolanaIcon color="#FFFFFF80" />, title: '133 SOL', subtitle: t('lTotalVolume') },
    { icon: <CoinFlipIcon color="#FFFFFF80" />, title: '133 SOL', subtitle: t('lTotalBet') },
    { icon: <UserGroupIcon color="#FFFFFF80" />, title: '133', subtitle: t('lTotalUser') },
  ]
  return (
    <StatsView>
      {data.map((item, index) => (
        <StatsTotalItem key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} />
      ))}
    </StatsView>
  )
}

type StatsTotalItemProps = {
  icon: React.ReactNode
  subtitle: string
  title: string
}
function StatsTotalItem({ icon, subtitle, title }: StatsTotalItemProps) {
  return (
    <View style={{ flex: 1, padding: 8, gap: 6 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>{icon}</View>
      <AppItemText textType="subtitle" color="#FFFFFFB2">
        {subtitle}
      </AppItemText>
      <AppItemText textType="title">{title}</AppItemText>
    </View>
  )
}
