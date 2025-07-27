import { SlotMachineDemoImage } from '@/assets/images'
import React from 'react'
import { View } from 'react-native'
import { AppImage } from '../app-image'

export function JackpotSlotMachine() {
  return (
    <View
      style={{
        maxHeight: 380,
      }}
    >
      <AppImage
        source={SlotMachineDemoImage}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  )
}
