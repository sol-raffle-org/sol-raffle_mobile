"use server";

import { GET_AFFILIATE_INFO } from "@/constants/api.const";
import { fetchWithAuthServerSide } from "../server-side-config";
import { GetAffiliateInfoInterface } from "@/types/service.type";

export const getAffiliateInfoService = async (): Promise<
  GetAffiliateInfoInterface | undefined
> => {
  return fetchWithAuthServerSide(GET_AFFILIATE_INFO, { method: "GET" });
};
