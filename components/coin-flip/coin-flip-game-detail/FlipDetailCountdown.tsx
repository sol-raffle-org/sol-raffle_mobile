import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'

import { AppView } from '@/components/app-view'

const FlipDetailCountdown = ({
  countdown,
  text,
  textStyle,
}: {
  countdown: number | null
  text?: string
  textStyle?: StyleProp<TextStyle>
}) => {
  return (
    <AppView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {countdown && <Text style={[styles.text, styles.textLarge]}>{countdown}</Text>}

      {text && <Text style={[styles.text, styles.textSmall, textStyle]}>{text}</Text>}
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
