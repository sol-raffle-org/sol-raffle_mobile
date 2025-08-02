import React, { useMemo } from 'react'

import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import { AppItemText, AppItemTextProps } from '../app-item-text'
import { AppView } from '../app-view'

export function CoinFlipCreateTabs() {
  const { accountInfo } = useAppStore()
  const { flipGamesTable, gameTab, setGameTab } = useCoinFlipStore()
  const [totalGames, myTotalGames] = useMemo(() => {
    if (!accountInfo || !flipGamesTable?.length) return [0, 0]

    return [
      flipGamesTable.length,
      flipGamesTable.filter((item) => item?.userCreator?.wallet === accountInfo?.wallet).length,
    ]
  }, [flipGamesTable, accountInfo])

  return (
    <AppView
      style={{
        flexDirection: 'row',
        gap: 0,
        padding: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#FFFFFF4D',
        backgroundColor: '#000000',
        alignSelf: 'flex-start',
      }}
    >
      <Pressable
        style={({ pressed }) => [
          {
            height: 33,
            width: 103,
            backgroundColor: gameTab === 0 ? '#255C2F66' : pressed ? '#FFFFFF33' : 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          } as StyleProp<ViewStyle>,
        ]}
        onPress={() => setGameTab(0)}
      >
        <TabTextView color={gameTab === 0 ? '#FFF' : '#FFFFFF4D'}>All Games</TabTextView>
        <TabTextView color={gameTab === 0 ? '#FAB40F' : '#FFFFFF4D'}>{totalGames}</TabTextView>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            height: 33,
            width: 103,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: gameTab === 1 ? '#255C2F66' : pressed ? '#FFFFFF33' : 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          } as StyleProp<ViewStyle>,
        ]}
        onPress={() => setGameTab(1)}
      >
        <TabTextView color={gameTab === 1 ? '#FFF' : '#FFFFFF4D'}>My Games</TabTextView>
        <TabTextView color={gameTab === 1 ? '#FAB40F' : '#FFFFFF4D'}>{myTotalGames}</TabTextView>
      </Pressable>
    </AppView>
  )
}

const TabTextView = ({ style, ...otherProps }: AppItemTextProps) => (
  <AppItemText
    style={[
      {
        fontSize: 13,
      },
      style,
    ]}
    {...otherProps}
  />
)
