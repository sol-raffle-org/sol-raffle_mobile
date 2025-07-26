'use client'

import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { KEY_TOKEN } from '@/constants/app.const'

import useAccount from '@/hooks/account-hooks/useAccount'
import useSystem from '@/hooks/system-hooks/useSystem'
import useAppStore from '@/stores/useAppStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthRaffleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { handleGetBalance, handleGetAccountInfo } = useAccount()
  const { handleGetSolPrice } = useSystem()
  const { accountInfo } = useAppStore()

  const [token, setToken] = useState('')

  const handleGetToken = async () => {
    const tokenStorage = await AsyncStorage.getItem(KEY_TOKEN)

    setToken(tokenStorage || '')
  }

  useEffect(() => {
    handleGetToken()
  }, [])

  useEffect(() => {
    if (!token) return

    handleGetAccountInfo()
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleGetSolPrice()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!accountInfo) return

    handleGetBalance()
  }, [accountInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}

export default AuthRaffleProvider
