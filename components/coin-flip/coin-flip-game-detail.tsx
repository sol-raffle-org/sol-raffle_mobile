import { CoinHeadImage, CoinTailImage, SolanaLogo } from '@/assets/images'
import { CoinSideEnum, FlipGameInterface, FlipPlayerInterface } from '@/types/coin-flip.type'
import { truncateHash } from '@/utils/common.utils'
import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { IconButton, Modal, Portal, Surface } from 'react-native-paper'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppRankingAvatar } from '../app-ranking-avatar'
import { AppView } from '../app-view'
import Status from './flip-card/Status'
import { CallBotButton } from './my-game'
import { JoinGameButton } from './other-games'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type CoinFlipGameDetailProps = {
  gameData: FlipGameInterface
  visible: boolean
  isMyGame: boolean
  children?: React.ReactNode
  onDismiss: () => void
  setResult: React.Dispatch<React.SetStateAction<CoinSideEnum | undefined>>
}
export default function CoinFlipGameDetail({
  visible,
  isMyGame,
  gameData,
  onDismiss,
  setResult,
}: CoinFlipGameDetailProps) {
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
            <GameStatusAnimation gameData={gameData} />
            <GameValue gameValue={gameData.gameValue} />

            <AppView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <DialogUserInfo user={gameData.userCreator} coinSide={gameData.creatorChoice} />

              <Status gameData={gameData} setResult={setResult} />

              {gameData.userJoin && (
                <DialogUserInfo
                  user={gameData.userJoin}
                  coinSide={gameData.creatorChoice === CoinSideEnum.Heads ? CoinSideEnum.Tails : CoinSideEnum.Heads}
                />
              )}
              {isRenderCallBot && <CallBotButton gameId={gameData.gameId} />}
              {isRenderJoinGame && <JoinGameButton gameData={gameData} />}
            </AppView>
          </AppView>

          <GameInfo gameData={gameData} />
        </DialogSlideAnimated>
      </Modal>
    </Portal>
  )
}

const GameInfo = ({ gameData }: { gameData: FlipGameInterface }) => {
  const data = [
    {
      label: 'Server Seed:',
      value: truncateHash(gameData.seed),
    },
    {
      label: 'EOS Block:',
      value: gameData.blockNumber ? truncateHash(gameData.blockNumber) : 'Waiting',
    },
  ]
  return (
    <AppView
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 }}
    >
      {data.map((item, index) => (
        <AppView key={index} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 4 }}>
          <AppItemText textType="subtitle" color="#FFFFFF80">
            {item.label}
          </AppItemText>
          <AppItemText textType="subtitle" color="#FFFFFF33">
            {item.value}
          </AppItemText>
        </AppView>
      ))}
    </AppView>
  )
}

const GameStatusAnimation = ({ gameData }: { gameData: FlipGameInterface }) => {
  return (
    <AppView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppImage
        source={gameData.creatorChoice === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
        style={{
          width: 164,
          height: 164,
        }}
      />
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

interface DialogUserInfoProps {
  user: FlipPlayerInterface
  coinSide: CoinSideEnum
}
const DialogUserInfo = ({ user, coinSide }: DialogUserInfoProps) => {
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

const DialogBackdrop = ({ onDismiss }: Pick<CoinFlipGameDetailProps, 'onDismiss'>) => {
  const anim = useRef(new Animated.Value(0)).current
  const backdropOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  })

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          opacity: backdropOpacity,
        }}
      />
    </TouchableWithoutFeedback>
  )
}

interface DialogTitleProps extends Pick<CoinFlipGameDetailProps, 'onDismiss'> {
  gameId: number
}
const DialogTitle = ({ gameId, onDismiss }: DialogTitleProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <IconButton icon="close" size={20} onPress={onDismiss} accessibilityLabel="Close dialog" />

      <AppItemText textType="subtitle" style={{ fontSize: 15, marginRight: 6 }}>
        Coinflip
      </AppItemText>

      <AppItemText textType="subtitle" color="#FFFFFF33">
        #{gameId}
      </AppItemText>
    </View>
  )
}

const DialogSlideAnimated = ({ visible, children }: Pick<CoinFlipGameDetailProps, 'visible' | 'children'>) => {
  const sheetHeight = SCREEN_HEIGHT * 0.75
  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [visible, anim])

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight, 0],
  })

  return (
    /* Sliding sheet */
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: sheetHeight,
        transform: [{ translateY }],
      }}
    >
      <Surface
        style={{
          flex: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#000',
          elevation: 8,
          borderTopWidth: 1,
          borderTopColor: '#76d63733',
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          {children}
        </KeyboardAvoidingView>
      </Surface>
    </Animated.View>
  )
}
