import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { AppView } from '@/components/app-view'
import { useCountdownByDuration } from '@/hooks/common/useCountdown'

const FlipCountdown = ({ ...otherProps }) => {
  const remain = useCountdownByDuration(3)

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
      <Text style={[styles.text, remain ? styles.textLarge : styles.textSmall]} {...otherProps}>
        {remain || 'Mining'}
      </Text>
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
