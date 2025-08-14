import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'

import { AppView } from '@/components/app-view'
import { useCountdownByDuration } from '@/hooks/common/useCountdown'
import { useCoinFlipProvider } from '../coin-flip-provider'

const FlipCountdown = ({ key }: { key: string }) => {
  const { updateCountdown } = useCoinFlipProvider()
  const remain = useCountdownByDuration(3)

  useEffect(() => {
    if (key) updateCountdown(key, remain)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, remain])

  return (
    <AppView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: remain ? 30 : 'auto',
        borderRadius: 30 / 2,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: remain ? 'black' : 'transparent',
      }}
    >
      <Text style={[styles.text, remain ? styles.textLarge : styles.textSmall]}>{remain || 'Mining'}</Text>
    </AppView>
  )
}

export default FlipCountdown

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  active: {
    backgroundColor: 'black',
  },
  inactive: {
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: 'bold',
    color: '#01FC7F99',
    textTransform: 'uppercase',
  },
  textLarge: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textSmall: {
    fontSize: 12,
    fontWeight: 'bold',
  },
})
