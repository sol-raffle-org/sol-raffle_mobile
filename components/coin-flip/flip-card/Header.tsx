import { CoinHeadImage, CoinTailImage, SolanaLogo } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { CoinSideEnum, FlipGameInterface } from '@/types/coin-flip.type'
import { isNil } from '@/utils/common.utils'
import React from 'react'

const Header: React.FC<HeaderProps> = ({ result, data }) => {
  const creatorWin = result === data.creatorChoice
  const creatorLose = !isNil(result) && result !== data.creatorChoice

  return (
    <AppView
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 12,
      }}
    >
      {data.creatorChoice === CoinSideEnum.Heads ? (
        <HeadChoice isWin={creatorWin} />
      ) : (
        <TailChoice isWin={creatorWin} />
      )}

      <AppView
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 0 }}
      >
        <AppView style={{ height: 1, width: 40, backgroundColor: creatorWin ? '#FAB40F' : '#FFFFFF17' }} />
        <AppView
          style={{
            width: 75,
            height: 30,
            borderWidth: 1,
            borderRadius: 60,
            borderColor: !isNil(result) ? '#FAB40F' : '#FFFFFF17',
            backgroundColor: !isNil(result) ? '#FAB40F' : '',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <AppImage source={SolanaLogo} style={{ width: 20, height: 20 }} />
          <AppText style={{ fontSize: 14, fontWeight: 'bold' }}>{data.gameValue}</AppText>
        </AppView>
        <AppView style={{ height: 1, width: 40, backgroundColor: creatorLose ? '#FAB40F' : '#FFFFFF17' }} />
      </AppView>

      {data.creatorChoice === CoinSideEnum.Heads ? (
        <TailChoice isWin={creatorLose} />
      ) : (
        <HeadChoice isWin={creatorLose} />
      )}
    </AppView>
  )
}

export default Header

interface HeaderProps {
  result?: CoinSideEnum
  data: FlipGameInterface
}

const HeadChoice = ({ isWin }: { isWin?: boolean }) => {
  return (
    <AppView style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexDirection: 'row' }}>
      <AppImage source={CoinHeadImage} style={{ width: 22, height: 22 }} />
      <AppText style={{ fontWeight: 'bold', fontSize: 12, color: isWin ? '#FAB40F' : '' }}>HEADS</AppText>
    </AppView>
  )
}

const TailChoice = ({ isWin }: { isWin?: boolean }) => {
  return (
    <AppView style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexDirection: 'row' }}>
      <AppImage source={CoinTailImage} style={{ width: 22, height: 22 }} />
      <AppText style={{ fontWeight: 'bold', fontSize: 12, color: isWin ? '#FAB40F' : '' }}>TAILS</AppText>
    </AppView>
  )
}
