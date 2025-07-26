import { createPriceFeedApi } from "../client-side-config";
import { GET_LATEST_PRICE } from "@/constants/api.const";
import { ApiResponse } from "apisauce";

export const getSolanaLatestPrice = async (): Promise<number> => {
  const priceFeedId = process.env.SOL_PRICE_FEED_ID;

  const queryString = `?ids[]=${priceFeedId}&`;

  const url = GET_LATEST_PRICE + queryString;

  const response: ApiResponse<any> = await createPriceFeedApi(
    process.env.PYTH_SERVICE_URL || ""
  ).get(url);

  if (!response.status) return 0;

  if (response.status >= 200 && response.status < 300) {
    const responseData = response.data;

    if (!responseData) return 0;

    const prideData = responseData.parsed[0];
    const price = prideData
      ? Number(prideData.price.price) * Math.pow(10, prideData.price.expo)
      : 0;

    return price;
  } else {
    return 0;
  }
};
