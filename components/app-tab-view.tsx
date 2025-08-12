import React, { ReactNode } from 'react'
import { ViewProps } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { HEADER_PADDING } from './app-header'

interface AppTabViewProps extends ViewProps {
  children: ReactNode
}

const AppTabView: React.FC<AppTabViewProps> = ({ children, ...otherProps }) => {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: HEADER_PADDING + insets.top, paddingBottom: insets.bottom + 32 }}
      {...otherProps}
    >
      {children}
    </SafeAreaView>
  )
}

export default AppTabView
