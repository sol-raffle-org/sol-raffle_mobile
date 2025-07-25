import { useColorScheme } from '@/hooks/use-color-scheme'
import {
  DarkTheme as reactNavigationDark,
  DefaultTheme as reactNavigationLight,
  ThemeProvider,
} from '@react-navigation/native'
import merge from 'deepmerge'
import { PropsWithChildren } from 'react'
import { adaptNavigationTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper'

const { DarkTheme } = adaptNavigationTheme({ reactNavigationLight, reactNavigationDark })

const AppThemeDark = {
  ...merge(MD3DarkTheme, DarkTheme),
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    background: '#000000',
    surface: '#000000',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    primary: '#76D638',
  },
}

export function useAppTheme() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const theme = AppThemeDark // Default to dark theme
  return {
    colorScheme,
    isDark,
    theme,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  }
}

export function AppTheme({ children }: PropsWithChildren) {
  const { theme } = useAppTheme()

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </PaperProvider>
  )
}
