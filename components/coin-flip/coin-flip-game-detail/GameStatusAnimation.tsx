import { CoinHeadImage, CoinTailImage, FlipHeadGif, FlipTailGif } from '@/assets/images'
import { CoinSideEnum, FlipGameStatusEnum, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { isNil } from 'lodash'
import React, { memo, useMemo } from 'react'
import { AppImage } from '../../app-image'
import { AppView } from '../../app-view'
import Confetti from '../flip-card/Confetti'
import { CoinLoop } from './components'
import FlipDetailCountdown from './FlipDetailCountdown'

const GameStatusAnimation = ({ gameData }: { gameData: PlayingFlipGameItem }) => {
  const [isPending, isWaitingReady, isMining, isAwarding, isFinished] = useMemo(() => {
    const isPending = [FlipGameStatusEnum.Playing, FlipGameStatusEnum.Created].includes(gameData.status)

    return [
      isPending,
      gameData.status === FlipGameStatusEnum.WaitingReady,
      gameData.status === FlipGameStatusEnum.Mining,
      !isNil(gameData.result) && gameData.status === FlipGameStatusEnum.Awarding,
      gameData.status === FlipGameStatusEnum.Finished,
    ]
  }, [gameData])

  console.log({
    countdown: gameData.countdown,
    result: gameData.result,
    displayResult: gameData.displayResult,
    status: gameData.status,
    isPending,
    isWaitingReady,
    isMining,
    isAwarding,
    isFinished,
  })

  return (
    <AppView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppView
        style={{
          width: 210,
          height: 210,
          borderRadius: 110,
          backgroundColor: '#FFFFFF1A',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPending && <CoinLoop />}

        {isWaitingReady && (
          <FlipDetailCountdown
            countdown={gameData.countdown || null}
            text={`Waiting \n Approve`}
            textStyle={{
              fontSize: 15,
            }}
          />
        )}

        {isMining && (
          <FlipDetailCountdown
            countdown={gameData.countdown || null}
            text={gameData.countdown ? undefined : 'Mining'}
          />
        )}

        {isAwarding && (
          <AppImage
            source={gameData.result === CoinSideEnum.Tails ? FlipTailGif : FlipHeadGif}
            style={{ width: 164, height: 164 }}
          />
        )}

        {isFinished && (
          <AppImage
            source={gameData.creatorChoice === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
            style={{
              width: 164,
              height: 164,
            }}
          />
        )}

        {!isNil(gameData.result) && <Confetti />}
      </AppView>
    </AppView>
  )
}

export default memo(GameStatusAnimation)
