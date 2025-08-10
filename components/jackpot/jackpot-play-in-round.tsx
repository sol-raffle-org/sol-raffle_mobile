import { DefaultAvatarImage, FireImage, SolanaLogo } from '@/assets/images'
import useAppStore from '@/stores/useAppStore'
import useJackpotStore from '@/stores/useJackpotStore'
import { PlayerBetInterface } from '@/types/jackpot.type'
import { calculateWinChance, getAvatarUrl, truncateHash } from '@/utils/common.utils'
import { formatNumber } from '@/utils/format.utils'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppCircle } from '../app-circle'
import IconCopyButton from '../app-icon-copy-button'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView, AppViewProps } from '../app-view'

export function JackpotPlayInRound() {
  const { jackpotGameData } = useJackpotStore()

  const [maxChance, totalPot] = useMemo(() => {
    if (!jackpotGameData || !jackpotGameData?.bets?.length) return [0, 0]

    const totalPots = jackpotGameData.bets.map((item) => item.betInfo.totalPot || 0)

    const totalPot = Math.max(...totalPots)

    const chances = jackpotGameData.bets.map((item) =>
      !totalPot || !item.betInfo.wagered ? 0 : item.betInfo.wagered / totalPot,
    )

    if (!chances.length || !totalPots.length) return [0, 0]

    return [Math.max(...chances), totalPot]
  }, [jackpotGameData])

  return (
    <View style={{ paddingHorizontal: 8 }}>
      <JackpotRow
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
        }}
      >
        <JackpotRow style={{ gap: 4 }}>
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Total Player:
          </AppItemText>
          <AppItemText>{jackpotGameData?.bets?.length || 0}</AppItemText>
        </JackpotRow>
        <JackpotRow style={{ gap: 4 }}>
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Round:
          </AppItemText>
          <AppItemText>{jackpotGameData?.gameId}</AppItemText>
        </JackpotRow>
      </JackpotRow>

      <AppView>
        {jackpotGameData?.bets.map((item, index) => {
          return <JackpotPlayer key={index} data={item} maxChance={maxChance} totalPot={totalPot} />
        })}
      </AppView>

      <JackpotRow
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
        }}
      >
        <JackpotRow style={{ gap: 4 }}>
          <IconCopyButton copyContent={jackpotGameData?.serverSeed || ''} />
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Hash seed: {jackpotGameData?.serverSeed ? truncateHash(jackpotGameData?.serverSeed) : 'Waiting'}
          </AppItemText>
        </JackpotRow>
        <JackpotRow style={{ gap: 4 }}>
          <IconCopyButton copyContent={jackpotGameData?.blockNumber || ''} />
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            EOS Block: {jackpotGameData?.blockNumber || 'Waiting'}
          </AppItemText>
        </JackpotRow>
      </JackpotRow>
    </View>
  )
}

const JackpotPlayer = ({
  data,
  maxChance,
  totalPot,
}: {
  data: PlayerBetInterface
  totalPot: number
  maxChance: number
}) => {
  const { solPrice } = useAppStore()
  const chance = !totalPot ? 0 : data.betInfo.wagered / totalPot
  const isHighestChance = chance === maxChance

  const [backgroundColor, borderStyle, borderAvatarColor] = useMemo(() => getStyles(chance * 100), [chance])

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        padding: 16,
        borderColor: borderStyle,
        borderWidth: 2,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <LinearGradient style={StyleSheet.absoluteFill} {...backgroundColor} />

      <AppView
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <JackpotRow style={{ gap: 4 }}>
          <JackpotPlayerAvatar avatar={getAvatarUrl(data.userInfo.avatar)} borderColor={borderAvatarColor} />
          <AppItemText style={{ width: 50 }} numberOfLines={1} ellipsizeMode="tail">
            {data.userInfo.name}
          </AppItemText>
          <AppCircle
            style={{
              borderWidth: 1,
              borderColor: '#ffffff40',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <AppItemText style={{ fontSize: 12 }}>{data.userInfo.level}</AppItemText>
          </AppCircle>
        </JackpotRow>

        <JackpotRow style={{ gap: 4 }}>
          <AppImage source={SolanaLogo} style={{ width: 24, height: 24 }} />
          <View>
            <AppItemText style={{ textAlign: 'left' }}>{data.betInfo.wagered}</AppItemText>
            <AppItemText
              textType="subtitle"
              style={{
                color: '#FFFFFF99',
                fontSize: 12,
              }}
            >
              ~${formatNumber(data.betInfo.wagered * solPrice, 3)}
            </AppItemText>
          </View>
        </JackpotRow>

        <View>
          <AppItemText
            textType="subtitle"
            style={{
              color: '#FFF',
              fontSize: 12,
              textAlign: 'right',
            }}
          >
            Chance
          </AppItemText>
          <AppView
            style={{
              flexDirection: 'row',
              gap: 4,
            }}
          >
            {isHighestChance && (
              <AppImage
                source={FireImage}
                style={{
                  width: 13,
                  height: 17,
                }}
              />
            )}

            <AppItemText style={[{ fontSize: 12 }, isHighestChance && { color: '#D59704' }]}>
              {calculateWinChance(data.betInfo.wagered, totalPot)}
            </AppItemText>
          </AppView>
        </View>
      </AppView>
    </View>
  )
}

const JackpotRow = ({ style, ...props }: AppViewProps) => (
  <AppView style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...props} />
)

const JackpotPlayerAvatar = ({ avatar, borderColor }: { avatar?: string; borderColor?: string }) => (
  <AppView
    style={{
      borderWidth: 2,
      borderColor: borderColor || '#fff',
      borderRadius: 10,
      overflow: 'hidden',
    }}
  >
    <AppImage
      source={avatar || DefaultAvatarImage}
      style={{
        width: 32,
        height: 32,
      }}
    />
  </AppView>
)

const getStyles = (winChance: number): any => {
  if (winChance >= 75) {
    return [
      {
        colors: ['rgba(250,197,122,0.2)', 'rgba(0,0,0,0)'],
        start: { x: 0.73, y: 0.5 },
        end: { x: 0.73, y: 1.2 },
      },
      '#FAC57A33',
      '#FAC57A',
    ]
  } else if (winChance >= 50) {
    return [
      {
        colors: ['rgba(25, 225, 135, 0.1)', 'rgba(25, 225, 135, 0)'],
        start: { x: 0, y: 0.2 },
        end: { x: 0.5, y: 1 },
      },
      '#19E18733',
      '#BCFA7A',
    ]
  } else if (winChance >= 10) {
    return [
      {
        colors: ['rgba(59, 156, 247, 0.2)', 'rgba(59, 156, 247, 0)'],
        start: { x: 0, y: 0.78 },
        end: { x: 1, y: 0.78 },
      },
      '#3B9CF733',
      '#3B9CF7',
    ]
  } else {
    return [
      {
        colors: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)'],
        start: { x: 0, y: 0.2 },
        end: { x: 0.5, y: 1 },
      },
      '#FFFFFF33',
      '#FFFFFF',
    ]
  }
}

const extractNumber = (input: string): number => {
  const cleaned = input.replace('%', '')
  const parsed = parseFloat(cleaned)
  if (isNaN(parsed)) {
    throw new Error(`Invalid number in string: "${input}"`)
  }
  return parsed
}
