import { AppView } from '@/components/app-view'
import { ProfileTextInput } from '@/components/profile/profile-information/profile-text-input'
import { useToast } from '@/components/toast/app-toast-provider'
import { AccountInterface } from '@/types/app.type'
import { useTranslation } from 'react-i18next'

interface ProfileInformationFormProps {
  profile?: AccountInterface
  onChangeName: (data: string) => Promise<boolean>
  onChangeEmail: (data: string) => Promise<boolean>
}
export function ProfileInformationForm({ profile, onChangeName, onChangeEmail }: ProfileInformationFormProps) {
  const { t } = useTranslation()
  const { showToast } = useToast()

  const handleChange = (field: string) => async (text: string) => {
    const isResult = field === 'name' ? await onChangeName(text) : await onChangeEmail(text)
    if (!isResult) {
      showToast({
        type: 'error',
        subtitle: t('msgSomethingWentWrong'),
      })
    }
  }

  return (
    <AppView style={{ flexDirection: 'column', gap: 16 }}>
      <ProfileTextInput label="Name" value={profile?.name} onChangeText={handleChange('name')} />

      <ProfileTextInput label="Email" value={profile?.email || ''} onChangeText={handleChange('email')} />

      <ProfileTextInput label="Referred By" value={profile?.referralByWallet || ''} disabled />
    </AppView>
  )
}
