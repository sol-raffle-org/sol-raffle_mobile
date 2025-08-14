/* eslint-disable react-hooks/exhaustive-deps */
import useAppStore from '@/stores/useAppStore'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import { CoinSideEnum, FlipGameInterface, PlayingFlipGameItem } from '@/types/coin-flip.type'
import { isNil } from 'lodash'
import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import CoinFlipGameDetail from './coin-flip-game-detail'

interface IPlayingGames {
  [gameKey: string]: PlayingFlipGameItem
}

export interface CoinFlipContextProps {
  playingGames: IPlayingGames
  selectedGame: PlayingFlipGameItem | null
  showGame: (gameKey: string) => void
  closeGame: () => void
  updateResult: (gameKey: string, result: CoinSideEnum | null) => void
  updateCountdown: (gameKey: string, countdown: number | null) => void
  updateAnimation: (gameKey: string, isShowAnimation: boolean) => void
}

const CoinFlipContext = createContext<CoinFlipContextProps | undefined>(undefined)

export const CoinFlipProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const selectedGameRef = useRef<PlayingFlipGameItem | null>(null)
  const playingGamesRef = useRef<IPlayingGames>({})

  const [playingGames, setPlayingGames] = useState<IPlayingGames>({})
  const [selectedGame, setSelectedGame] = useState<PlayingFlipGameItem | null>(null)

  const { accountInfo } = useAppStore()
  const { flipGamesTable } = useCoinFlipStore()

  const showGame = useCallback((gameKey: string) => updateSelectedGame(playingGames[gameKey] || null), [playingGames])

  const closeGame = useCallback(() => updateSelectedGame(null), [])

  const updateSelectedGame = useCallback((game: PlayingFlipGameItem | null) => {
    setSelectedGame(game)
    selectedGameRef.current = game
  }, [])

  const updateResult = useCallback(
    (gameKey: string, result: CoinSideEnum | null) => {
      const data = playingGames[gameKey]
      const { isCreatorWin, isCreatorLose } = getGameResult(data)

      setPlayingGames((preState) => ({
        ...preState,
        [gameKey]: { ...preState[gameKey], displayResult: result, result, isCreatorWin, isCreatorLose },
      }))
    },
    [playingGames],
  )

  const updateCountdown = useCallback((gameKey: string, countdown: number | null) => {
    setPlayingGames((preState) => ({ ...preState, [gameKey]: { ...preState[gameKey], countdown } }))
  }, [])

  const updateAnimation = useCallback((gameKey: string, isShowAnimation: boolean) => {
    if (selectedGame && getUniqueKey(selectedGame.gameId, selectedGame.userCreator.wallet) === gameKey) {
      setSelectedGame((preState) => (preState ? { ...preState, isShowAnimation } : null))
    }

    setPlayingGames((preState) => ({ ...preState, [gameKey]: { ...preState[gameKey], isShowAnimation } }))
  }, [])

  useEffect(() => {
    const isValid = flipGamesTable && Array.isArray(flipGamesTable)
    const newPlayingGames = isValid
      ? flipGamesTable.reduce<IPlayingGames>((games, gameItem: FlipGameInterface, index) => {
          let playGameItem: PlayingFlipGameItem = { ...gameItem, gameIndex: index }
          const gameKey = getUniqueKey(gameItem.gameId, gameItem.userCreator.wallet)

          if (Object.keys(playingGamesRef.current).length === 0 || !playingGamesRef.current[gameKey]) {
            // Init data
            const { isCreatorWin, isCreatorLose } = getGameResult(playGameItem)
            games[gameKey] = { isCreatorWin, isCreatorLose, ...playGameItem }
          } else if (playingGamesRef.current[gameKey]) {
            // Update data
            games[gameKey] = { ...playingGamesRef.current[gameKey], ...playGameItem }
          } else {
            // Set data
            games[gameKey] = playGameItem
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

export const getUniqueKey = (gameId?: number, wallet?: string) => (gameId && wallet ? `${gameId}-${wallet}` : '')

export const useCoinFlipProvider = () => {
  const context = useContext(CoinFlipContext)
  if (!context) throw new Error('useCoinFlipProvider must be used within CoinFlipProvider')
  return context
}

const getGameResult = (gameItem: PlayingFlipGameItem) => ({
  isCreatorWin: Boolean(gameItem.userJoin) && !isNil(gameItem.result) && gameItem.result === gameItem.creatorChoice,
  isCreatorLose: Boolean(gameItem.userJoin) && !isNil(gameItem.result) && gameItem.result !== gameItem.creatorChoice,
})
