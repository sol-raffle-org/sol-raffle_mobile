import React from 'react'
import { View } from 'react-native'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'
import { JackpotAmountInput } from './jackpot-amount-input'

export function JackpotSlotMachineAction() {
  const data = [
    {
      title: 'Your Wager',
      value: 0.001,
    },
    {
      title: 'Your Chance',
      value: `${0.2} %`,
    },
  ]

  return (
    <AppView
      style={{
        borderWidth: 1,
        borderColor: '#76D63733',
        borderRadius: 4,
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 32,
        }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <AppItemText
              style={{
                color: '#FFFFFF80',
              }}
            >
              {item.title}
            </AppItemText>
            <AppItemText style={{ fontSize: 16 }}>{item.value}</AppItemText>
          </View>
        ))}
      </View>

      <JackpotAmountInput />
    </AppView>
  )
}
