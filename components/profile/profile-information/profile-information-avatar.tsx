import { DefaultAvatarImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppItemText } from '@/components/app-item-text'
import AppLevel from '@/components/app-level'
import { AppView } from '@/components/app-view'
import { useToast } from '@/components/toast/app-toast-provider'
import useAccount from '@/hooks/account-hooks/useAccount'
import useAppStore from '@/stores/useAppStore'
import { getAvatarUrl } from '@/utils/common.utils'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'

export function ProfileInformationAvatar() {
  const { showToast } = useToast()
  const { accountInfo } = useAppStore()
  const { handleUpdateAvatar } = useAccount()

  const handleChangeAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      showToast({
        type: 'info',
        subtitle: 'Permission denied. You need to allow access to media library.',
      })
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // optional crop tool
      aspect: [1, 1], // square
      quality: 1,
    })

    let isSuccess = false
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0]

      isSuccess = await handleUpdateAvatar({
        avatar: {
          uri: asset.uri,
          name: asset.fileName || `avatar.jpg`, // fallback name
          mimeType: asset.mimeType || 'image/jpeg',
          fileName: asset.fileName || `avatar.jpg`,
        },
      })
    }

    if (!result.canceled && !isSuccess) {
      showToast({
        type: 'error',
        subtitle: 'Can not change avatar',
      })
    }
  }

  return (
    <ProfileView>
      <AppView
        style={{
          borderWidth: 2,
          borderColor: '#D19710',
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        <AppImage
          source={accountInfo?.avatar ? getAvatarUrl(accountInfo.avatar) : DefaultAvatarImage}
          style={{
            width: 109,
            height: 109,
          }}
        />
      </AppView>

      <AppView>
        <ProfileView style={{ alignItems: 'center' }}>
          <AppItemText textType="title" style={{ fontSize: 20 }}>
            {accountInfo?.name}
          </AppItemText>
          <AppLevel level={accountInfo?.level} label={accountInfo?.level} />
        </ProfileView>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 42,
            backgroundColor: '#343434',
            gap: 8,
          }}
          onPress={handleChangeAvatar}
        >
          <MaterialIcons name="account-box" size={16} color="#FFFFFFB2" />
          <AppItemText textType="title" style={{ fontSize: 12 }}>
            Change Avatar
          </AppItemText>
        </TouchableOpacity>
      </AppView>
    </ProfileView>
  )
}

const ProfileView = ({ style = {}, ...props }) => (
  <AppView
    style={[{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 16 }, style]}
    {...props}
  />
)
