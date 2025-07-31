import { getSystemStatsService } from '@/services/system-service/system.server-service'
import { SystemStatsServiceType } from '@/types/service.type'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { AppItemText } from '../app-item-text'
import { CoinFlipIcon, SolanaIcon, UserGroupIcon } from '../icons'
import { StatsView } from './stats-view'

export function StatsTotal() {
  const { t } = useTranslation()

  const [statsData, setStatsData] = useState<Partial<SystemStatsServiceType>>({})

  useEffect(() => {
    getSystemStatsService().then((data) => {
      setStatsData(data || {})
      return true
    })
  }, [])

  const iconColor = '#76D638'
  const data = [
    {
      icon: <SolanaIcon color={iconColor} />,
      title: `${Math.round(parseFloat(statsData.totalWagered || '0'))} SOL`,
      subtitle: t('lTotalVolume'),
    },
    { icon: <CoinFlipIcon color={iconColor} />, title: `${statsData.totalBet || 0} SOL`, subtitle: t('lTotalBet') },
    { icon: <UserGroupIcon color={iconColor} />, title: `${statsData.totalPlayer || 0}`, subtitle: t('lTotalUser') },
  ]

  return (
    <StatsView style={{ backgroundColor: 'transparent', alignItems: 'stretch', gap: 16, borderWidth: 0 }}>
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
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#76D63733',
        backgroundColor: '#000',
        borderRadius: 4,
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>{icon}</View>
      <AppItemText textType="subtitle" color="#FFFFFFB2">
        {subtitle}
      </AppItemText>
      <AppItemText textType="title">{title}</AppItemText>
    </View>
  )
}
