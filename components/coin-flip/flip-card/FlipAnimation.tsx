import { CoinHeadImage, CoinTailImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { CoinSideEnum } from '@/types/coin-flip.type'
import React, { FC, useCallback, useEffect, useState } from 'react'
import CoinFlipAnimation from '../coin-flip-game-detail/CoinFlipAnimation'
import { useCoinFlipProvider } from '../coin-flip-provider'

interface FlipAnimationProps {
  result: CoinSideEnum
  key: string
}

const FlipAnimation: FC<FlipAnimationProps> = ({ result, key }) => {
  const { updateAnimation, updateResult } = useCoinFlipProvider()

  const [stopAnimation, setStopAnimation] = useState(false)

  const handleFinishAnimation = useCallback(() => {
    updateAnimation(key, false)
    updateResult(key, result)
    setStopAnimation(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAnimation, updateResult])

  useEffect(() => {
    if (key) {
      updateAnimation(key, true)

      return () => {
        handleFinishAnimation()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return (
    <>
      {stopAnimation ? (
        <AppImage
          source={result === CoinSideEnum.Tails ? CoinTailImage : CoinHeadImage}
          style={{ width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: '#FAB40F' }}
        />
      ) : (
        <CoinFlipAnimation result={result} viewSize={100} onFinish={handleFinishAnimation} />
      )}
    </>
  )
}

export default FlipAnimation
