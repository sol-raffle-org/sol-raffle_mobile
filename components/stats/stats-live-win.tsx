import { BigWinImage, SolanaLogo } from '@/assets/images'
import useJackpotStore from '@/stores/useJackpotStore'
import { JackpotWinnerItemInterface, WinTypeEnum } from '@/types/jackpot.type'
import { getAvatarUrl } from '@/utils/common.utils'
import { LinearGradient } from 'expo-linear-gradient'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { AppCircle } from '../app-circle'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import AppLevel from '../app-level'
import { CoinFlipIcon, JackpotIcon } from '../icons'
import { StatsView } from './stats-view'

export function StatsLiveWin() {
  const { winnerList } = useJackpotStore()

  const list = useMemo(() => {
    return Array.isArray(winnerList?.data) ? winnerList.data : []
  }, [winnerList])

  return (
    <StatsView variant="column" style={{ flex: 1 }}>
      <LinearGradient
        colors={['rgba(254, 220, 133, 0.1)', 'rgba(254, 220, 133, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', padding: 12 }}
      >
        <AppCircle
          style={{
            width: 10,
            height: 10,
            backgroundColor: '#E00303',
            borderWidth: 3,
            borderColor: '#E0030330',
          }}
        />

        <AppItemText
          style={{
            color: '#FEDC85',
            padding: 8,
          }}
        >
          Live Wins
        </AppItemText>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: '100%', flexDirection: 'column', gap: 8 }}
      >
        {list.map((item, index) => (
          <StatsLiveWinItem key={index} item={item} />
        ))}
      </ScrollView>
    </StatsView>
  )
}

function StatsLiveWinItem({ item }: { item: JackpotWinnerItemInterface }) {
  const isBigWin = item.type === WinTypeEnum.BigWin
  const gameValueColor = isBigWin ? '#FF4CE7' : '#76D638'
  const walletColor = 'rgba(255, 255, 255, 0.7)'
  const iconColor = 'rgba(255, 255, 255, 0.3)'

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: 8,
        gap: 6,
      }}
    >
      <View>
        <AppImage
          source={getAvatarUrl(item.avatar)}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            borderWidth: 1,
          }}
        />

        <AppLevel
          style={{
            position: 'absolute',
            bottom: 0,
            left: 16,
            width: 18,
            height: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          level={item.level}
        />
      </View>

      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AppImage source={SolanaLogo} style={{ width: 17, height: 17 }} />

          <AppItemText textType="title" color={gameValueColor}>
            {item.gameValue || 0}
          </AppItemText>

          {item.type === WinTypeEnum.BigWin && <AppImage source={BigWinImage} style={{ width: 40, height: 18 }} />}
        </View>

        <AppItemText textType="subtitle" style={{ textAlign: 'left' }} color={walletColor}>
          {item.name}
        </AppItemText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        {item.gameType === 'jackpot' ? (
          <>
            <JackpotIcon color={iconColor} />
            <AppItemText textType="subtitle" color={iconColor}>
              Jackpot
            </AppItemText>
          </>
        ) : (
          <>
            <CoinFlipIcon color={iconColor} />
            <AppItemText textType="subtitle" color={iconColor}>
              CoinFlip
            </AppItemText>
          </>
        )}
      </View>
    </View>
  )
}

const cloneData = (items: JackpotWinnerItemInterface[]): JackpotWinnerItemInterface[] => {
  if (!items.length) return []

  const result: JackpotWinnerItemInterface[] = []

  while (result.length < 20) {
    for (const item of items) {
      if (result.length >= 20) break

      const modifiedItem = {
        ...item,
        round: item.round + result.length,
        createdAt: item.createdAt + result.length * 1000,
      }

      result.push(modifiedItem)
    }
  }

  return result
}
