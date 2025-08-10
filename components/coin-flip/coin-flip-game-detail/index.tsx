import { CoinHeadImage, CoinTailImage, SolanaLogo } from '@/assets/images'
import { CoinSideEnum, FlipGameInterface, FlipGameStatusEnum, FlipPlayerInterface } from '@/types/coin-flip.type'
import { isNil } from 'lodash'
import React, { Dispatch, Fragment, SetStateAction, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { AppImage } from '../../app-image'
import { AppItemText } from '../../app-item-text'
import { AppRankingAvatar } from '../../app-ranking-avatar'
import { AppView } from '../../app-view'
import Confetti from '../flip-card/Confetti'
import Status from '../flip-card/Status'
import { CallBotButton } from '../my-game'
import { JoinGameButton } from '../other-games'
import {
  CoinFlipGameDetailProps,
  CoinLoop,
  DialogBackdrop,
  DialogSlideAnimated,
  DialogTitle,
  GameInfo,
} from './components'
import FlipDetailCountdown from './FlipDetailCountdown'

export default function CoinFlipGameDetail({
  visible,
  isMyGame,
  gameData,
  onDismiss,
  setResult,
}: CoinFlipGameDetailProps) {
  const [gameResult, setGameResult] = useState<undefined | CoinSideEnum>(undefined)

  const handleResult: Dispatch<SetStateAction<CoinSideEnum | undefined>> = (value) => {
    setGameResult(value as CoinSideEnum | undefined)
    setResult(value as CoinSideEnum | undefined)
  }

  const [isRenderCallBot, isRenderJoinGame] = useMemo(() => {
    return [Boolean(isMyGame && !gameData.userJoin), Boolean(!isMyGame && !gameData.userJoin)]
  }, [gameData, isMyGame])

  if (!gameData?.gameId) return null
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ flex: 1 }}>
        {/* Backdrop */}
        <DialogBackdrop onDismiss={onDismiss} />

        <DialogSlideAnimated visible={visible}>
          {/* Title row */}
          <DialogTitle gameId={gameData.gameId} onDismiss={onDismiss} />

          {/* Content */}
          <AppView
            style={{
              flex: 1,
            }}
          >
            {!isNil(gameResult) ? <Confetti /> : <Fragment />}

            <GameStatusAnimation gameData={gameData} />
            <GameValue gameValue={gameData.gameValue} />

            <AppView style={{ width: '100%', flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <PlayerInfo user={gameData.userCreator} coinSide={gameData.creatorChoice} />
              </View>

              <Status gameData={gameData} setResult={handleResult} />

              <View style={{ flex: 1, justifyContent: 'center' }}>
                {gameData.userJoin && (
                  <PlayerInfo
                    user={gameData.userJoin}
                    coinSide={gameData.creatorChoice === CoinSideEnum.Heads ? CoinSideEnum.Tails : CoinSideEnum.Heads}
                  />
                )}
                <View style={{ alignSelf: 'center' }}>
                  {isRenderCallBot && <CallBotButton gameId={gameData.gameId} />}
                  {isRenderJoinGame && <JoinGameButton gameData={gameData} />}
                </View>
              </View>
            </AppView>
          </AppView>

          <GameInfo gameData={gameData} />
        </DialogSlideAnimated>
      </Modal>
    </Portal>
  )
}

const GameStatusAnimation = ({ gameData }: { gameData: FlipGameInterface }) => {
  const [isPending, isMining, isOtherCase] = useMemo(() => {
    const isPending = [
      FlipGameStatusEnum.Playing,
      FlipGameStatusEnum.Created,
      FlipGameStatusEnum.WaitingReady,
    ].includes(gameData.status)
    return [
      isPending,
      gameData.status === FlipGameStatusEnum.Mining,
      !isPending && gameData.status !== FlipGameStatusEnum.Mining,
    ]
  }, [gameData])

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
        {isMining && <FlipDetailCountdown />}
        {isOtherCase && (
          <AppImage
            source={gameData.creatorChoice === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
            style={{
              width: 164,
              height: 164,
            }}
          />
        )}
      </AppView>
    </AppView>
  )
}

const GameValue = ({ gameValue }: { gameValue: number }) => {
  return (
    <AppView style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <AppView
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 42,
          borderWidth: 1,

          backgroundColor: '#2E3C36',
          borderColor: '#FFFFFF17',
        }}
      >
        <AppImage source={SolanaLogo} style={{ width: 20, height: 20 }} />
        <AppItemText style={{ fontSize: 16 }}>{gameValue}</AppItemText>
      </AppView>
    </AppView>
  )
}

interface PlayerInfoProps {
  user: FlipPlayerInterface
  coinSide: CoinSideEnum
}
const PlayerInfo = ({ user, coinSide }: PlayerInfoProps) => {
  return (
    <AppView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AppRankingAvatar avatar={user.avatar} level={user.level} size="large">
        <AppImage
          source={coinSide === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
          style={{
            position: 'absolute',
            top: 0.5 * (38 - 64),
            right: 0.4 * (38 - 64),
            width: 38,
            height: 38,
          }}
        />
      </AppRankingAvatar>

      <AppItemText textType="subtitle" style={{ fontSize: 15 }}>
        {user.name}
      </AppItemText>
    </AppView>
  )
}
