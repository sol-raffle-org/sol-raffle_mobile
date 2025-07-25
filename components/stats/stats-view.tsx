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
          backgroundColor: '#FFFFFF0F',
        },
        style,
      ]}
      {...props}
    />
  )
}
