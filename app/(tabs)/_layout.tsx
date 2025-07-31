import { AppHeader } from '@/components/app-header'
import { AppTabBar } from '@/components/app-tab-bar'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
      }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: 'none' } }} />

      <Tabs.Screen name="jackpot" options={{ title: 'Jackpot' }} />
      <Tabs.Screen name="coin-flip" options={{ title: 'CoinFlip' }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
    </Tabs>
  )
}
