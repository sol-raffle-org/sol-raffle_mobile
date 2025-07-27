import React from 'react'
import { View, ViewProps } from 'react-native'

export interface AppCircleProps extends ViewProps {
  borderColor?: string
}

export function AppCircle({ style, borderColor = '#FFFFFF4D', ...props }: AppCircleProps) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
    >
      <View
        style={[
          {
            borderRadius: '50%',
            borderWidth: 1,
            borderColor: borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          style,
        ]}
        {...props}
      />
    </View>
  )
}
