/* eslint-disable react-hooks/exhaustive-deps */
import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import { CoinSideEnum, FlipGameInterface, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { isNil } from 'lodash'
import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import CoinFlipGameDetail from './coin-flip-game-detail'

interface IPlayingGames {
  [key: string]: PlayingFlipGameItem
}

export interface CoinFlipContextProps {
  playingGames: IPlayingGames
  selectedGame: PlayingFlipGameItem | null
  showGame: (key: string) => void
  closeGame: () => void
  updateResult: (key: string, result: CoinSideEnum | null) => void
  updateCountdown: (key: string, countdown: number | null) => void
  updateAnimation: (key: string, isShowAnimation: boolean) => void
}

const CoinFlipContext = createContext<CoinFlipContextProps | undefined>(undefined)

export const CoinFlipProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const selectedGameRef = useRef<PlayingFlipGameItem | null>(null)
  const playingGamesRef = useRef<IPlayingGames>({})

  const [playingGames, setPlayingGames] = useState<IPlayingGames>({})
  const [selectedGame, setSelectedGame] = useState<PlayingFlipGameItem | null>(null)

  const { accountInfo } = useAppStore()
  const { flipGamesTable } = useCoinFlipStore()

  const showGame = useCallback((key: string) => updateSelectedGame(playingGames[key] || null), [playingGames])

  const closeGame = useCallback(() => updateSelectedGame(null), [])

  const updateSelectedGame = useCallback((game: PlayingFlipGameItem | null) => {
    setSelectedGame(game)
    selectedGameRef.current = game
  }, [])

  const updateResult = useCallback(
    (key: string, result: CoinSideEnum | null) => {
      const data = playingGames[key]
      const [isCreatorLose, isOtherLose] = [
        !isNil(result) && result === data.creatorChoice,
        !isNil(result) && result !== data.creatorChoice,
      ]

      setPlayingGames((preState) => ({
        ...preState,
        [key]: { ...preState[key], displayResult: result, result, isCreatorLose, isOtherLose },
      }))
    },
    [playingGames],
  )

  const updateCountdown = useCallback((key: string, countdown: number | null) => {
    setPlayingGames((preState) => ({ ...preState, [key]: { ...preState[key], countdown } }))
  }, [])

  const updateAnimation = useCallback((key: string, isShowAnimation: boolean) => {
    if (getUniqueKey(selectedGame?.gameId || 0, selectedGame?.userCreator.wallet || '') === key) {
      setSelectedGame((preState) => (preState ? { ...preState, isShowAnimation } : null))
    }

    setPlayingGames((preState) => ({ ...preState, [key]: { ...preState[key], isShowAnimation } }))
  }, [])

  useEffect(() => {
    const isValid = flipGamesTable && Array.isArray(flipGamesTable)
    const newPlayingGames = isValid
      ? flipGamesTable.reduce<IPlayingGames>((games, gameItem: FlipGameInterface) => {
          const currentTime = Math.floor(Date.now() / 1000) + 2
          const isEnd = gameItem.deleteTime && gameItem.deleteTime > 0 ? currentTime >= gameItem.deleteTime : false

          if (gameItem.gameId && gameItem.userCreator.wallet && !isEnd) {
            const key = getUniqueKey(gameItem.gameId, gameItem.userCreator.wallet)
            if (Object.keys(playingGamesRef.current).length === 0 || !playingGamesRef.current[key]) {
              // Init data
              const [isCreatorLose, isOtherLose] = [
                !isNil(gameItem.result) && gameItem.result === gameItem.creatorChoice,
                !isNil(gameItem.result) && gameItem.result !== gameItem.creatorChoice,
              ]
              games[key] = { ...gameItem, isCreatorLose, isOtherLose }
            } else if (playingGamesRef.current[key]) {
              // Update data
              games[key] = { ...gameItem, ...playingGamesRef.current[key], deleteTime: gameItem.deleteTime }
            } else {
              // Set data
              games[key] = gameItem
            }
          }

          return games
        }, {})
      : {}

    setPlayingGames(newPlayingGames)
  }, [flipGamesTable])

  useEffect(() => {
    if (selectedGameRef.current?.gameId) {
      updateSelectedGame(
        playingGames[getUniqueKey(selectedGameRef.current.gameId, selectedGameRef.current.userCreator.wallet)],
      )
    }

    playingGamesRef.current = playingGames
  }, [playingGames])

  return (
    <CoinFlipContext.Provider
      value={{
        selectedGame,
        playingGames,
        showGame,
        closeGame,
        updateResult,
        updateCountdown,
        updateAnimation,
      }}
    >
      {children}

      {selectedGame?.gameId && (
        <CoinFlipGameDetail
          isMyGame={selectedGame.userCreator.wallet === accountInfo?.wallet}
          gameData={selectedGame}
          visible={true}
          onDismiss={closeGame}
        />
      )}
    </CoinFlipContext.Provider>
  )
}

export const getUniqueKey = (gameId: number, wallet: string) => `${gameId}-${wallet}`

export const useCoinFlipProvider = () => {
  const context = useContext(CoinFlipContext)
  if (!context) throw new Error('useCoinFlipProvider must be used within CoinFlipProvider')
  return context
}
