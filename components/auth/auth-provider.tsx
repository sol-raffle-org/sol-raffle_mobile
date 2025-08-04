import { Account, useAuthorization } from '@/components/solana/use-authorization'
import { useMobileWallet } from '@/components/solana/use-mobile-wallet'
import { AppConfig } from '@/constants/app-config'
import { KEY_TOKEN } from '@/constants/app.const'
import useAuthentication from '@/hooks/auth-hooks/useAuthentication'
import useAppStore from '@/stores/useAppStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import bs58 from 'bs58'
import { createContext, type PropsWithChildren, use, useEffect, useMemo, useState } from 'react'

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  isConnected: boolean
  connect: () => Promise<Account>
  signIn: () => Promise<Account>
  signOut: () => Promise<void>
  handleSignMessage: () => Promise<boolean>
}

const Context = createContext<AuthState>({} as AuthState)

export function useAuth() {
  const value = use(Context)
  if (!value) {
    throw new Error('useAuth must be wrapped in a <AuthProvider />')
  }

  return value
}

function useSignInMutation() {
  const { signIn } = useMobileWallet()

  return useMutation({
    mutationFn: async () =>
      await signIn({
        uri: AppConfig.uri,
      }),
  })
}

function useConnectMutation() {
  const { connect } = useMobileWallet()

  return useMutation({
    mutationFn: async () => await connect(),
  })
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { signMessage } = useMobileWallet()
  const { selectedAccount, isLoading, accounts } = useAuthorization()
  const { setAccountInfo } = useAppStore()
  const { handleGetNonce, handleVerify, handleLogout } = useAuthentication()
  const signInMutation = useSignInMutation()
  const connectMutation = useConnectMutation()

  const [hasToken, setHasToken] = useState(false)

  const handleSignMessage = async () => {
    if (!selectedAccount) return false

    const { nonce, message } = await handleGetNonce(selectedAccount.publicKey.toString())

    if (!nonce || !message) return false

    const encodedMessage = new TextEncoder().encode(message)
    const res = await signMessage(encodedMessage)
    const signature = res ? bs58.encode(res) : ''

    const { accountInfo, token } = await handleVerify(nonce, signature, selectedAccount.publicKey.toString())

    if (token && accountInfo) {
      setAccountInfo(accountInfo)
      AsyncStorage.setItem(KEY_TOKEN, token)
      await handleGetToken()
      return true
    }

    return false
  }

  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    setHasToken(Boolean(token))
  }

  useEffect(() => {
    handleGetToken()
  }, [selectedAccount])

  const value: AuthState = useMemo(
    () => ({
      connect: async () => await connectMutation.mutateAsync(),
      signIn: async () => await signInMutation.mutateAsync(),
      signOut: async () => await handleLogout(),
      handleSignMessage: async () => await handleSignMessage(),
      isAuthenticated: hasToken,
      isConnected: (accounts?.length ?? 0) > 0,
      isLoading: signInMutation.isPending || isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accounts, signInMutation, isLoading, hasToken],
  )

  return <Context value={value}>{children}</Context>
}
