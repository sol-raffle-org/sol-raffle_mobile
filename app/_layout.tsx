import { AppProviders } from '@/components/app-providers'
import { AppSplashController } from '@/components/app-splash-controller'
import { KEY_TOKEN } from '@/constants/app.const'
import { useTrackLocations } from '@/hooks/use-track-locations'
import useAppStore from '@/stores/useAppStore'
import { AccountInterface } from '@/types/app.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { View } from 'react-native'
import 'react-native-reanimated'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // Use this hook to track the locations for analytics or debugging.
  // Delete if you don't need it.
  useTrackLocations((pathname, params) => {
    console.log(`Track ${pathname}`, { params })
  })
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    console.log('onLayoutRootView')
    if (loaded) {
      console.log('loaded')
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppProviders>
        <StatusBar style="auto" />
        <AppSplashController />
        <RootNavigator />
      </AppProviders>
    </View>
  )
}

function RootNavigator() {
  // const { isAuthenticated } = useAuth()
  const { setAccountInfo } = useAppStore()

  const isAuthenticated = true
  AsyncStorage.setItem(KEY_TOKEN, verifyObject.accessToken)
  setAccountInfo(verifyObject.user)

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="profile" />
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="connect-wallet" />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

const verifyObject: { user: AccountInterface; [x: string]: any } = {
  user: {
    createdAt: '2025-07-18T01:54:48.139Z',
    id: '5b286458-e1a3-426e-8641-7a9066ab4e66',
    wallet: 'nWzLy6CfTTR19dXHQw4ka9QCS3YbEWbTSmtSkjJYqNA',
    name: 'Harris_1234',
    email: 'test@gmail.com',
    avatar: '1752820410602-541253806.jpg',
    referralCode: null,
    referralByWallet: null,
    level: 6,
    exp: 2850,
    language: 'en',
    isEmailVerified: false,
    nextLevelExp: 4050,
  },
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjg2NDU4LWUxYTMtNDI2ZS04NjQxLTdhOTA2NmFiNGU2NiIsIndhbGxldEFkZHJlc3MiOiJuV3pMeTZDZlRUUjE5ZFhIUXc0a2E5UUNTM1liRVdiVFNtdFNrakpZcU5BIiwiaWF0IjoxNzUzNTkzMTE0LCJleHAiOjE3NTQxOTc5MTR9.glVHXPvJHXadoOMVBo-8637Rrw7452UUKsWoiskTtms',
  expirationAt: 1754197914369,
}
