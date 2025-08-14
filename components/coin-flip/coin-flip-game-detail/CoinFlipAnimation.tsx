import { CoinFlipHeadImage, CoinFlipTailImage } from '@/assets/images'
import { CoinSideEnum } from '@/types/coin-flip.type'
import { Image } from 'expo-image'
import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { View, ViewProps } from 'react-native'

type CoinFlipAnimationProps = ViewProps & {
  viewSize?: number
  result?: CoinSideEnum | null
  onFinish?: () => void
}

const FRAME_SIZE = 248 // Image size 248x248
const SPRITE_TOTAL_HEIGHT = 12648 // Image height
const DURATION = 2100 // 2.1s
const STEPS = 50 // steps(50)

const CoinFlipAnimation: FC<CoinFlipAnimationProps> = ({ viewSize = FRAME_SIZE, result, onFinish }) => {
  const finishFunRef = useRef<() => void>(undefined)
  const timerRef = useRef<number | null>(null)

  const [frame, setFrame] = useState(0)

  const spriteTotalHeight = useMemo(() => (SPRITE_TOTAL_HEIGHT * viewSize) / FRAME_SIZE, [viewSize])

  const imageSource = useMemo(() => (result === CoinSideEnum.Tails ? CoinFlipTailImage : CoinFlipHeadImage), [result])

  useEffect(() => {
    let currentStep = 0
    const interval = DURATION / STEPS

    timerRef.current = setInterval(() => {
      currentStep += 1
      if (currentStep >= STEPS) {
        setFrame(STEPS)
        finishFunRef.current?.()
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        setFrame(currentStep)
      }
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    finishFunRef.current = onFinish
  }, [onFinish])

  const translateY = Math.round(frame * -viewSize)

  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <View
        style={{
          width: viewSize,
          height: viewSize,
          overflow: 'hidden',
        }}
      >
        <Image
          source={imageSource}
          style={[
            {
              width: viewSize,
              height: spriteTotalHeight,
            },
            { transform: [{ translateY }] },
          ]}
          contentFit="contain"
        />
      </View>
    </View>
  )
}

export default memo(CoinFlipAnimation)
