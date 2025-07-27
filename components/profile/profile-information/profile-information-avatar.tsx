import { DefaultAvatarImage, Level1Image } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppItemText } from '@/components/app-item-text'
import { AppView } from '@/components/app-view'
import { useToast } from '@/components/toast/app-toast-provider'
import { AccountInterface } from '@/types/app.type'
import { getAvatarUrl } from '@/utils/common.utils'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'

interface ProfileInformationAvatarProps {
  profile?: AccountInterface
  onChange: (data: any) => Promise<boolean>
}

export function ProfileInformationAvatar({ profile, onChange }: ProfileInformationAvatarProps) {
  const { showToast } = useToast()

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
    if (!result.canceled && result.assets.length > 0 && result.assets[0].file) {
      const asset = result.assets[0]

      isSuccess = await onChange({
        avatar: {
          uri: asset.uri,
          name: asset.fileName || `avatar.jpg`, // fallback name
          type: asset.type || 'image/jpeg',
        },
      })
    }

    console.log({ isSuccess, result: result.assets })

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
          source={profile?.avatar ? getAvatarUrl(profile.avatar) : DefaultAvatarImage}
          style={{
            width: 109,
            height: 109,
          }}
        />
      </AppView>

      <AppView>
        <ProfileView>
          <AppItemText textType="title" style={{ fontSize: 20 }}>
            {profile?.name}
          </AppItemText>
          <AppView
            style={{
              backgroundColor: '#0D9C6D33',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              borderRadius: 2,
            }}
          >
            <AppImage
              source={Level1Image}
              style={{
                width: 11,
                height: 11,
              }}
            />
            <AppItemText textType="title" style={{ fontSize: 10, color: '#81F70D' }}>
              {profile?.level}
            </AppItemText>
          </AppView>
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
