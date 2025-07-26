import { GameWinImage, InfoImage, LevelUpImage } from '@/assets/images'
import { AppImage } from '@/components/app-image'
import { AppItemText } from '@/components/app-item-text'
import { useAppTheme } from '@/components/app-theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

export type AppToastType = 'success' | 'error' | 'info' | 'game-win' | 'level-up'

export type AppToastProps = {
  visible: boolean
  type?: AppToastType
  title?: string
  subtitle?: string
  onDismiss?: () => void
  duration?: number
}

const { width } = Dimensions.get('window')

export const AppToast = ({ visible, type = 'info', title, subtitle, onDismiss, duration = 3000 }: AppToastProps) => {
  const slideAnim = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start()

      const timer = setTimeout(() => {
        hideToast()
      }, duration)

      return () => clearTimeout(timer) // Cleanup on unmount or visibility change
    } else {
      hideToast()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) onDismiss()
    })
  }

  if (!visible) return null

  return (
    <AppToastSlide
      style={[
        {
          transform: [{ translateY: slideAnim }],
          backgroundColor: getBackgroundColor(type),
        },
      ]}
    >
      <AppToastDividerTop type={type} />

      <AppToastIcon type={type} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 8 }}>
        <AppItemText textType="title" color={getTitleColor(type)}>
          {title || getTitleText(type)}
        </AppItemText>

        {subtitle && (
          <AppItemText textType="subtitle" color="#FFFFFFB2">
            {subtitle}
          </AppItemText>
        )}
      </View>

      <TouchableOpacity onPress={hideToast}>
        <MaterialCommunityIcons name="close" size={20} color="#D9D9D94D" />
      </TouchableOpacity>
    </AppToastSlide>
  )
}

const AppToastSlide = ({ style, ...props }: { style?: StyleProp<ViewStyle>; [key: string]: any }) => {
  const { spacing } = useAppTheme()
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: spacing.md,
          right: spacing.md,
          marginTop: 48,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          zIndex: 9999,
          elevation: 4,
          width: width - 32,
          alignSelf: 'center',
        },
        style,
      ]}
      {...props}
    />
  )
}

const AppToastDividerTop = ({ type }: { type: AppToastType }) => {
  const getDividerColor = () => {
    switch (type) {
      case 'error':
        return '#DD6654'
      case 'success':
        return '#76D638'
      case 'level-up':
        return '#F9BB0F'
      case 'game-win':
        return '#D68738'
      case 'info':
        return '#FFFFFF'
      default:
        return '#76D638'
    }
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        style={{
          backgroundColor: getDividerColor(),
          height: 2,
        }}
      />
    </View>
  )
}

const AppToastIcon = ({ type }: { type: AppToastType }) => {
  switch (type) {
    case 'error':
      return <MaterialCommunityIcons name="close-circle" size={24} color="#DD6654" />

    case 'success':
      return <MaterialCommunityIcons name="check-circle" size={24} color="#76D638" />

    case 'level-up':
      return <AppImage source={LevelUpImage} style={{ width: 32, height: 38 }} />

    case 'game-win':
      return <AppImage source={GameWinImage} style={{ width: 32, height: 38 }} />

    case 'info':
      return <AppImage source={InfoImage} style={{ width: 32, height: 38 }} />

    default:
      return 'information'
  }
}

const getBackgroundColor = (type: AppToastType) => {
  switch (type) {
    case 'error':
      return '#1E0906'
    case 'success':
      return '#0A100B'
    default:
      return '#161B18'
  }
}

const getTitleColor = (type: AppToastType) => {
  switch (type) {
    case 'error':
      return '##DD6654'
    case 'success':
      return '#76D638'

    default:
      return '#fff'
  }
}

const getTitleText = (type: AppToastType) => {
  switch (type) {
    case 'error':
      return 'Error Alert'

    case 'success':
      return 'Success'

    case 'level-up':
      return 'Level up! (lvl 1)'

    case 'game-win':
      return 'Game win'

    case 'info':

    default:
      return 'information'
  }
}
