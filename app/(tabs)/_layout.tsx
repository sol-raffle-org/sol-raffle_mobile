import { AppHeader } from '@/components/app-header'
import { useAppTheme } from '@/components/app-theme'
import { CoinFlipIcon, JackpotIcon } from '@/components/icons'
import Foundation from '@expo/vector-icons/Foundation'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  const { theme } = useAppTheme()
  return (
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
        name="ranking"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Foundation name="home" color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="coin-flip"
        options={{
          title: 'CoinFlip',
          tabBarIcon: ({ color }) => <CoinFlipIcon color={color} />,
        }}
      />
    </Tabs>
  )
}
