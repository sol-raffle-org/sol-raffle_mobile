import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { AppView } from '@/components/app-view'
import { useCountdownByDuration } from '@/hooks/common/useCountdown'

const FlipDetailCountdown = ({ ...otherProps }) => {
  const remain = useCountdownByDuration(3)

  return (
    <AppView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={[styles.text, remain ? styles.textLarge : styles.textSmall]} {...otherProps}>
        {remain || 'Mining'}
      </Text>
    </AppView>
  )
}

export default FlipDetailCountdown

const styles = StyleSheet.create({
  text: {
    fontFamily: 'JerseyRegular',
    fontWeight: 400,
    color: '#01FC7F99',
    textTransform: 'uppercase',
  },
  textLarge: {
    fontSize: 100,
  },
  textSmall: {
    fontSize: 50,
  },
})
