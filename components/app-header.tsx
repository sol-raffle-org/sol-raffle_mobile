import { CoinHeadLeanImage, SolanaLogo } from '@/assets/images'
import useAppStore from '@/stores/useAppStore'
import { truncateHash } from '@/utils/common.utils'
import Entypo from '@expo/vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Menu } from 'react-native-paper'
import { AppImage } from './app-image'
import { AppText } from './app-text'
import { AppView } from './app-view'
import { useAuth } from './auth/auth-provider'
import { LogoutIcon, UserBoxIcon } from './icons'

export function AppHeader() {
  return (
    <View style={styles.header}>
      <AppImage source={CoinHeadLeanImage} style={styles.headerLogo} />

      <AppView style={styles.content}>
        <AccountDropdown />
      </AppView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  headerLogo: { width: 42, height: 39, marginRight: 10, resizeMode: 'cover' },
  content: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
})

const AccountDropdown = () => {
  const { signOut } = useAuth()
  const router = useRouter()
  const { accountInfo } = useAppStore()

  const [isOpen, setIsOpen] = useState(false)

  const accountDropdownItems: {
    title: string
    href: string
    left: () => React.ReactElement
  }[] = [
    {
      title: 'Profile',
      href: '/profile',
      left: () => <UserBoxIcon color="#ffffffb3" />,
    },
    {
      title: 'Logout',
      href: '/connect-wallet',
      left: () => <LogoutIcon color="#FF0000" />,
    },
  ]

  const handlePress = (item: { title: string; href: any }) => async () => {
    setIsOpen(false)
    if (item.title === 'Logout') {
      await signOut()
      router.replace(item.href)
    } else {
      router.push(item.href)
    }
  }

  return (
    <Menu
      visible={isOpen}
      onDismiss={() => setIsOpen(false)}
      anchor={
        <Pressable style={accountDropdownStyles.button} onPress={() => setIsOpen(!isOpen)}>
          <LinearGradient
            colors={['rgba(153, 69, 255, 0.15)', 'rgba(153, 69, 255, 0.075)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />

          <View style={accountDropdownStyles.circleBorder}>
            <AppImage source={SolanaLogo} style={{ width: 24, height: 24 }} />
          </View>

          <AppText style={accountDropdownStyles.text}>{truncateHash(accountInfo?.wallet)}</AppText>
          <Entypo name="chevron-down" size={24} color="#FFFFFF4D" />
        </Pressable>
      }
      style={accountDropdownStyles.container}
    >
      {accountDropdownItems.map((optionItem, index) => (
        <Menu.Item
          key={index}
          title={
            <AppText
              style={[{ color: optionItem.title === 'Logout' ? '#FF0000' : '#FFFFFF' }, accountDropdownStyles.textItem]}
            >
              {optionItem.title}
            </AppText>
          }
          leadingIcon={optionItem.left}
          onPress={handlePress(optionItem)}
        />
      ))}
    </Menu>
  )
}

const accountDropdownStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    padding: 8,
  },
  circleBorder: {
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: '#FFFFFF4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'InriaSans-Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
    color: '#FFFFFF',
  },
  textItem: {
    fontFamily: 'InriaSans-Bold',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    color: '#FFFFFF',
  },
})
