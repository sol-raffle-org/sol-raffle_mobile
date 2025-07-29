import React from 'react'

import useCoinFlipStore from '@/stores/useCoinflipStore'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'

export function CoinFlipCreateTabs() {
  const { gameTab, setGameTab } = useCoinFlipStore()

  return (
    <AppView style={{ flexDirection: 'row' }}>
      <Pressable
        style={({ pressed }) => [
          {
            height: 40,
            borderRadius: 2,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: gameTab === 0 ? '#255C2F66' : pressed ? '#FFFFFF33' : '#FFFFFF1A',
            justifyContent: 'center',
            alignItems: 'center',
          } as StyleProp<ViewStyle>,
        ]}
        onPress={() => setGameTab(0)}
      >
        <AppItemText>Others Games</AppItemText>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            height: 40,
            borderRadius: 2,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: gameTab === 1 ? '#255C2F66' : pressed ? '#FFFFFF33' : '#FFFFFF1A',
            justifyContent: 'center',
            alignItems: 'center',
          } as StyleProp<ViewStyle>,
        ]}
        onPress={() => setGameTab(1)}
      >
        <AppItemText>My Games</AppItemText>
      </Pressable>
    </AppView>
  )
}
