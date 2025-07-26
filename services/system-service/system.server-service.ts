"use server";

import { GET_SYSTEM_STATS, GET_SYSTEM_TOP_WEEK } from "@/constants/api.const";
import { fetchWithAuthServerSide } from "../server-side-config";

import {
  SystemTopPlayerType,
  SystemStatsServiceType,
} from "@/types/service.type";

export const getSystemStatsService = async (): Promise<
  SystemStatsServiceType | undefined
> => {
  return fetchWithAuthServerSide(GET_SYSTEM_STATS, { method: "GET" });
};

export const getSystemTopPlayerService = async (): Promise<
  SystemTopPlayerType[] | undefined
> => {
  return fetchWithAuthServerSide(GET_SYSTEM_TOP_WEEK, { method: "GET" });
};
