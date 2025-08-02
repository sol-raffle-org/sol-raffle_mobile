import { GET_USER, POST_UPDATE_AVATAR, PUT_EMAIL, PUT_NAME, PUT_REF_CODE, PUT_REFER_BY } from '@/constants/api.const'
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
  formData.append('avatar', {
    uri: avatar.avatar.uri,
    type: avatar.avatar.mimeType,
    name: avatar.avatar.name,
  } as any)

  const api = await createDappServices()
  const response: ApiResponse<any> = await api.post(POST_UPDATE_AVATAR, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return {
    ...response,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  }
}
