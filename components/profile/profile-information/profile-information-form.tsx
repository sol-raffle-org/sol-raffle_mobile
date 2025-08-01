import { AppView } from '@/components/app-view'
import { ProfileTextInput } from '@/components/profile/profile-information/profile-text-input'
import { useToast } from '@/components/toast/app-toast-provider'
import useAccount from '@/hooks/account-hooks/useAccount'
import useAppStore from '@/stores/useAppStore'
import { useTranslation } from 'react-i18next'

export function ProfileInformationForm() {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const { accountInfo } = useAppStore()
  const { handleUpdateName, handleUpdateEmail } = useAccount()

  const handleChange = (field: string) => async (text: string) => {
    const isResult = field === 'name' ? await handleUpdateName(text) : await handleUpdateEmail(text)
    if (!isResult) {
      showToast({
        type: 'error',
        subtitle: t('msgSomethingWentWrong'),
      })
    }
  }

  return (
    <AppView style={{ flexDirection: 'column', gap: 16 }}>
      <ProfileTextInput label="Name" value={accountInfo?.name} onChangeText={handleChange('name')} />

      <ProfileTextInput label="Email" value={accountInfo?.email || ''} onChangeText={handleChange('email')} />

      <ProfileTextInput label="Referred By" value={accountInfo?.referralByWallet || ''} disabled />
    </AppView>
  )
}
