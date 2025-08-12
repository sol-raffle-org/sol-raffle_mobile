import { CoinHeadImage, CoinTailImage, FlipHeadGif, FlipTailGif } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { CoinSideEnum } from '@/types/coin-flip.type'
import React, { FC, useEffect, useState } from 'react'
import { useCoinFlipProvider } from '../coin-flip-provider'

interface FlipAnimationProps {
  result: CoinSideEnum
  gameId: number
}

const FlipAnimation: FC<FlipAnimationProps> = ({ result, gameId }) => {
  const { updateAnimation, updateResult } = useCoinFlipProvider()

  const [stopAnimation, setStopAnimation] = useState(false)

  useEffect(() => {
    if (gameId) {
      updateAnimation(gameId, true)
      setTimeout(
        () => {
          setStopAnimation(true)
          updateAnimation(gameId, false)
          updateResult(gameId, result)
        },
        result === 1 ? 2350 : 2200,
      )

      return () => {
        updateAnimation(gameId, false)
        updateResult(gameId, result)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  return (
    <>
      {stopAnimation ? (
        <AppImage
          source={result === CoinSideEnum.Tails ? CoinTailImage : CoinHeadImage}
          style={{ width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: '#FAB40F' }}
        />
      ) : (
        <AppImage
          source={result === CoinSideEnum.Tails ? FlipTailGif : FlipHeadGif}
          style={{ width: 100, height: 100 }}
        />
      )}
    </>
  )
}

export default FlipAnimation
