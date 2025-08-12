import { CoinHeadImage, CoinTailImage, FlipDetailBackgroundImage } from '@/assets/images'
import IconCopyButton from '@/components/app-icon-copy-button'
import { AppImage } from '@/components/app-image'
import { CoinSideEnum, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { truncateHash } from '@/utils/common.utils'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { IconButton, Surface } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppItemText } from '../../app-item-text'
import { AppView } from '../../app-view'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export type CoinFlipGameDetailProps = {
  gameData: PlayingFlipGameItem
  visible: boolean
  isMyGame: boolean
  children?: React.ReactNode
  onDismiss: () => void
}

export const DialogBackdrop = ({ onDismiss }: Pick<CoinFlipGameDetailProps, 'onDismiss'>) => {
  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          opacity: 0.6,
        }}
      />
    </TouchableWithoutFeedback>
  )
}

interface DialogTitleProps extends Pick<CoinFlipGameDetailProps, 'onDismiss'> {
  gameId: number
}
export const DialogTitle = ({ gameId, onDismiss }: DialogTitleProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <IconButton icon="close" size={20} onPress={onDismiss} accessibilityLabel="Close dialog" />

      <AppItemText textType="subtitle" style={{ fontSize: 15, marginRight: 6 }}>
        Coinflip
      </AppItemText>

      <AppItemText textType="subtitle" color="#FFFFFF33">
        #{gameId}
      </AppItemText>
    </View>
  )
}

export const DialogSlideAnimated = ({ visible, children }: Pick<CoinFlipGameDetailProps, 'visible' | 'children'>) => {
  const sheetHeight = Math.min(SCREEN_HEIGHT * 0.75, 568)
  const anim = useRef(new Animated.Value(0)).current
  const insets = useSafeAreaInsets()

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [visible, anim])

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight, 0],
  })

  return (
    /* Sliding sheet */
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -insets.bottom,
        paddingBottom: insets.bottom,
        height: sheetHeight,
        transform: [{ translateY }],
        overflowY: 'auto',
        backgroundColor: '#0D0D0D',
      }}
    >
      <Surface
        style={{
          flex: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: 'hidden',
          elevation: 8,
          borderTopWidth: 1,
          borderTopColor: '#76d63733',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <AppImage
            source={FlipDetailBackgroundImage}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          {children}
        </KeyboardAvoidingView>
      </Surface>
    </Animated.View>
  )
}

export const GameInfo = ({ gameData }: { gameData: PlayingFlipGameItem }) => {
  const data = [
    {
      label: 'Server Seed:',
      displayValue: truncateHash(gameData.seed),
      value: gameData.seed,
    },
    {
      label: 'EOS Block:',
      displayValue: gameData.blockNumber ? gameData.blockNumber : 'Waiting',
      value: gameData.blockNumber ? gameData.blockNumber : 'Waiting',
    },
  ]
  return (
    <AppView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#0D0D0D',
      }}
    >
      {data.map((item, index) => (
        <AppView key={index} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 4 }}>
          <AppItemText textType="subtitle" color="#FFFFFF80">
            {item.label}
          </AppItemText>
          <AppItemText textType="subtitle" color="#FFFFFF33">
            {item.displayValue}
          </AppItemText>
          <IconCopyButton copyContent={item.value} />
        </AppView>
      ))}
    </AppView>
  )
}

export const CoinLoop = () => {
  const [coinType, setCoinType] = useState(CoinSideEnum.Heads)

  useEffect(() => {
    const interval = setInterval(() => {
      setCoinType((prev) => (prev === CoinSideEnum.Heads ? CoinSideEnum.Tails : CoinSideEnum.Heads))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <AppImage
      source={coinType === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
      style={{
        width: 164,
        height: 164,
      }}
    />
  )
}
