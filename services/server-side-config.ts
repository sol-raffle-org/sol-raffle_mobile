"use server";

import { cookies } from "next/headers";
import { KEY_TOKEN } from "@/constants/app.const";

const baseUrl = process.env.DAPP_SERVICE_URL;

export async function fetchWithAuthServerSide(url: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(KEY_TOKEN)?.value;
  const endpoint = baseUrl + url;

  try {
    const res = await fetch(endpoint, {
      ...init,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...init?.headers,
      },
    });

    if (!res.ok) {
      return undefined;
    } else {
      return res.json();
    }
  } catch (error) {
    console.log("Error fetch from server", error);
    return undefined;
  }
}
