import { CoinHeadImage, CoinTailImage, FlipCardBgImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppView } from '@/components/app-view'
import { VersusIcon } from '@/components/icons'
import { useCountdownByTimestamp } from '@/hooks/common/useCountdown'
import useAppStore from '@/stores/useAppStore'
import { CoinSideEnum, FlipGameInterface, FlipGameStatusEnum } from '@/types/coin-flip.type'
import { isNil } from '@/utils/common.utils'
import React, { useEffect, useMemo, useState } from 'react'
import FlipAnimation from './FlipAnimation'
import Header from './Header'
import UserInfo from './UserInfo'

const FlipCard: React.FC<FlipCardProps> = ({ data, action }) => {
  const remain = useCountdownByTimestamp(
    (data?.deleteTime && data?.deleteTime > 0 && Math.floor(Number(data?.deleteTime) / 1000)) || 0,
  )

  const { appSocket } = useAppStore()

  const [result, setResult] = useState<undefined | CoinSideEnum>(undefined)

  const isDelete = useMemo(() => {
    const deleteTime = Math.floor(Number(data?.deleteTime) / 1000)
    const currentTime = Math.floor(Date.now() / 1000) + 2
    const isDeleteStatus = [FlipGameStatusEnum.Awarding, FlipGameStatusEnum.Finished].includes(data.status)

    return Boolean(isDeleteStatus && deleteTime <= currentTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, remain])

  useEffect(() => {
    if (!isDelete || !appSocket || !appSocket.connected) return
    setTimeout(() => {
      appSocket.emit('fl-game-data')
    }, 3000)
  }, [isDelete, appSocket])

  useEffect(() => {
    if (data.status === FlipGameStatusEnum.Finished && !isNil(data.result)) {
      setResult(data.result)
    }
  }, [data])

  return (
    <AppView
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#FFFFFF4D',
        width: '100%',
        height: 177,
        overflow: 'hidden',
      }}
    >
      <Header data={data} result={result} />

      <AppView
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          zIndex: 20,
          alignItems: 'center',
          paddingHorizontal: 32,
          justifyContent: 'space-between',
        }}
      >
        <UserInfo
          width={79}
          avatar={data.userCreator.avatar}
          level={data.userCreator.level}
          name={data.userCreator.name}
        />
        <AppView
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {data.status !== FlipGameStatusEnum.Finished && data.status !== FlipGameStatusEnum.Awarding && (
            <VersusIcon color="#01FC7F99" />
          )}

          {data.status === FlipGameStatusEnum.Awarding && !isNil(data.result) && (
            <FlipAnimation result={data.result} setResult={setResult} />
          )}

          {data.status === FlipGameStatusEnum.Finished && (
            <AppImage
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                borderWidth: 1,
                borderColor: '#FEF08A',
              }}
              source={data.result === CoinSideEnum.Heads ? CoinHeadImage : CoinTailImage}
            />
          )}
        </AppView>

        {data.userJoin ? (
          <UserInfo width={79} avatar={data.userJoin.avatar} level={data.userJoin.level} name={data.userJoin.name} />
        ) : (
          action
        )}
      </AppView>

      <AppImage
        source={FlipCardBgImage}
        style={{
          width: '200%',
          height: '200%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 10,
          transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        }}
      />
    </AppView>
  )
}

export default FlipCard

interface FlipCardProps {
  data: FlipGameInterface
  action: React.ReactNode
}
