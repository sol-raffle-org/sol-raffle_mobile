'use server'

import { KEY_TOKEN } from '@/constants/app.const'
import { DAPP_SERVICE_URL } from '@env'
import { cookies } from 'next/headers'

export async function fetchWithAuthServerSide(url: string, init?: RequestInit) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(KEY_TOKEN)?.value
  const endpoint = DAPP_SERVICE_URL + url

  try {
    const res = await fetch(endpoint, {
      ...init,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...init?.headers,
      },
    })

    if (!res.ok) {
      return undefined
    } else {
      return res.json()
    }
  } catch (error) {
    console.log('Error fetch from server', error)
    return undefined
  }
}
