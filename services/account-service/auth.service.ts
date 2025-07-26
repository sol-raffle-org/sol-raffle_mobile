import { ApiResponse } from "apisauce";
import { createDappServices } from "../client-side-config";
import { GET_NONCE, POST_VERIFY } from "@/constants/api.const";
import {
  GetNonceServiceType,
  PostVerifyServiceType,
} from "@/types/service.type";

export const getNonceService = async (
  address: string
): Promise<GetNonceServiceType | undefined> => {
  const response: ApiResponse<GetNonceServiceType> =
    await createDappServices().post(GET_NONCE, {
      walletAddress: address,
    });

  return response?.data;
};

export const postVerifyService = async (
  nonce: string,
  signature: string,
  address: string
): Promise<PostVerifyServiceType | undefined> => {
  const response: ApiResponse<PostVerifyServiceType> =
    await createDappServices().post(POST_VERIFY, {
      nonce: nonce,
      signature: signature,
      walletAddress: address,
    });

  return response?.data;
};
