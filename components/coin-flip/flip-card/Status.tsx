import { CoinHeadImage, CoinTailImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { VersusIcon } from '@/components/icons'
import { CoinSideEnum, FlipGameStatusEnum, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { isNil } from '@/utils/common.utils'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import ApproveCountdown from './ApproveCountdown'
import FlipAnimation from './FlipAnimation'
import FlipCountdown from './FlipCountdown'

const Status = ({ gameData }: { gameData: PlayingFlipGameItem }) => {
  const isShowVersusIcon = useMemo(() => {
    return [FlipGameStatusEnum.Playing, FlipGameStatusEnum.Created].includes(gameData.status)
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
      {isShowVersusIcon && <VersusIcon color="#01FC7F99" />}

      {gameData.status === FlipGameStatusEnum.Awarding && !isNil(gameData.result) && (
        <FlipAnimation result={gameData.result} gameId={gameData.gameId} />
      )}

      {gameData.status === FlipGameStatusEnum.WaitingReady && (
        <AppView style={styles.container}>
          <ApproveCountdown
            endTime={gameData?.endTime > 0 ? Math.floor(gameData.endTime / 1000) : 0}
            gameId={gameData.gameId}
          />
          <AppText style={styles.text}>Waiting{'\n'}Approve</AppText>
        </AppView>
      )}

      {gameData.status === FlipGameStatusEnum.Finished && (
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

      {gameData.status === FlipGameStatusEnum.Mining && <FlipCountdown gameId={gameData.gameId} />}
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
