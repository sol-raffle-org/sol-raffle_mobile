import { DefaultAvatarImage, SolanaLogo } from '@/assets/images'
import useAppStore from '@/stores/useAppStore'
import useJackpotStore from '@/stores/useJackpotStore'
import { PlayerBetInterface } from '@/types/jackpot.type'
import { calculateWinChance, getAvatarUrl, truncateHash } from '@/utils/common.utils'
import { formatNumber } from '@/utils/format.utils'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { AppCircle } from '../app-circle'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView, AppViewProps } from '../app-view'
import { CopyIcon } from '../icons'

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
          const chance = !totalPot ? 0 : item.betInfo.wagered / totalPot
          const isHighestChance = chance === maxChance
          return <JackpotPlayer key={index} data={item} totalPot={totalPot} />
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
          <CopyIcon color="#FFFFFF8C" />
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Hash seed: {jackpotGameData?.serverSeed ? truncateHash(jackpotGameData?.serverSeed) : 'Waiting'}
          </AppItemText>
        </JackpotRow>
        <JackpotRow style={{ gap: 4 }}>
          <CopyIcon color="#FFFFFF8C" />
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            EOS Block: {jackpotGameData?.blockNumber || 'Waiting'}
          </AppItemText>
        </JackpotRow>
      </JackpotRow>
    </View>
  )
}

const JackpotPlayer = ({ data, totalPot }: { data: PlayerBetInterface; totalPot: number }) => {
  const { solPrice } = useAppStore()
  return (
    <AppView
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#19E18733',
        padding: 16,
        borderRadius: 16,
      }}
    >
      <JackpotRow style={{ gap: 4 }}>
        <JackpotPlayerAvatar avatar={getAvatarUrl(data.userInfo.avatar)} />
        <AppItemText>{data.userInfo.name}</AppItemText>
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

      <JackpotRow style={{ gap: 8 }}>
        <AppImage source={SolanaLogo} style={{ width: 24, height: 24 }} />
        <View>
          <AppItemText>{data.betInfo.wagered}</AppItemText>
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
          }}
        >
          Chance
        </AppItemText>
        <AppItemText>{calculateWinChance(data.betInfo.wagered, totalPot)}</AppItemText>
      </View>
    </AppView>
  )
}

const JackpotRow = ({ style, ...props }: AppViewProps) => (
  <AppView style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...props} />
)

const JackpotPlayerAvatar = ({ avatar }: { avatar?: string }) => (
  <AppView
    style={{
      borderWidth: 2,
      borderColor: '#D19710',
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
