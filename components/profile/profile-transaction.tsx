import { AppText } from '@/components/app-text'
import { useAppTheme } from '@/components/app-theme'
import { AppView } from '@/components/app-view'

export function ProfileTransaction() {
  const { spacing } = useAppTheme()
  return (
    <AppView style={{ gap: spacing.md }}>
      <AppText variant="titleMedium">This is transactions</AppText>
    </AppView>
  )
}
