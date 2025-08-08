import { DefaultAvatarImage } from '@/assets/images'
import { getAvatarUrl } from '@/utils/common.utils'
import { useMemo } from 'react'
import { View, ViewProps } from 'react-native'
import { AppImage } from './app-image'
import AppLevel from './app-level'

export interface AppRankingAvatarProps extends ViewProps {
  avatar?: string
  level?: number
  size?: 'medium' | 'large'
  customStyles?: any
}
export function AppRankingAvatar({
  avatar,
  level,
  size = 'medium',
  children,
  customStyles,
  ...otherProps
}: AppRankingAvatarProps) {
  const [avatarSize, levelSize] = useMemo(() => {
    switch (size) {
      case 'large':
        const largeSize = 64
        return [
          {
            width: largeSize,
            height: largeSize,
            borderRadius: largeSize,
          },
          {
            bottom: -8,
            left: (largeSize - 28) / 2,
            width: 28,
            height: 20,
          },
        ]

      case 'medium':
      default:
        const mediumSize = 48
        return [
          {
            width: mediumSize,
            height: mediumSize,
            borderRadius: mediumSize,
          },
          {
            bottom: -4,
            left: (mediumSize - 18) / 2,
            width: 18,
            height: 10,
          },
        ]
    }
  }, [size])

  return (
    <View {...otherProps}>
      <AppImage
        source={avatar ? getAvatarUrl(avatar) : DefaultAvatarImage}
        style={{
          borderWidth: 1,
          ...avatarSize,
        }}
      />

      {children}

      <AppLevel
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          ...levelSize,
          ...customStyles,
        }}
        level={level}
        label={size === 'large' ? level : null}
      />
    </View>
  )
}
