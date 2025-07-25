import { DefaultAvatarImage, Level1Image } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppItemText } from '@/components/app-item-text'
import { AppView } from '@/components/app-view'
import { useToast } from '@/components/toast/app-toast-provider'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

export function ProfileInformationAvatar() {
  const { showToast } = useToast()
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  const handleChangeAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      showToast({
        title: 'Permission denied. You need to allow access to media library.',
        type: 'info',
      })
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // optional crop tool
      aspect: [1, 1], // square
      quality: 0.8,
    })

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri)
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
          source={avatarUri || DefaultAvatarImage}
          style={{
            width: 109,
            height: 109,
          }}
        />
      </AppView>

      <AppView>
        <ProfileView>
          <AppItemText textType="title" style={{ fontSize: 20 }}>
            alrrx345
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
              1
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
