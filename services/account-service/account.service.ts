import { createDappServices } from "../client-side-config";
import { AccountInterface } from "@/types/app.type";
import { ApiResponse } from "apisauce";
import {
  GET_USER,
  PUT_NAME,
  PUT_EMAIL,
  PUT_REFER_BY,
  PUT_REF_CODE,
  POST_UPDATE_AVATAR,
} from "@/constants/api.const";

export const getAccountInfoService = async (): Promise<
  AccountInterface | undefined
> => {
  const response: ApiResponse<AccountInterface> =
    await createDappServices().get(GET_USER);

  return response?.data;
};

export const putUpdateNameService = async (name: string) => {
  const response: ApiResponse<any> = await createDappServices().put(PUT_NAME, {
    name,
  });

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  };
};

export const putUpdateEmailService = async (email: string) => {
  const response: ApiResponse<any> = await createDappServices().put(PUT_EMAIL, {
    email,
  });

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  };
};

export const putUpdateRefCodeService = async (referralCode: string) => {
  const response: ApiResponse<any> = await createDappServices().put(
    PUT_REF_CODE,
    { referralCode }
  );

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  };
};

export const putUpdateAvatarService = async (avatar: any) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const response: ApiResponse<any> = await createDappServices(
    undefined,
    undefined,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  ).post(POST_UPDATE_AVATAR, formData);

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  };
};

export const putUpdateReferByService = async (referralCode: string) => {
  const response: ApiResponse<any> = await createDappServices().put(
    PUT_REFER_BY,
    { referralCode }
  );

  return {
    status: response.status,
    errorCode: response?.data?.errorCode,
    message: response?.data?.message,
    statusCode: response?.data?.statusCode,
  };
};
