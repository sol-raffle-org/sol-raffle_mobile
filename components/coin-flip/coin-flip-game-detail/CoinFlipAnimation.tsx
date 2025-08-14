import { CoinFlipHeadImage } from '@/assets/images'
import { Image, ImageProps } from 'expo-image'
import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { View, ViewProps } from 'react-native'

type CoinFlipAnimationProps = ViewProps & {
  imageSource?: ImageProps
  viewSize?: number
  onFinish?: () => void
}

const FRAME_SIZE = 248 // Image size 248x248
const SPRITE_TOTAL_HEIGHT = 12648 // Image height
const DURATION = 2000 // 2s
const STEPS = 50 // steps(50)

const CoinFlipAnimation: FC<CoinFlipAnimationProps> = ({
  imageSource = CoinFlipHeadImage,
  viewSize = FRAME_SIZE,
  onFinish,
}) => {
  const [frame, setFrame] = useState(0)
  const timerRef = useRef<number | null>(null)

  const [spriteTotalHeight] = useMemo(() => {
    const ratio = viewSize / FRAME_SIZE

    return [SPRITE_TOTAL_HEIGHT].map((item) => item * ratio)
  }, [viewSize])

  useEffect(() => {
    let currentStep = 0
    const interval = DURATION / STEPS

    timerRef.current = setInterval(() => {
      currentStep += 1
      if (currentStep >= STEPS) {
        setFrame(STEPS)
        if (timerRef.current) clearInterval(timerRef.current)
        onFinish?.()
      } else {
        setFrame(currentStep)
      }
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [onFinish])

  const translateY = Math.round(frame * -viewSize)

  console.log({
    translateY,
  })

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
