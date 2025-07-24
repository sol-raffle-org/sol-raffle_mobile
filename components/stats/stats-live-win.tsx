import { DefaultAvatarImage, FlagGreenImage, Level3Image, SolanaLogo } from '@/assets/images'
import { AppText } from '@/components/app-text'
import { ScrollView, View } from 'react-native'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { JackpotIcon } from '../icons'
import { StatsView } from './stats-view'

export function StatsLiveWin() {
  const data = new Array(30).fill({
    addressWallet: 'fdss...ssssf',
    volume: '80.90',
    avatar: DefaultAvatarImage,
  })

  return (
    <StatsView variant="column" style={{ flex: 1, padding: 8 }}>
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
          Live wins
        </AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: '100%', flexDirection: 'column', gap: 8 }}
      >
        {data.map((item, index) => (
          <StatsLiveWinItem key={index} {...item} />
        ))}
      </ScrollView>
    </StatsView>
  )
}

type StatsLiveWinItemProps = {
  avatar?: any
  addressWallet: string
  volume: string
}
function StatsLiveWinItem(item: StatsLiveWinItemProps) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: 8,
        gap: 6,
      }}
    >
      <View>
        <AppImage
          source={item.avatar}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            borderWidth: 1,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 16,
            width: 18,
            height: 10,
            backgroundColor: '#0d9c6d33',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppImage source={Level3Image} style={{ width: 8, height: 8 }} />
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppImage source={SolanaLogo} style={{ width: 17, height: 17, marginRight: 8 }} />
          <AppItemText textType="title">{item.volume} SOL</AppItemText>
        </View>

        <AppItemText textType="subtitle" style={{ textAlign: 'left' }} color="#FFFFFFB2">
          {item.addressWallet}
        </AppItemText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <JackpotIcon color="#ffffff66" />
        <AppItemText textType="subtitle" color="#ffffff66">
          Jackpot
        </AppItemText>
      </View>
    </View>
  )
}
