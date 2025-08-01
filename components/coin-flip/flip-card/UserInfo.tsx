import { DefaultAvatarImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { getAvatarUrl } from '@/utils/common.utils'
import { FC } from 'react'
import Level from './Level'

const UserInfo: FC<UserInfoProps> = ({ avatar, name, level, width }) => {
  return (
    <AppView
      style={{
        width: width,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
      }}
    >
      <AppImage
        source={avatar ? getAvatarUrl(avatar) : DefaultAvatarImage}
        style={{
          width: 63,
          height: 63,
          borderRadius: 63 / 2,
        }}
      />
      <Level level={level} style={{ position: 'absolute', bottom: 22 }} />
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
