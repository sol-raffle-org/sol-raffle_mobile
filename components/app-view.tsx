import { useAppTheme } from '@/components/app-theme'
import React from 'react'
import { View, type ViewProps } from 'react-native'

export type AppViewProps = ViewProps

export function AppView({ style, ...props }: AppViewProps) {
  const { spacing } = useAppTheme()
  return <View style={[{ gap: spacing.md }, style]} {...props} />
}
