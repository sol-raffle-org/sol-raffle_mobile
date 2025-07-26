import { GET_SYSTEM_STATS, GET_SYSTEM_TOP_WEEK } from '@/constants/api.const'

import { SystemStatsServiceType, SystemTopPlayerType } from '@/types/service.type'
import { ApiResponse } from 'apisauce'
import { createDappServices } from '../client-side-config'

export const getSystemStatsService = async (): Promise<SystemStatsServiceType | undefined> => {
  const api = await createDappServices()
  const response: ApiResponse<SystemStatsServiceType> = await api.get(GET_SYSTEM_STATS)

  return response?.data
}

export const getSystemTopPlayerService = async (): Promise<SystemTopPlayerType[] | undefined> => {
  const api = await createDappServices()
  const response: ApiResponse<SystemTopPlayerType[]> = await api.get(GET_SYSTEM_TOP_WEEK)

  return response?.data
}
