import { GET_FAIRNESS_JACKPOT, GET_FAIRNESS_JACKPOT_DETAIL, GET_USER_JACKPOT_TRANSACTION } from '@/constants/api.const'

import {
  GetUserJackpotHistoryInterface,
  JackpotFairnessInterface,
  JackpotFairnessTransactionInterface,
} from '@/types/service.type'

import { ApiResponse } from 'apisauce'
import { createDappServices } from '../../client-side-config'

export const getUserJackpotHistoryService = async (page: number, size: number) => {
  const url = `${GET_USER_JACKPOT_TRANSACTION}?pageNum=${page}&pageSize=${size}`
  const dappService = await createDappServices()
  const response: ApiResponse<GetUserJackpotHistoryInterface | undefined> = await dappService.get(url)

  return response?.data
}

export const getJackpotFairnessService = async (page: number, size: number) => {
  const url = `${GET_FAIRNESS_JACKPOT}?pageNum=${page}&pageSize=${size}`
  const dappService = await createDappServices()
  const response: ApiResponse<JackpotFairnessInterface | undefined> = await dappService.get(url)

  return response?.data
}

export const getJackpotFairnessTransactionDetailService = async (roundId: string) => {
  const url = `${GET_FAIRNESS_JACKPOT_DETAIL}?round=${roundId}`
  const dappService = await createDappServices()
  const response: ApiResponse<JackpotFairnessTransactionInterface[] | undefined> = await dappService.get(url)

  return response?.data
}
