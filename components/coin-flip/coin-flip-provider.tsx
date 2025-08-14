/* eslint-disable react-hooks/exhaustive-deps */
import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import { CoinSideEnum, FlipGameInterface, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { isNil } from 'lodash'
import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import CoinFlipGameDetail from './coin-flip-game-detail'

interface IPlayingGames {
  [gameId: string]: PlayingFlipGameItem
}

export interface CoinFlipContextProps {
  playingGames: IPlayingGames
  selectedGame: PlayingFlipGameItem | null
  showGame: (gameId: number) => void
  closeGame: () => void
  updateResult: (gameId: number, result: CoinSideEnum | null) => void
  updateCountdown: (gameId: number, countdown: number | null) => void
  updateAnimation: (gameId: number, isShowAnimation: boolean) => void
}

const CoinFlipContext = createContext<CoinFlipContextProps | undefined>(undefined)

export const CoinFlipProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const selectedGameRef = useRef<PlayingFlipGameItem | null>(null)

  const [playingGames, setPlayingGames] = useState<IPlayingGames>({})
  const [selectedGame, setSelectedGame] = useState<PlayingFlipGameItem | null>(null)

  const { accountInfo } = useAppStore()
  const { flipGamesTable } = useCoinFlipStore()

  const showGame = useCallback((gameId: number) => updateSelectedGame(playingGames[gameId] || null), [playingGames])

  const closeGame = useCallback(() => updateSelectedGame(null), [])

  const updateSelectedGame = useCallback((game: PlayingFlipGameItem | null) => {
    setSelectedGame(game)
    selectedGameRef.current = game
  }, [])

  const updateResult = useCallback(
    (gameId: number, result: CoinSideEnum | null) => {
      const data = playingGames[gameId]
      const [isCreatorLose, isOtherLose] = [
        !isNil(result) && result === data.creatorChoice,
        !isNil(result) && result !== data.creatorChoice,
      ]

      setPlayingGames((preState) => ({
        ...preState,
        [gameId]: { ...preState[gameId], displayResult: result, result, isCreatorLose, isOtherLose },
      }))
    },
    [playingGames],
  )

  const updateCountdown = useCallback((gameId: number, countdown: number | null) => {
    setPlayingGames((preState) => ({ ...preState, [gameId]: { ...preState[gameId], countdown } }))
  }, [])

  const updateAnimation = useCallback((gameId: number, isShowAnimation: boolean) => {
    if (selectedGameRef.current?.gameId === gameId) {
      setSelectedGame((preState) => (preState ? { ...preState, isShowAnimation } : null))
    }

    setPlayingGames((preState) => ({ ...preState, [gameId]: { ...preState[gameId], isShowAnimation } }))
  }, [])

  useEffect(() => {
    const isValid = flipGamesTable && Array.isArray(flipGamesTable)
    const newPlayingGames = isValid
      ? flipGamesTable.reduce<IPlayingGames>((games, gameItem: FlipGameInterface) => {
          if (gameItem.gameId) {
            const [isCreatorLose, isOtherLose] = [
              !isNil(gameItem.result) && gameItem.result === gameItem.creatorChoice,
              !isNil(gameItem.result) && gameItem.result !== gameItem.creatorChoice,
            ]

            games[gameItem.gameId] = { ...gameItem, isCreatorLose, isOtherLose }
          }

          return games
        }, {})
      : {}

    setPlayingGames(newPlayingGames)
  }, [flipGamesTable])

  useEffect(() => {
    if (selectedGameRef.current?.gameId) {
      updateSelectedGame(playingGames[selectedGameRef.current.gameId])
    }
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

export const useCoinFlipProvider = () => {
  const context = useContext(CoinFlipContext)
  if (!context) throw new Error('useCoinFlipProvider must be used within CoinFlipProvider')
  return context
}
