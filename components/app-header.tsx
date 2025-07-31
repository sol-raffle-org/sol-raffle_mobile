import { CoinFlipTitleImage, JackpotTitleImage, StatsTitleImage } from '@/assets/images'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRoute } from '@react-navigation/native'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { AppImage } from './app-image'

export function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppHeaderTitle />
      </View>

      <Link href="/profile" asChild>
        <IconButton
          style={{
            width: 32,
            height: 32,
            backgroundColor: '#76D637',
            borderRadius: 4,
            position: 'absolute',
            right: 0,
          }}
          icon={() => <AntDesign name="wallet" size={16} color="black" />}
        />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 64 },
  headerLogo: { width: 42, height: 39, marginRight: 10, resizeMode: 'cover' },
  content: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
})

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
