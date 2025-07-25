import { AppItemText } from '@/components/app-item-text'
import { AppView } from '@/components/app-view'
import { LogoutIcon } from '@/components/icons'
import { useToast } from '@/components/toast/app-toast-provider'
import { Button } from 'react-native-paper'
import { ProfileInformationAvatar } from './profile-information-avatar'
import { ProfileInformationForm } from './profile-information-form'

export function ProfileInformation() {
  const handleChangeProfile = () => {}

  return (
    <AppView style={{ gap: 16 }}>
      <ProfileInformationAvatar />
      <ProfileInformationForm
        profile={{
          name: 'alrrx345',
          email: 'alrrx345@gmail.com',
          referredBy: 'alrrx345',
        }}
        onChange={handleChangeProfile}
      />
      <ProfileLogOutButton />
    </AppView>
  )
}

const ProfileLogOutButton = () => {
  const { showToast } = useToast()
  const handleLogout = () => {
    showToast({
      title: 'Logout',
      type: 'info',
    })
  }

  const color = '#DD6654'

  return (
    <Button
      mode="contained"
      style={{
        width: 96,
        borderRadius: 42,
        backgroundColor: '#1E0906',
      }}
      icon={() => <LogoutIcon color={color} />}
      onPress={handleLogout}
    >
      <AppItemText
        textType="title"
        style={{
          color: color,
        }}
      >
        Log out
      </AppItemText>
    </Button>
  )
}
