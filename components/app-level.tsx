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
    if (level >= 1 && level < 10) {
      return [Level1Image, 'rgba(13, 156, 109, 0.2)', '#81F70D']
    } else if (level >= 10 && level < 20) {
      return [Level2Image, 'rgba(12, 97, 177, 0.2)', '#16F7F9']
    } else if (level >= 20 && level < 40) {
      return [Level3Image, 'rgba(255, 146, 31, 0.2)', '#81F70D']
    } else if (level >= 40 && level < 60) {
      return [Level4Image, 'rgba(125, 125, 125, 0.2)', '#FEC401']
    } else if (level >= 60 && level < 80) {
      return [Level5Image, 'rgba(67, 37, 107, 0.2)', '#D0B5EA']
    } else if (level >= 80 && level < 100) {
      return [Level6Image, 'rgba(125, 125, 125, 0.2)', '#81F70D']
    } else {
      return [Level7Image, 'rgba(255, 172, 68, 0.2)', '#FFD44E']
    }
  }, [level])

  return (
    <View style={[{ backgroundColor: backgroundColor, gap: 8, flexDirection: 'row' }, style]} {...otherProps}>
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
