import AppLevel from '@/components/app-level'
import React, { FC } from 'react'
import { StyleSheet, ViewProps } from 'react-native'
interface LevelProps extends ViewProps {
  level: number
}

const Level: FC<LevelProps> = ({ level, style, ...otherProps }) => {
  return <AppLevel style={StyleSheet.flatten([styles.container, style])} {...otherProps} level={level} />
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // RN 0.71+; otherwise use marginRight
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
})

export default Level
