import { FlipCardBgImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppView } from '@/components/app-view'
import useAccount from '@/hooks/account-hooks/useAccount'
import { useCountdownByTimestamp } from '@/hooks/common/useCountdown'
import useCoinFlipStore from '@/stores/useCoinflipStore'
import { CoinSideEnum, FlipGameInterface, FlipGameStatusEnum } from '@/types/coin-flip.type'
import { isNil } from '@/utils/common.utils'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Confetti from './Confetti'
import Header from './Header'
import Status from './Status'
import UserInfo from './UserInfo'

const FlipCard: React.FC<FlipCardProps> = ({ data, action }) => {
  const remain = useCountdownByTimestamp(
    (data?.deleteTime && data?.deleteTime > 0 && Math.floor(Number(data?.deleteTime) / 1000)) || 0,
  )

  const { handleGetBalance } = useAccount()
  const { setCount } = useCoinFlipStore()

  const [result, setResult] = useState<undefined | CoinSideEnum>(undefined)

  const isDeleteStatus = [FlipGameStatusEnum.Awarding, FlipGameStatusEnum.Finished].includes(data.status)

  const isDelete = useMemo(() => {
    const deleteTime = Math.floor(Number(data?.deleteTime) / 1000)
    const currentTime = Math.floor(Date.now() / 1000) + 2

    return Boolean(isDeleteStatus && deleteTime <= currentTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, remain])

  useEffect(() => {
    if (!isDelete) return

    handleGetBalance()
    setCount(Math.random())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete])

  useEffect(() => {
    if (data.status === FlipGameStatusEnum.Finished && !isNil(data.result)) {
      setResult(data.result)
    } else {
      setResult(undefined)
    }
  }, [data])

  if (isDelete) return <Fragment />

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
        position: 'relative',
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

        <Status gameData={data} setResult={setResult} />

        {data.userJoin ? (
          <UserInfo width={79} avatar={data.userJoin.avatar} level={data.userJoin.level} name={data.userJoin.name} />
        ) : (
          action
        )}
      </AppView>

      {!isNil(result) && isDeleteStatus ? <Confetti /> : <Fragment />}

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
