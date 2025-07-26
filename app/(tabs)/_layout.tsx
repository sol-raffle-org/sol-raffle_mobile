import { AppHeader } from '@/components/app-header'
import { useAppTheme } from '@/components/app-theme'
import { CoinFlipIcon, JackpotIcon, StatsIcon } from '@/components/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TabLayout() {
  const { theme } = useAppTheme()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          header: () => <AppHeader />,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: 'transparent',
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: '#888',
        }}
      >
        {/* The index redirects to the account screen */}
        <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: 'none' } }} />

        <Tabs.Screen
          name="jackpot"
          options={{
            title: 'Jackpot',
            tabBarIcon: ({ color }) => <JackpotIcon color={color} />,
          }}
        />

        <Tabs.Screen
          name="coin-flip"
          options={{
            title: 'CoinFlip',
            tabBarIcon: ({ color }) => <CoinFlipIcon color={color} />,
          }}
        />

        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => <StatsIcon color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}
