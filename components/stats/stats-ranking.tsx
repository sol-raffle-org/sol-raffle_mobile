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
import { getSystemTopPlayerService } from '@/services/system-service/system.server-service'
import { SystemTopPlayerType } from '@/types/service.type'
import { getAvatarUrl, truncateHash } from '@/utils/common.utils'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { AppCircle } from '../app-circle'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { StatsView } from './stats-view'

export function StatsRanking() {
  const [rankingList, setRankingList] = useState<SystemTopPlayerType[]>([])

  useEffect(() => {
    getSystemTopPlayerService().then((data) => {
      setRankingList(data || [])
      return true
    })
  }, [])

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
        {rankingList.map((item: SystemTopPlayerType, index) => (
          <StatsRankingItem key={index} topNumber={index + 1} user={item} />
        ))}
      </View>
    </StatsView>
  )
}

type StatsRankingItemProps = {
  topNumber: number
  user: SystemTopPlayerType
}
function StatsRankingItem({ topNumber, user }: StatsRankingItemProps) {
  const borderColor = topNumber === 1 ? '#FEEBA6' : topNumber === 2 ? '#DBE1E3' : '#A7CB75'
  const topImage = topNumber === 1 ? Top1BadgeImage : topNumber === 2 ? Top2BadgeImage : Top3BadgeImage

  return (
    <View style={{ flex: 1, padding: 8, gap: 6 }}>
      <AppImage source={AuraImage} style={{ width: 100, height: 100, position: 'absolute', top: 6, left: 10 }} />

      <View style={{ marginTop: 24 }}>
        <AppCircle borderColor={borderColor}>
          <AppImage
            source={user.avatar ? getAvatarUrl(user.avatar) : DefaultAvatarImage}
            style={{ width: 48, height: 48 }}
          />
        </AppCircle>

        <AppImage source={topImage} style={{ width: 30, height: 26, position: 'absolute', top: -16, left: 38 }} />
      </View>

      <AppItemText textType="subtitle">{truncateHash(user.wallet)}</AppItemText>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppImage source={SolanaLogo} style={{ width: 17, height: 17, marginRight: 8 }} />
        <AppItemText textType="title">{user.value} SOL</AppItemText>
      </View>
    </View>
  )
}
