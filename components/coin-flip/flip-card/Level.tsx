import {
  Level1Image,
  Level2Image,
  Level3Image,
  Level4Image,
  Level5Image,
  Level6Image,
  Level7Image,
} from '@/assets/images'
import React, { FC, useMemo } from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewProps } from 'react-native'
interface LevelProps extends ViewProps {
  level: number
}

const Level: FC<LevelProps> = ({ level, style, ...otherProps }) => {
  const [imgSrc, levelStyle, textColor] = useMemo(() => {
    if (level >= 1 && level < 10) {
      return [Level1Image, styles.bgGreen, styles.textGreen]
    } else if (level >= 10 && level < 20) {
      return [Level2Image, styles.bgBlue, styles.textCyan]
    } else if (level >= 20 && level < 40) {
      return [Level3Image, styles.bgOrange, styles.textGreen]
    } else if (level >= 40 && level < 60) {
      return [Level4Image, styles.bgGray, styles.textYellow]
    } else if (level >= 60 && level < 80) {
      return [Level5Image, styles.bgPurple, styles.textPurple]
    } else if (level >= 80 && level < 100) {
      return [Level6Image, styles.bgGray, styles.textGreen]
    } else {
      return [Level7Image, styles.bgGold, styles.textGold]
    }
  }, [level])

  return (
    <View style={StyleSheet.flatten([styles.container, levelStyle, style])} {...otherProps}>
      <Image source={imgSrc as ImageSourcePropType} style={styles.icon} />
      <Text style={[styles.text, textColor]}>{level}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // RN 0.71+; otherwise use marginRight
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    backgroundColor: '#313131',
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bgGreen: { backgroundColor: 'rgba(13, 156, 109, 0.8)' },
  textGreen: { color: '#81F70D' },
  bgBlue: { backgroundColor: 'rgba(12, 97, 177, 0.8)' },
  textCyan: { color: '#16F7F9' },
  bgOrange: { backgroundColor: 'rgba(255, 146, 31, 0.8)' },
  bgGray: { backgroundColor: 'rgba(125, 125, 125, 0.8)' },
  textYellow: { color: '#FEC401' },
  bgPurple: { backgroundColor: 'rgba(67, 37, 107, 0.8)' },
  textPurple: { color: '#D0B5EA' },
  bgGold: { backgroundColor: 'rgba(255, 172, 68, 0.8)' },
  textGold: { color: '#FFD44E' },
})

export default Level
