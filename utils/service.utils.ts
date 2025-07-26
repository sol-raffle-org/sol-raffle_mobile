import { BaseResponseData } from "@/types/service.type";
import { ApiResponse } from "apisauce";

export const getDappServicesResponseData = <T>(
  response: ApiResponse<BaseResponseData<T>>
): T | undefined => {
  const status = response?.status;
  const data = response?.data;

  if (!status || !data) return undefined;

  if (status >= 400 && status <= 500) return undefined;

  const statusCode = data.statusCode;

  if (statusCode >= 200 && statusCode <= 300) {
    return response.data?.data;
  } else {
    return undefined;
  }
};
