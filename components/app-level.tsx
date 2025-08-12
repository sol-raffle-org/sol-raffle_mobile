import { FC, useMemo } from 'react'

import {
  Level1Image,
  Level2Image,
  Level3Image,
  Level4Image,
  Level5Image,
  Level6Image,
  Level7Image,
} from '@/assets/images'
import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { AppImage } from './app-image'
import { AppItemText } from './app-item-text'

interface AppLevelProps extends ViewProps {
  level?: number
  label?: string | number | null
}

const AppLevel: FC<AppLevelProps> = ({ level = 1, label, style, ...otherProps }) => {
  const [imgSrc, backgroundColor, textColor] = useMemo(() => {
    if (level > 100) {
      return [Level7Image, '#403424', '#FFD44E']
    } else if (level >= 80 && level < 100) {
      return [Level6Image, '#282828', '#81F70D']
    } else if (level >= 60 && level < 80) {
      return [Level5Image, '#292035', '#D0B5EA']
    } else if (level >= 40 && level < 60) {
      return [Level4Image, '#282828', '#FEC401']
    } else if (level >= 20 && level < 40) {
      return [Level3Image, '#342a20', '#81F70D']
    } else if (level >= 10 && level < 20) {
      return [Level2Image, '#1a2b3b', '#16F7F9']
    } else {
      return [Level1Image, '#1c372e', '#81F70D']
    }
  }, [level])

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          gap: 4,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderRadius: 2,
        },
        style,
      ]}
      {...otherProps}
    >
      <AppImage
        source={imgSrc}
        style={{
          width: 10,
          height: 10,
        }}
      />

      {label && (
        <AppItemText textType="title" style={[{ fontSize: 10, color: textColor }]}>
          {label}
        </AppItemText>
      )}
    </View>
  )
}

export default AppLevel
