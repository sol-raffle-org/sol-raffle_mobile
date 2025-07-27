import { CoinHeadImage, CoinTailImage, SolanaLogo } from '@/assets/images'
import React, { useState } from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { AppButton } from '../app-button'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView } from '../app-view'

export function CoinFlipCreateGame() {
  const [typingValue, setTypingValue] = useState('')

  const handleChange = (text: string) => {
    const filteredValue = text.replace(/[^0-9.,]/g, '')
    setTypingValue(filteredValue)
  }

  return (
    <AppView
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#76D63733',
        borderRadius: 4,
        padding: 16,
        gap: 8,
      }}
    >
      <CoinFlipAmount value={typingValue} onChange={handleChange} />
      <AppItemText
        textType="subtitle"
        style={{
          fontSize: 12,
          color: '#FFFFFF66',
        }}
      >
        Balance: 345.44 SOL
      </AppItemText>

      <CoinFlipSide value={typingValue} />
    </AppView>
  )
}

interface CoinFlipAmountProps {
  value: string
  onChange: (text: string) => void
}
const CoinFlipAmount = ({ value, onChange }: CoinFlipAmountProps) => {
  const autoBetData = ['0.1', '1']

  return (
    <AppView
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
      }}
    >
      <TextInput
        mode="outlined"
        inputMode="decimal"
        value={value}
        onChangeText={onChange}
        placeholder="Bet amount..."
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF1A',
          paddingRight: 36,
          height: 40,
        }}
        outlineStyle={{
          borderRadius: 2,
          borderColor: 'transparent',
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
      />

      {autoBetData.map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          style={({ pressed }) => [
            {
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: pressed ? '#FFFFFF33' : '#FFFFFF1A',
              justifyContent: 'center',
              alignItems: 'center',
            } as StyleProp<ViewStyle>,
          ]}
        >
          <AppItemText style={{ color: '#fff' }}>{`+${item}`}</AppItemText>
        </Pressable>
      ))}
    </AppView>
  )
}

const SIDE_IMAGE = [CoinHeadImage, CoinTailImage]
interface CoinFlipSideProps {
  value: string
}
const CoinFlipSide = ({ value }: CoinFlipSideProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleCreateGame = () => {
    console.log('Create game with -- ' + value)
  }

  return (
    <AppView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <AppItemText>Side</AppItemText>
        {SIDE_IMAGE.map((imageSource, index) => (
          <IconButton
            key={index}
            icon={() => (
              <AppImage
                source={imageSource}
                style={[
                  { width: 40, height: 40, opacity: 0.5 },
                  selectedIndex === index && {
                    opacity: 1,
                  },
                ]}
              />
            )}
            onPress={() => setSelectedIndex(index)}
          />
        ))}
      </View>

      <AppButton
        variant="contained"
        style={{
          width: 105,
          height: 40,
        }}
        disabled={!Boolean(value)}
        onPress={handleCreateGame}
      >
        <AppItemText>Create Game</AppItemText>
      </AppButton>
    </AppView>
  )
}
