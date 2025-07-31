import { CoinHeadImage, CoinTailImage, FlipHeadGif, FlipTailGif } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { CoinSideEnum } from '@/types/coin-flip.type'
import React, { FC, useEffect, useState } from 'react'

const FlipAnimation: FC<FlipAnimationProps> = ({ result, setResult }) => {
  const [stopAnimation, setStopAnimation] = useState(false)

  useEffect(() => {
    setTimeout(
      () => {
        setStopAnimation(true)
        setResult(result)
      },
      result === 1 ? 2350 : 2200,
    )
  })
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

interface FlipAnimationProps {
  result: CoinSideEnum
  setResult: React.Dispatch<React.SetStateAction<CoinSideEnum | undefined>>
}
