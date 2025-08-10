'use client'

import { useEffect, useState } from 'react'

import { COIN_FLIP, JACKPOT } from '@/constants/path.const'
import { FlipGameInterface } from '@/types/coin-flip.type'
import { Socket, io } from 'socket.io-client'
import { updateFlipGameData } from './helper'

import {
  GameStatusUpdateInterface,
  JackpotGameDataInterface,
  JackpotGameStatus,
  JackpotWinnerItemInterface,
  JackpotWinnerListInterface,
  PlayerBetInterface,
} from '@/types/jackpot.type'

import { Audio } from 'expo-av'

import { KEY_TOKEN } from '@/constants/app.const'

// import soundCoolDown from '@/assets/sounds/sound-cooldown.mp3'
// import soundNewEntry from '@/assets/sounds/sound-new-entry.mp3'
// import soundPlaying from '@/assets/sounds/sound-playing.mp3'
// import soundPump from '@/assets/sounds/sound-pump.mp3'
// import soundSpinning from '@/assets/sounds/sound-spinning.mp3'
// import soundWinning from '@/assets/sounds/sound-winning.mp3'
import { useToast } from '@/components/toast/app-toast-provider'
import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import useJackpotStore from '@/stores/useJackpotStore'
import { SOCKET_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usePathname } from 'expo-router'
import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'

