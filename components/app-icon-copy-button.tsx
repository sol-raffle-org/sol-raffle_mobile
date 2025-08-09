import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { Alert, Pressable } from 'react-native'
import { CopyIcon } from './icons'

export default function IconCopyButton({ copyContent }: { copyContent: string }) {
  const handleCopy = async () => {
    if (!copyContent) return
    await Clipboard.setStringAsync(copyContent)
    Alert.alert('Copied!', `"${copyContent}" copied to clipboard.`)
  }

  return (
    <Pressable
      onPress={handleCopy}
      style={{
        padding: 4,
      }}
    >
      <CopyIcon color="#FFFFFF8C" />
    </Pressable>
  )
}
