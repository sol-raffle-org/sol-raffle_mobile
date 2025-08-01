import { AppItemText } from '@/components/app-item-text'
import { AppView } from '@/components/app-view'
import { LogoutIcon } from '@/components/icons'
import useAccount from '@/hooks/account-hooks/useAccount'
import useAuthentication from '@/hooks/auth-hooks/useAuthentication'
import useAppStore from '@/stores/useAppStore'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { ProfileInformationAvatar } from './profile-information-avatar'
import { ProfileInformationForm } from './profile-information-form'

export function ProfileInformation() {
  const { accountInfo } = useAppStore()
  const { handleUpdateAvatar, handleUpdateName, handleUpdateEmail } = useAccount()

  return (
    <AppView style={{ gap: 16 }}>
      <ProfileInformationAvatar profile={accountInfo} onChange={handleUpdateAvatar} />
      <ProfileInformationForm profile={accountInfo} onChangeName={handleUpdateName} onChangeEmail={handleUpdateEmail} />
      <ProfileLogOutButton />
    </AppView>
  )
}

const ProfileLogOutButton = () => {
  const router = useRouter()
  const { handleLogout } = useAuthentication()

  const handleLogoutClick = () => {
    handleLogout()
    router.replace('/connect-wallet')
  }

  const color = '#DD6654'

  return (
    <Button
      mode="contained"
      style={{
        alignSelf: 'flex-start',
        borderRadius: 42,
        backgroundColor: '#1E0906',
      }}
      icon={() => <LogoutIcon color={color} />}
      onPress={handleLogoutClick}
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
