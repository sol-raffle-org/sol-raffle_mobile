import {
  AuraImage,
  DefaultAvatarImage,
  FlagGreenImage,
  SolanaLogo,
  Top1BadgeImage,
  Top2BadgeImage,
  Top3BadgeImage,
} from '@/assets/images'
import { AppText } from '@/components/app-text'
import { View } from 'react-native'
import { AppCircle } from '../app-circle'
import { AppImage } from '../app-image'
import { StatsText } from './stats-text'
import { StatsView } from './stats-view'

export function StatsRanking() {
  const data = [
    {
      topNumber: 1,
      user: {
        addressWallet: 'fdss...ssssf',
        volume: '80.90',
        avatar: DefaultAvatarImage,
      },
    },
    {
      topNumber: 2,
      user: {
        addressWallet: 'fdss...ssssf',
        volume: '70.90',
        avatar: DefaultAvatarImage,
      },
    },
    {
      topNumber: 3,
      user: {
        addressWallet: 'fdss...ssssf',
        volume: '60.90',
        avatar: DefaultAvatarImage,
      },
    },
  ]
  return (
    <StatsView variant="column" style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppImage source={FlagGreenImage} style={{ width: 21, height: 25 }} />
        <AppText
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#FFF',
            padding: 8,
          }}
        >
          Play of week
        </AppText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {data.map((item, index) => (
          <StatsRankingItem key={index} topNumber={item.topNumber} user={item.user} />
        ))}
      </View>
    </StatsView>
  )
}

type StatsRankingItemProps = {
  topNumber: number
  user: {
    avatar?: any
    addressWallet: string
    volume: string
  }
}
function StatsRankingItem({ topNumber, user }: StatsRankingItemProps) {
  const borderColor = topNumber === 1 ? '#FEEBA6' : topNumber === 2 ? '#DBE1E3' : '#A7CB75'
  const topImage = topNumber === 1 ? Top1BadgeImage : topNumber === 2 ? Top2BadgeImage : Top3BadgeImage

  return (
    <View style={{ flex: 1, padding: 8, gap: 6 }}>
      <AppImage source={AuraImage} style={{ width: 100, height: 100, position: 'absolute', top: 6, left: 10 }} />

      <View style={{ marginTop: 24 }}>
        <AppCircle borderColor={borderColor}>
          <AppImage source={user.avatar} style={{ width: 48, height: 48 }} />
        </AppCircle>

        <AppImage source={topImage} style={{ width: 30, height: 26, position: 'absolute', top: -16, left: 38 }} />
      </View>

      <StatsText textType="subtitle">{user.addressWallet}</StatsText>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppImage source={SolanaLogo} style={{ width: 17, height: 17, marginRight: 8 }} />
        <StatsText textType="title">{user.volume} SOL</StatsText>
      </View>
    </View>
  )
}
