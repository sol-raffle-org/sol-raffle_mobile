import useAppStore from '@/stores/useAppStore'
import useJackpotStore from '@/stores/useJackpotStore'
import { calculateWinChance } from '@/utils/common.utils'
import { formatNumber } from '@/utils/format.utils'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'
import { JackpotAmountInput } from './jackpot-amount-input'

export function JackpotSlotMachineAction() {
  return (
    <AppView
      style={{
        borderWidth: 1,
        borderColor: '#76D63733',
        borderRadius: 4,
        padding: 16,
        backgroundColor: '#0A100A03',
      }}
    >
      <JackpotView />
      <JackpotAmountInput />
    </AppView>
  )
}

const JackpotView = () => {
  const { accountInfo, balance } = useAppStore()
  const { jackpotGameData } = useJackpotStore()

  const totalPot = useMemo(() => {
    if (!jackpotGameData || !jackpotGameData?.bets?.length) return 0

    const totalPots = jackpotGameData.bets.map((item) => item.betInfo.totalPot || 0)

    return Math.max(...totalPots)
  }, [jackpotGameData])

  const [totalWagered, chance] = useMemo(() => {
    if (!jackpotGameData || !accountInfo) return [0, 0]
    const totalWagered = jackpotGameData.bets
      ?.filter((entry) => entry.userInfo.wallet === accountInfo.wallet)
      ?.reduce((sum, entry) => sum + entry.betInfo.wagered, 0)

    return [totalWagered || 0, calculateWinChance(totalWagered, totalPot)]
  }, [jackpotGameData, accountInfo, totalPot])

  const data = [
    {
      title: 'Your Wager',
      value: formatNumber(totalWagered),
    },
    {
      title: 'Your Chance',
      value: chance,
    },
  ]

  return (
    <AppView style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 32,
        }}
      >
        {data.map((item, index) => (
          <View key={index} style={{ alignItems: 'flex-start' }}>
            <AppItemText style={{ color: '#FFFFFF80', fontSize: 12 }}>{item.title}</AppItemText>
            <AppItemText style={{ fontSize: 16 }}>{item.value}</AppItemText>
          </View>
        ))}
      </View>

      <AppItemText textType="subtitle" style={{ color: '#FFFFFF80', textAlign: 'left', fontSize: 12 }}>
        Ballance: {balance || 0}
      </AppItemText>
    </AppView>
  )
}
