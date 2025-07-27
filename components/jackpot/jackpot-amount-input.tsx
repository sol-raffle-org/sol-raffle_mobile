import { SolanaLogo } from '@/assets/images'
import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { Button, TextInput, TextInputProps } from 'react-native-paper'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'
import { TrashIcon } from '../icons'

import { LinearGradient } from 'expo-linear-gradient'

type JackpotAmountInputProps = {
  label?: string
  value?: string
  balance?: number
  onChange?: (text: string) => void
} & TextInputProps

export function JackpotAmountInput({ value, balance, onChange }: JackpotAmountInputProps) {
  const [typingValue, setTypingValue] = useState(value || '')

  const handleClearClick = () => {
    setTypingValue('')
  }

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^0-9.,]/g, '')
    setTypingValue(filteredValue)
    if (onChange) onChange(filteredValue)
  }

  const handleBet = async () => {}

  return (
    <AppView>
      <View
        style={{
          gap: 8,
        }}
      >
        <AppItemText textType="title" style={{ color: '#FFFFFF80', textAlign: 'left', fontSize: 12 }}>
          Ballance: {balance || 0}
        </AppItemText>

        <TextInput
          mode="outlined"
          inputMode="decimal"
          value={typingValue}
          onChangeText={handleChange}
          placeholder="Bet amount..."
          style={{
            backgroundColor: 'transparent',
            paddingRight: 36,
          }}
          outlineStyle={{
            borderRadius: 10,
            borderColor: '#ffffff1a',
            borderWidth: 2,
          }}
          left={
            <TextInput.Icon
              style={{
                width: 28,
                height: 28,
                backgroundColor: '#000',
              }}
              icon={() => <AppImage source={SolanaLogo} style={{ width: 28, height: 28 }} />}
            />
          }
          right={
            <TextInput.Icon
              style={{
                width: 37,
                height: 30,
                borderRadius: 8,
                backgroundColor: '#FFFFFF1A',
              }}
              icon={() => <TrashIcon color="#FFFFFF66" />}
              onPress={handleClearClick}
            />
          }
        />
      </View>
      <PlaceBet onChangeValue={handleChange} onBetClick={handleBet} />
    </AppView>
  )
}

type PlaceBetProps = {
  onChangeValue: (value: string) => void
  onBetClick: () => void
}
const PlaceBet = ({ onChangeValue, onBetClick }: PlaceBetProps) => {
  const autoBetData = ['0.1', '0.5', '1']

  return (
    <AppView
      style={{
        flexDirection: 'row',
      }}
    >
      {autoBetData.map((item) => (
        <BetButton key={item} title={`+${item}`} onPress={() => onChangeValue(item)} />
      ))}

      <PlaceBetButton onPress={onBetClick} />
    </AppView>
  )
}

interface BetButtonProps {
  title?: string
  style?: ViewStyle
  contentStyle?: ViewStyle
  onPress: () => void
}
export function BetButton({ style, contentStyle, title, onPress }: BetButtonProps) {
  return (
    <Button
      dark
      mode="contained"
      onPress={onPress}
      style={[
        {
          backgroundColor: 'transparent',
          borderRadius: 10,
        },
        style,
      ]}
      contentStyle={[
        {
          backgroundColor: '#FFFFFF1F',
          borderRadius: 10,
        },
        contentStyle,
      ]}
    >
      <AppItemText style={{ color: '#fff' }}>{title}</AppItemText>
    </Button>
  )
}

export function PlaceBetButton({
  title = 'Place Bet',
  style,
  onPress,
}: {
  title?: string
  style?: ViewStyle
  onPress: () => void
}) {
  const borderRadius = 8

  return (
    <LinearGradient
      colors={['rgba(255, 255, 255)', 'rgba(255, 255, 255, 0.68)', 'rgba(255, 255, 255, 0.5)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        borderRadius: 10,
        padding: 2,
        ...style,
      }}
    >
      <LinearGradient
        colors={['#B7CA49', '#508031']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          borderRadius: borderRadius,
        }}
      >
        <Button
          dark
          mode="contained"
          onPress={onPress}
          style={{
            backgroundColor: 'transparent',
            borderRadius: borderRadius,
          }}
        >
          <AppItemText style={{ color: '#fff' }}>{title}</AppItemText>
        </Button>
      </LinearGradient>
    </LinearGradient>
  )
}
