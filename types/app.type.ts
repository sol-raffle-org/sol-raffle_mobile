export interface AccountInterface {
  createdAt: string
  id: string
  wallet: string
  name?: string
  email?: string | null
  avatar: string
  referralCode?: string | null
  referralByWallet?: string | null
  level: number
  exp: number
  language: 'en'
  isEmailVerified: boolean
  nextLevelExp: number
}
