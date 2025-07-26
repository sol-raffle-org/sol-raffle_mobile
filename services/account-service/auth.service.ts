import { GET_NONCE, POST_VERIFY } from '@/constants/api.const'
import { GetNonceServiceType, PostVerifyServiceType } from '@/types/service.type'
import { ApiResponse } from 'apisauce'
import { createDappServices } from '../client-side-config'

export const getNonceService = async (address: string): Promise<GetNonceServiceType | undefined> => {
  const dappService = await createDappServices()
  const response: ApiResponse<GetNonceServiceType> = await dappService.post(GET_NONCE, {
    walletAddress: address,
  })
  console.log(response)
  return response?.data
}

export const postVerifyService = async (
  nonce: string,
  signature: string,
  address: string,
): Promise<PostVerifyServiceType | undefined> => {
  const dappService = await createDappServices()

  const response: ApiResponse<PostVerifyServiceType> = await dappService.post(POST_VERIFY, {
    nonce: nonce,
    signature: signature,
    walletAddress: address,
  })

  return response?.data
}