const RaffleSocketProvider = () => {
  const socketUrl = SOCKET_URL || ''

  const pathname = usePathname()
  const { t } = useTranslation()
  const { showToast } = useToast()

  const { accountInfo, soundOn, isEmitAuthenticate, setAppSocket, setIsEmitAuthenticate } = useAppStore()
  const { jackpotGameData, setWinnerList, setJackpotGameData, setIsBettingJackpot } = useJackpotStore()
  const { flipGamesTable, setFlipGamesTable } = useCoinFlipStore()
  const [raffleSocket, setRaffleSocket] = useState<Socket | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isAwarding, setIsAwarding] = useState(false)

  const [hasNewEntry, setHasNewEntry] = useState(false)
  const [isBetSuccess, setIsBetSuccess] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>()

  useEffect(() => {
    AsyncStorage.getItem(KEY_TOKEN).then((token) => setAuthToken(token))
  }, [socketUrl, pathname])

  const handleEventJackpot = () => {
    if (!raffleSocket) return

    raffleSocket.on('level-up', (levelUpData: any) => {
      if (levelUpData) {
        showToast({
          type: 'level-up',
          title: `Level up! ${levelUpData.upToLevel}`,
          subtitle: `${levelUpData.exp || 0}/${levelUpData.nextLevelExp || 0}`,
        })
      }
    })

    raffleSocket.on('server-message', (data: any) => {
      if (data?.success === true) {
        showToast({
          type: 'success',
          subtitle: data?.message,
        })
      }

      if (data?.success === false) {
        showToast({
          type: 'error',
          subtitle: data?.message,
        })
      }
    })

    raffleSocket.on('jp-game-data', (jackpotGameData: JackpotGameDataInterface) => {
      setJackpotGameData(jackpotGameData)
      if (jackpotGameData.status === JackpotGameStatus.Playing) {
        setIsPlaying(true)
      }
      if (jackpotGameData.status === JackpotGameStatus.Awarding) {
        setIsAwarding(true)
      }
    })
  }

  const handleEventCoinFlip = () => {
    if (!raffleSocket) return

    raffleSocket.on('fl-game-data', (flipGameData: FlipGameInterface[]) => {
      setFlipGamesTable(flipGameData)
    })
  }

  const handlePlaySound = async (soundFile: any) => {
    const { sound } = await Audio.Sound.createAsync(soundFile)
    await sound.playAsync()
    // Optional: unload to free memory
    sound.unloadAsync()
  }

  useEffect(() => {
    if (!socketUrl) return

    const socket = io(socketUrl)

    setRaffleSocket(socket)
    setAppSocket(socket)
  }, [socketUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSocketConnected(raffleSocket?.connected || false)
  }, [raffleSocket, raffleSocket?.connected])

  useEffect(() => {
    if (!raffleSocket) return

    if (!raffleSocket.connected || !socketConnected) {
      raffleSocket.connect()
    }

    // Request win data
    raffleSocket.emit('notify-win-data')

    if (pathname === JACKPOT) {
      raffleSocket.emit('jp-join-room')
      raffleSocket.emit('jp-game-data')
    }

    if (pathname === COIN_FLIP) {
      raffleSocket.emit('fl-join-room')
      raffleSocket.emit('fl-game-data')
    }

    handleEventJackpot()
    handleEventCoinFlip()
  }, [raffleSocket, pathname, socketConnected]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!raffleSocket) return

    let socketWinnerList: JackpotWinnerListInterface = { data: [] }

    raffleSocket.on('notify-win-data', (winnerList?: JackpotWinnerListInterface) => {
      // Sort desc (newest to oldest)
      socketWinnerList = {
        data: Array.isArray(winnerList?.data) ? orderBy(winnerList.data, ['createdAt'], ['desc']) : [],
      }

      setWinnerList(socketWinnerList)
    })

    raffleSocket.on('notify-win-update', (newWinner: JackpotWinnerItemInterface) => {
      if (!socketWinnerList?.data?.length) {
        setWinnerList({ data: [newWinner] })
      } else {
        const newList = [newWinner, ...socketWinnerList.data]

        // Remove last item if maximum size
        if (newList.length > 20) {
          newList.pop()
        }
        socketWinnerList = { data: newList }
        setWinnerList(socketWinnerList)
      }
    })
  }, [raffleSocket]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pathname !== JACKPOT && raffleSocket && raffleSocket.connected) {
      raffleSocket.emit('jp-leave-room')

      raffleSocket.off('level-up')
      raffleSocket.off('server-message')
      raffleSocket.off('jp-status-update')
      raffleSocket.off('jp-player-bet')
      raffleSocket.off('jp-game-data')
    }

    if (pathname !== COIN_FLIP && raffleSocket && raffleSocket.connected) {
      raffleSocket.emit('fl-leave-room')
      raffleSocket.off('fl-create-table')
      raffleSocket.off('fl-sitdown-table')
      raffleSocket.off('fl-kick-user')
      raffleSocket.off('fl-approved-join-table')
      raffleSocket.off('fl-start-game')
      raffleSocket.off('fl-finish-game')
    }
  }, [raffleSocket, pathname])

  useEffect(() => {
    if (!raffleSocket || !accountInfo || !authToken || !socketConnected || isEmitAuthenticate) return
    setIsEmitAuthenticate(true)
    raffleSocket.emit('authenticate', { token: authToken })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raffleSocket, accountInfo, authToken, socketConnected, isEmitAuthenticate])

  useEffect(() => {
    if (!raffleSocket || !jackpotGameData) return

    raffleSocket.on('jp-status-update', (gameStatus: GameStatusUpdateInterface) => {
      if (gameStatus.status === JackpotGameStatus.Pending) {
        const newData = {
          ...gameStatus,
          bets: [],
          winner: null,
        }
        setJackpotGameData(newData as JackpotGameDataInterface)
      } else {
        if (gameStatus.status === JackpotGameStatus.Playing) {
          setIsPlaying(true)
        }
        if (gameStatus.status === JackpotGameStatus.Awarding) {
          setIsAwarding(true)
        }
        const newData = {
          ...jackpotGameData,
          ...gameStatus,
        }
        setJackpotGameData(newData as JackpotGameDataInterface)
      }
    })

    raffleSocket.on('jp-player-bet', (betInfo: PlayerBetInterface) => {
      setHasNewEntry(true)

      if (!jackpotGameData?.bets) {
        const newData = {
          ...jackpotGameData,
          bets: [betInfo],
        } as JackpotGameDataInterface
        setJackpotGameData(newData)
      } else {
        const newData = {
          ...jackpotGameData,
          bets: [betInfo, ...jackpotGameData.bets],
        } as JackpotGameDataInterface
        setJackpotGameData(newData)
      }

      if (betInfo.userInfo.wallet === accountInfo?.wallet && !isBetSuccess) {
        setIsBetSuccess(true)
        setIsBettingJackpot(false)
        showToast({
          type: 'success',
          subtitle: t('msgBetSuccessfully'),
        })
      }
    })
  }, [raffleSocket, jackpotGameData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!raffleSocket) return

    raffleSocket.on('fl-create-table', (newGameData: FlipGameInterface) => {
      const newData = updateFlipGameData(flipGamesTable, newGameData)
      setFlipGamesTable(newData)
    })

    if (!flipGamesTable?.length) return

    raffleSocket.on('fl-sitdown-table', (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data)
      setFlipGamesTable(newData)
    })

    raffleSocket.on('fl-kick-user', (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data, true)
      setFlipGamesTable(newData)
    })

    raffleSocket.on('fl-approved-join-table', (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data)
      setFlipGamesTable(newData)
    })

    raffleSocket.on('fl-start-game', (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data)
      setFlipGamesTable(newData)
    })

    raffleSocket.on('fl-finish-game', (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data)

      setFlipGamesTable(newData)
    })
  }, [raffleSocket, flipGamesTable]) // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (!hasNewEntry || pathname !== ROOT || !soundOn) return

  //   handlePlaySound(soundNewEntry)

  //   setTimeout(() => setHasNewEntry(false), 1000)
  // }, [hasNewEntry, pathname, soundOn])

  // useEffect(() => {
  //   if (!isPlaying || pathname !== ROOT || !soundOn) return

  //   handlePlaySound(soundPlaying)

  //   setTimeout(() => setIsPlaying(false), 1000)
  // }, [isPlaying, pathname, soundOn])

  // useEffect(() => {
  //   if (!isAwarding || pathname !== ROOT || !soundOn) return

  //   handlePlaySound(soundPump)

  //   setTimeout(() => setIsAwarding(false), 1000)
  // }, [isAwarding, pathname, soundOn])

  // useEffect(() => {
  //   if (!isBetSuccess) return

  //   const betTimeout = setTimeout(() => setIsBetSuccess(false), 3000)

  //   return () => clearTimeout(betTimeout)
  // }, [isBetSuccess])

  // useEffect(() => {
  //   ;[soundNewEntry, soundSpinning, soundCoolDown, soundWinning, soundPlaying, soundPump].map((item) =>
  //     handlePlaySound(item),
  //   )
  // }, [])

  return null
}

export default RaffleSocketProvider
