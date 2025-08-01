import React, { FC } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

import { AppView } from '@/components/app-view'
import { useCountdownByTimestamp } from '@/hooks/common/useCountdown'

interface ApproveCountdownProps extends TextProps {
  endTime: number
}

const ApproveCountdown: FC<ApproveCountdownProps> = ({ endTime, ...otherProps }) => {
  const remain = useCountdownByTimestamp(endTime)

  const isCounting = Boolean(remain)

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
      <Text style={[styles.text, isCounting ? styles.textLarge : styles.textSmall]} {...otherProps}>
        {remain || 'Ready'}
      </Text>
    </AppView>
  )
}

export default ApproveCountdown

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countingContainer: {
    backgroundColor: 'black',
  },
  text: {
    fontWeight: 'bold',
    color: '#01FC7F99',
    textTransform: 'uppercase',
  },
  textLarge: {
    fontSize: 14,
  },
  textSmall: {
    fontSize: 12,
  },
})
