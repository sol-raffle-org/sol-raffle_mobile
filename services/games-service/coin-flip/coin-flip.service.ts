import {
  GET_FAIRNESS_COIN_FLIP,
  GET_FAIRNESS_COIN_FLIP_DETAIL,
} from "@/constants/api.const";
import { createDappServices } from "@/services/client-side-config";
import { ApiResponse } from "apisauce";

export const getCoinFlipFairnessService = async (
  page: number,
  size: number
) => {
  const url = `${GET_FAIRNESS_COIN_FLIP}?pageNum=${page}&pageSize=${size}`;

  const response: ApiResponse<any | undefined> =
    await createDappServices().get(url);

  return response?.data;
};

export const getCoinFlipFairnessTransactionService = async (
  id: number,
  creator: string
) => {
  const response: ApiResponse<any | undefined> =
    await createDappServices().post(GET_FAIRNESS_COIN_FLIP_DETAIL, {
      gameId: id,
      creatorWallet: creator,
    });

  return response?.data;
};
