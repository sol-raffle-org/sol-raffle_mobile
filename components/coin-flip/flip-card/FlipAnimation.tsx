import { CoinHeadImage, CoinTailImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { CoinSideEnum } from '@/types/coin-flip.type'
import { isNil } from 'lodash'
import React, { FC, useCallback, useEffect, useState } from 'react'
import CoinFlipAnimation from '../coin-flip-game-detail/CoinFlipAnimation'
import { useCoinFlipProvider } from '../coin-flip-provider'

interface FlipAnimationProps {
  result: CoinSideEnum | null
  displayResult?: CoinSideEnum | null // Detect to show animation or note
  gameKey: string
}

const FlipAnimation: FC<FlipAnimationProps> = ({ result, displayResult, gameKey }) => {
  const { updateAnimation, updateResult } = useCoinFlipProvider()

  const [stopAnimation, setStopAnimation] = useState(false)

  const handleFinishAnimation = useCallback(() => {
    updateAnimation(gameKey, false)
    updateResult(gameKey, result)
    setStopAnimation(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAnimation, updateResult])

  useEffect(() => {
    if (gameKey) {
      updateAnimation(gameKey, true)

      return () => {
        handleFinishAnimation()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameKey])

  return (
    <>
      {stopAnimation || !isNil(displayResult) ? (
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
