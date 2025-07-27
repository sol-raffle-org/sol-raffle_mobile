import { STT_CREATED, STT_OK } from '@/constants/api.const'
import {
  getAccountInfoService,
  putUpdateAvatarService,
  putUpdateEmailService,
  putUpdateNameService,
  putUpdateRefCodeService,
  putUpdateReferByService,
} from '@/services/account-service/account.service'
import { getClaimReferralRewardService } from '@/services/account-service/affiliate.service'
import { getSolanaRpcEndpoint } from '@/utils/blockchain.utils'

import useAppStore from '@/stores/useAppStore'
import useBalances from '../blockchain-hooks/useBalance'

const useAccount = () => {
  const { accountInfo, setBalance, setAccountInfo } = useAppStore()
  const { handleGetSvmNativeBalanceToken } = useBalances()

  const handleGetAccountInfo = async () => {
    const responseData = await getAccountInfoService()

    setAccountInfo(responseData)
  }

  const handleUpdateName = async (name: string) => {
    const { status } = await putUpdateNameService(name)

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo()
      return true
    }

    return false
  }

  const handleGetBalance = async () => {
    if (!accountInfo) return

    const rpc = getSolanaRpcEndpoint()

    const nativeBalance = await handleGetSvmNativeBalanceToken(accountInfo.wallet, rpc)

    setBalance(nativeBalance)
  }

  const handleUpdateEmail = async (email: string) => {
    const { status } = await putUpdateEmailService(email)

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo()
      return true
    }

    return false
  }

  const handleUpdateRefCode = async (refCode: string) => {
    const { status } = await putUpdateRefCodeService(refCode)

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo()
    }
  }

  const handleUpdateReferBy = async (refCode: string, showToast?: boolean) => {
    const { status, message } = await putUpdateReferByService(refCode)

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo()

      if (showToast) {
      }
    }

    if (message && showToast) {
    }
  }

  const handleRequestClaim = async () => {
    const { data: responseData, status } = await getClaimReferralRewardService()

    const { data } = responseData

    if (status === STT_OK || status === STT_CREATED || data) {
      return data
    } else {
      return
    }
  }

  const handleUpdateAvatar = async (file: any) => {
    const { status } = await putUpdateAvatarService(file)

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo()
      return true
    } else {
      return false
    }
  }

  return {
    handleUpdateName,
    handleGetBalance,
    handleUpdateEmail,

    handleRequestClaim,
    handleUpdateRefCode,
    handleUpdateReferBy,
    handleGetAccountInfo,
    handleUpdateAvatar,
  }
}

export default useAccount
