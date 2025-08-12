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
}
export function AppRankingAvatar({ avatar, level, size = 'medium', children, ...otherProps }: AppRankingAvatarProps) {
  const [avatarSize, levelSize, levelHeight] = useMemo(() => {
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
          },
          { height: 20 },
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
          },
          { height: 10 },
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

      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          ...levelSize,
        }}
      >
        <AppLevel
          style={{
            ...levelHeight,
          }}
          level={level}
          label={size === 'large' ? level : null}
          size={size}
        />
      </View>
    </View>
  )
}
