import { ClaimReferralRewardInterface } from "@/types/service.type";
import { GET_AFFILIATE_CLAIM } from "@/constants/api.const";
import { createDappServices } from "../client-side-config";
import { ApiResponse } from "apisauce";

export const getClaimReferralRewardService = async () => {
  const response: ApiResponse<ClaimReferralRewardInterface> =
    await createDappServices().get(GET_AFFILIATE_CLAIM);
  const responseData = response?.data || ({} as ClaimReferralRewardInterface);

  return { status: response.status, data: responseData };
};
