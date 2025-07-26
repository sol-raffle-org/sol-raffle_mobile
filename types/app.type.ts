export interface AccountInterface {
  createdAt: string;
  id: string;
  wallet: string;
  name?: string;
  email?: string;
  avatar: string;
  referralCode?: string;
  referralByWallet?: string;
  level: number;
  exp: number;
  language: "en";
  isEmailVerified: boolean;
}
