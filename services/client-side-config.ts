import { KEY_TOKEN } from '@/constants/app.const'
import { ApiResponseInterface } from '@/types/service.type'
import CookieManager from '@react-native-cookies/cookies'

import { BASE_SOURCE, HEADER_DEFAULT, STT_CREATED, STT_OK, TIMEOUT } from '@/constants/api.const'

import apisauce, { ApiResponse, ApisauceConfig } from 'apisauce'

const getToken = async () => {
  const cookies = await CookieManager.get(BASE_SOURCE)

  const token = cookies[KEY_TOKEN]
  return token
}

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

const createInstance = (token?: string, apiKey?: string, customHeaders?: any) => {
  const newToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjg2NDU4LWUxYTMtNDI2ZS04NjQxLTdhOTA2NmFiNGU2NiIsIndhbGxldEFkZHJlc3MiOiJuV3pMeTZDZlRUUjE5ZFhIUXc0a2E5UUNTM1liRVdiVFNtdFNrakpZcU5BIiwiaWF0IjoxNzUzNDQ5OTAzLCJleHAiOjE3NTQwNTQ3MDN9.5Z-JdcSRE7VJBZU0V-d1dRQehTIGRV1gLum5AFyZs34'

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

export const createDappServices = (token?: string, apiKey?: string, customHeaders?: any) =>
  createInstance(token, apiKey, customHeaders)

export const createPriceFeedApi = (baseURL: string) => {
  const newConfig = {
    ...DEFAULT_CONFIG,
    baseURL,
  }

  const newApi = apisauce.create(newConfig)
  return newApi
}
