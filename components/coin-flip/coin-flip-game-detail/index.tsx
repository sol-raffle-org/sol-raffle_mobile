import { CoinHeadImage, CoinTailImage, SolanaLogo } from '@/assets/images'
import { VersusIcon } from '@/components/icons'
import { CoinSideEnum, FlipPlayerInterface } from '@/types/coin-flip.type'
import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { AppImage } from '../../app-image'
import { AppItemText } from '../../app-item-text'
import { AppRankingAvatar } from '../../app-ranking-avatar'
import { AppView } from '../../app-view'
import { CallBotButton } from '../my-game'
import { JoinGameButton } from '../other-games'
import { CoinFlipGameDetailProps, DialogBackdrop, DialogSlideAnimated, DialogTitle, GameInfo } from './components'
import GameStatusAnimation from './GameStatusAnimation'

const CoinFlipGameDetail = ({ visible, isMyGame, gameData, onDismiss }: CoinFlipGameDetailProps) => {
  const [isRenderCallBot, isRenderJoinGame] = useMemo(() => {
    return [Boolean(isMyGame && !gameData.userJoin), Boolean(!isMyGame && !gameData.userJoin)]
  }, [gameData, isMyGame])

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
            <GameStatusAnimation gameData={gameData} />

            <GameValue gameValue={gameData.gameValue} />

            <AppView style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <PlayerInfo
                  user={gameData.userCreator}
                  coinSide={gameData.creatorChoice}
                  isLoser={gameData.isCreatorLose}
                />
              </View>

              <VersusIcon
                color="#01FC7F99"
                style={{
                  width: 47,
                  height: 47,
                }}
              />

              <View style={{ flex: 1, justifyContent: 'center' }}>
                {gameData.userJoin && (
                  <PlayerInfo
                    user={gameData.userJoin}
                    coinSide={gameData.creatorChoice === CoinSideEnum.Heads ? CoinSideEnum.Tails : CoinSideEnum.Heads}
                    isLoser={gameData.isOtherLose}
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

export default memo(CoinFlipGameDetail)

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
  isLoser?: boolean
}
const PlayerInfo = ({ user, coinSide, isLoser }: PlayerInfoProps) => {
  return (
    <AppView
      style={[
        {
          flexDirection: 'column',
          alignItems: 'center',
        },
        isLoser && {
          opacity: 0.4,
        },
      ]}
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
