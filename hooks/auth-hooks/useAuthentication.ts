import { useMobileWallet } from '@/components/solana/use-mobile-wallet'
import { KEY_TOKEN } from '@/constants/app.const'

import { getNonceService, postVerifyService } from '@/services/account-service/auth.service'

import useAppStore from '@/stores/useAppStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAuthentication = () => {
  const { disconnect } = useMobileWallet()
  const { setBalance, setAccountInfo, setReferralInfo, setIsEmitAuthenticate } = useAppStore()

  const handleGetNonce = async (address: string) => {
    const responseData = await getNonceService(address)

    return {
      message: responseData?.message || '',
      nonce: responseData?.nonce || '',
    }
  }

  const handleVerify = async (nonce: string, signature: string, address: string) => {
    const responseData = await postVerifyService(nonce, signature, address)
    return {
      accountInfo: responseData?.user,
      token: responseData?.accessToken,
    }
  }

  const handleLogout = async () => {
    disconnect()
    setBalance(0)
    setAccountInfo(undefined)
    setReferralInfo(undefined)
    setIsEmitAuthenticate(false)

    AsyncStorage.removeItem(KEY_TOKEN)
  }

  return { handleGetNonce, handleVerify, handleLogout }
}

export default useAuthentication
