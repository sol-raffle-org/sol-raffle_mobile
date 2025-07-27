import { DefaultAvatarImage, SolanaLogo } from '@/assets/images'
import React from 'react'
import { View } from 'react-native'
import { AppCircle } from '../app-circle'
import { AppImage } from '../app-image'
import { AppItemText } from '../app-item-text'
import { AppView, AppViewProps } from '../app-view'
import { CopyIcon } from '../icons'

export function JackpotPlayInRound() {
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <JackpotRow
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
        }}
      >
        <JackpotRow style={{ gap: 4 }}>
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Total Player:
          </AppItemText>
          <AppItemText>10</AppItemText>
        </JackpotRow>
        <JackpotRow style={{ gap: 4 }}>
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Round:
          </AppItemText>
          <AppItemText>22334</AppItemText>
        </JackpotRow>
      </JackpotRow>

      <AppView>
        {new Array(10).fill(0).map((_, index) => (
          <JackpotPlayer key={index} />
        ))}
      </AppView>

      <JackpotRow
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
        }}
      >
        <JackpotRow style={{ gap: 4 }}>
          <CopyIcon color="#FFFFFF8C" />
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            Hash seed: ea9d5...
          </AppItemText>
        </JackpotRow>
        <JackpotRow style={{ gap: 4 }}>
          <CopyIcon color="#FFFFFF8C" />
          <AppItemText textType="subtitle" color="#FFFFFF8C">
            EOS Block: Waiting
          </AppItemText>
        </JackpotRow>
      </JackpotRow>
    </View>
  )
}

const JackpotPlayer = () => {
  return (
    <AppView
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#19E18733',
        padding: 16,
        borderRadius: 16,
      }}
    >
      <JackpotRow style={{ gap: 4 }}>
        <JackpotPlayerAvatar />
        <AppItemText>Name</AppItemText>
        <AppCircle
          style={{
            borderWidth: 2,
            borderColor: '#ffffff40',
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <AppItemText style={{ fontSize: 12 }}>1</AppItemText>
        </AppCircle>
      </JackpotRow>

      <JackpotRow style={{ gap: 8 }}>
        <AppImage source={SolanaLogo} style={{ width: 24, height: 24 }} />
        <View>
          <AppItemText>0.030</AppItemText>
          <AppItemText
            textType="subtitle"
            style={{
              color: '#FFFFFF99',
              fontSize: 12,
            }}
          >
            ~$4.98
          </AppItemText>
        </View>
      </JackpotRow>

      <View>
        <AppItemText
          textType="subtitle"
          style={{
            color: '#FFF',
            fontSize: 12,
          }}
        >
          Chance
        </AppItemText>
        <AppItemText>30.90%</AppItemText>
      </View>
    </AppView>
  )
}

const JackpotRow = ({ style, ...props }: AppViewProps) => (
  <AppView style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...props} />
)

const JackpotPlayerAvatar = ({ avatar }) => (
  <AppView
    style={{
      borderWidth: 2,
      borderColor: '#D19710',
      borderRadius: 10,
      overflow: 'hidden',
    }}
  >
    <AppImage
      source={avatar || DefaultAvatarImage}
      style={{
        width: 32,
        height: 32,
      }}
    />
  </AppView>
)
