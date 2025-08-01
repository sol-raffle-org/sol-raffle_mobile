import { GET_USER, POST_UPDATE_AVATAR, PUT_EMAIL, PUT_NAME, PUT_REFER_BY, PUT_REF_CODE } from '@/constants/api.const'
import { AccountInterface } from '@/types/app.type'
import { ApiResponse } from 'apisauce'
import { createDappServices } from '../client-side-config'

export const getAccountInfoService = async (): Promise<AccountInterface | undefined> => {
  const dappService = await createDappServices()
  const response: ApiResponse<AccountInterface> = await dappService.get(GET_USER)

  return response?.data
}

export const putUpdateNameService = async (name: string) => {
  const dappService = await createDappServices()
  const response: ApiResponse<any> = await dappService.put(PUT_NAME, {
    name,
  })

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  }
}

export const putUpdateEmailService = async (email: string) => {
  const dappService = await createDappServices()
  const response: ApiResponse<any> = await dappService.put(PUT_EMAIL, {
    email,
  })

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  }
}

export const putUpdateRefCodeService = async (referralCode: string) => {
  const dappService = await createDappServices()
  const response: ApiResponse<any> = await dappService.put(PUT_REF_CODE, { referralCode })

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  }
}

export const putUpdateReferByService = async (referralCode: string) => {
  const dappService = await createDappServices()
  const response: ApiResponse<any> = await dappService.put(PUT_REFER_BY, { referralCode })

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  }
}

export const putUpdateAvatarService = async (avatar: any) => {
  const formData = new FormData()
  formData.append('avatar', avatar)

  const api = await createDappServices(undefined, undefined)
  const response: ApiResponse<any> = await api.post(POST_UPDATE_AVATAR, formData)

  return {
    ...response,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  }
}
