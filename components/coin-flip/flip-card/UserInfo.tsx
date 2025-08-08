import { AppRankingAvatar } from '@/components/app-ranking-avatar'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { FC } from 'react'

const UserInfo: FC<UserInfoProps> = ({ avatar, name, level, width }) => {
  return (
    <AppView
      style={{
        width: width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <AppRankingAvatar avatar={avatar} level={level} size="large" />
      <AppText style={{ fontSize: 13 }}>{name}</AppText>
    </AppView>
  )
}

export default UserInfo

interface UserInfoProps {
  avatar: string
  name: string
  level: number
  width: number
}
