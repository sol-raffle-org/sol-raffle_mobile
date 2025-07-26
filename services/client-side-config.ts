import { KEY_TOKEN } from "@/constants/app.const";
import { ApiResponseInterface } from "@/types/service.type";

import {
  STT_OK,
  TIMEOUT,
  STT_CREATED,
  BASE_SOURCE,
  HEADER_DEFAULT,
} from "@/constants/api.const";

import apisauce, { ApiResponse, ApisauceConfig } from "apisauce";

import Cookie from "js-cookie";

const DEFAULT_CONFIG: ApisauceConfig = {
  baseURL: BASE_SOURCE,
  headers: { ...HEADER_DEFAULT },
  timeout: TIMEOUT,
};

const handleErrorRequest = (response: ApiResponse<ApiResponseInterface>) => {
  if (response.status && ![STT_OK, STT_CREATED].includes(response.status)) {
    console.log(response);
  }
};

const Api = apisauce.create(DEFAULT_CONFIG);
export default Api;
Api.addResponseTransform(handleErrorRequest);

const createInstance = (
  token?: string,
  apiKey?: string,
  customHeaders?: any
) => {
  const newToken = token || Cookie.get(KEY_TOKEN);

  if (newToken) {
    Api.setHeader("Authorization", `Bearer ${newToken}`);
  }

  if (apiKey) {
    Api.setHeader("x-api-key", apiKey);
  }

  if (customHeaders) {
    Api.setHeaders(customHeaders);
  }

  return Api;
};

export const createDappServices = (
  token?: string,
  apiKey?: string,
  customHeaders?: any
) => createInstance(token, apiKey, customHeaders);

export const createPriceFeedApi = (baseURL: string) => {
  const newConfig = {
    ...DEFAULT_CONFIG,
    baseURL,
  };

  const newApi = apisauce.create(newConfig);
  return newApi;
};
