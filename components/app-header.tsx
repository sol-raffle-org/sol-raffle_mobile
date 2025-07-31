import { CoinFlipTitleImage, JackpotTitleImage, StatsTitleImage } from '@/assets/images'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRoute } from '@react-navigation/native'
import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppImage } from './app-image'

export const HEADER_PADDING = 16
export function AppHeader() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        padding: HEADER_PADDING,
        paddingTop: HEADER_PADDING + insets.top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppHeaderTitle />

      <Link href="/profile" asChild>
        <IconButton
          style={{
            width: 32,
            height: 32,
            backgroundColor: '#76D637',
            borderRadius: 4,
            position: 'absolute',
            top: (32 + insets.top) / 2,
            right: 0,
          }}
          icon={() => <AntDesign name="wallet" size={16} color="black" />}
        />
      </Link>
    </View>
  )
}

const AppHeaderTitle = () => {
  const route = useRoute()

  switch (route.name) {
    case 'stats':
      return <AppImage source={StatsTitleImage} style={{ width: 96, height: 30 }} />

    case 'jackpot':
      return <AppImage source={JackpotTitleImage} style={{ width: 112, height: 30 }} />

    case 'coin-flip':
      return <AppImage source={CoinFlipTitleImage} style={{ width: 112, height: 30 }} />

    default:
      return null
  }
}
