import React from 'react'
import { View, ViewProps } from 'react-native'

export interface StatsViewProps extends ViewProps {
  variant?: 'row' | 'column'
}

export function StatsView({ variant = 'row', style, ...props }: StatsViewProps) {
  return (
    <View
      style={[
        {
          flexDirection: variant || 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#00000099',
          borderWidth: 1,
          borderColor: '#76D63733',
          borderRadius: 4,
        },
        style,
      ]}
      {...props}
    />
  )
}
