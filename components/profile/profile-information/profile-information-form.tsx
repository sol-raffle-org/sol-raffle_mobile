import { AppView } from '@/components/app-view'
import { ProfileTextInput } from '@/components/profile/profile-information/profile-text-input'

interface ProfileInformationFormProps {
  profile: {
    name?: string
    email?: string
    referredBy?: string
  }
  onChange: (data: { [key: string]: string }) => void
}
export function ProfileInformationForm({ profile = {}, onChange }: ProfileInformationFormProps) {
  const handleChange = (field: string) => (text: string) =>
    onChange({
      [field]: text,
    })

  return (
    <AppView style={{ flexDirection: 'column', gap: 16 }}>
      <ProfileTextInput label="Name" value={profile.name} onChangeText={handleChange('name')} />

      <ProfileTextInput label="Email" value={profile.email} onChangeText={handleChange('email')} />

      <ProfileTextInput label="Referred By" value={profile.referredBy} disabled />
    </AppView>
  )
}
