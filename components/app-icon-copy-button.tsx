import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { Pressable } from 'react-native'
import { CopyIcon } from './icons'
import { useToast } from './toast/app-toast-provider'

export default function IconCopyButton({ copyContent }: { copyContent: string }) {
  const { showToast } = useToast()

  const handleCopy = async () => {
    if (!copyContent) return
    await Clipboard.setStringAsync(copyContent)
    showToast({
      title: 'Copied!',
      subtitle: `"${copyContent}" copied to clipboard.`,
    })
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
