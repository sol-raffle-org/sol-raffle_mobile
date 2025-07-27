import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { AppItemText } from './app-item-text'

export function AppDetailHeader({ title }: { title: string }) {
  const router = useRouter()

  const handleBackScreen = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace('/(tabs)')
    }
  }

  return (
    <View style={{ gap: 16, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleBackScreen}>
        <FontAwesome5 name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <AppItemText textType="title" style={{ fontSize: 18 }}>
        {title}
      </AppItemText>
      <Divider />
    </View>
  )
}
