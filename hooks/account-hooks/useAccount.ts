import { STT_CREATED, STT_OK } from '@/constants/api.const'
import { getClaimReferralRewardService } from '@/services/account-service/affiliate.service'
import { getSolanaRpcEndpoint } from '@/utils/blockchain.utils'

import {
  getAccountInfoService,
  putUpdateEmailService,
  putUpdateNameService,
  putUpdateRefCodeService,
  putUpdateReferByService,
} from '@/services/account-service/account.service'

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
    }
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
    }
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

  return {
    handleUpdateName,
    handleGetBalance,
    handleUpdateEmail,

    handleRequestClaim,
    handleUpdateRefCode,
    handleUpdateReferBy,
    handleGetAccountInfo,
  }
}

export default useAccount
