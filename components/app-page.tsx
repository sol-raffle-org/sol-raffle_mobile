import { useAppTheme } from '@/components/app-theme'
import { AppView, AppViewProps } from '@/components/app-view'
import React, { PropsWithChildren } from 'react'

export function AppPage({ children, style, ...props }: PropsWithChildren<AppViewProps>) {
  const { spacing } = useAppTheme()
  return (
    <AppView style={[{ flex: 1, gap: spacing.md, padding: spacing.md }, style]} {...props}>
      {children}
    </AppView>
  )
}
