import { CoinHeadImage, CoinTailImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { VersusIcon } from '@/components/icons'
import { CoinSideEnum, FlipGameStatusEnum, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { isNil } from '@/utils/common.utils'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { getUniqueKey } from '../coin-flip-provider'
import ApproveCountdown from './ApproveCountdown'
import Confetti from './Confetti'
import FlipAnimation from './FlipAnimation'
import FlipCountdown from './FlipCountdown'

const Status = ({ gameData }: { gameData: PlayingFlipGameItem }) => {
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

  return (
    <AppView
      style={{
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {isPending && <VersusIcon color="#01FC7F99" />}

      {isWaitingReady && (
        <AppView style={styles.container}>
          <ApproveCountdown
            endTime={gameData?.endTime > 0 ? Math.floor(gameData.endTime / 1000) : 0}
            gameKey={getUniqueKey(gameData.gameId, gameData.userCreator.wallet)}
          />
          <AppText style={styles.text}>Waiting{'\n'}Approve</AppText>
        </AppView>
      )}

      {isMining && <FlipCountdown gameKey={getUniqueKey(gameData.gameId, gameData.userCreator.wallet)} />}

      {isAwarding && (
        <FlipAnimation
          result={gameData.result}
          displayResult={gameData.displayResult}
          gameKey={getUniqueKey(gameData.gameId, gameData.userCreator.wallet)}
        />
      )}

      {isFinished && (
        <AppImage
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
            borderWidth: 1,
            borderColor: '#FEF08A',
          }}
          source={gameData.result === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
        />
      )}

      {!isNil(gameData.displayResult) && <Confetti />}
    </AppView>
  )
}

export default Status

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#01FC7F99',
    textAlign: 'center',
  },
})
