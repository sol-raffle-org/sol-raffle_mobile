import { KEY_TOKEN } from '@/constants/app.const'
import { ApiResponseInterface } from '@/types/service.type'

import { BASE_SOURCE, HEADER_DEFAULT, STT_CREATED, STT_OK, TIMEOUT } from '@/constants/api.const'

import apisauce, { ApiResponse, ApisauceConfig } from 'apisauce'

import AsyncStorage from '@react-native-async-storage/async-storage'

const DEFAULT_CONFIG: ApisauceConfig = {
  baseURL: BASE_SOURCE,
  headers: { ...HEADER_DEFAULT },
  timeout: TIMEOUT,
}

const handleErrorRequest = (response: ApiResponse<ApiResponseInterface>) => {
  if (response.status && ![STT_OK, STT_CREATED].includes(response.status)) {
    console.log(response)
  }
}

const Api = apisauce.create(DEFAULT_CONFIG)
export default Api
Api.addResponseTransform(handleErrorRequest)

const createInstance = async (token?: string, apiKey?: string, customHeaders?: any) => {
  const storageToken = await AsyncStorage.getItem(KEY_TOKEN)
  const newToken = token || storageToken

  if (newToken) {
    Api.setHeader('Authorization', `Bearer ${newToken}`)
  }

  if (apiKey) {
    Api.setHeader('x-api-key', apiKey)
  }

  if (customHeaders) {
    Api.setHeaders(customHeaders)
  }

  return Api
}

export const createDappServices = async (token?: string, apiKey?: string, customHeaders?: any) => {
  const res = await createInstance(token, apiKey, customHeaders)
  return res
}

export const createPriceFeedApi = (baseURL: string) => {
  const newConfig = {
    ...DEFAULT_CONFIG,
    baseURL,
  }

  const newApi = apisauce.create(newConfig)
  return newApi
}
