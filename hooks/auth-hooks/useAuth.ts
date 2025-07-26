import { KEY_TOKEN } from "@/constants/app.const";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";

import {
  getNonceService,
  postVerifyService,
} from "@/services/account-service/auth.service";

import useTracking from "../system-hooks/useTracking";
import useAppStore from "@/stores/useAppStore";
import Cookies from "js-cookie";

const useAuth = () => {
  const { disconnect } = useWallet();
  const { handleLogEvent } = useTracking();
  const { setBalance, setAccountInfo, setReferralInfo, setIsEmitAuthenticate } =
    useAppStore();

  const handleGetNonce = async (address: string) => {
    const responseData = await getNonceService(address);

    return {
      message: responseData?.message || "",
      nonce: responseData?.nonce || "",
    };
  };

  const handleVerify = async (
    nonce: string,
    signature: string,
    address: string
  ) => {
    const responseData = await postVerifyService(nonce, signature, address);
    return {
      accountInfo: responseData?.user,
      token: responseData?.accessToken,
    };
  };

  const handleLogout = async () => {
    if (disconnect) {
      await disconnect();
    }

    setBalance(0);
    setAccountInfo(undefined);
    setReferralInfo(undefined);
    setIsEmitAuthenticate(false);
    handleLogEvent("act_wallet_logout");

    Cookies.remove(KEY_TOKEN);
  };

  const handleGetSolanaAddress = async (wallet: Wallet) => {
    try {
      const account = await wallet?.adapter.publicKey;

      return account?.toString() || "";
    } catch (error) {
      console.error("Error getting solana address:", error);
      return "";
    }
  };

  return { handleGetNonce, handleVerify, handleLogout, handleGetSolanaAddress };
};

export default useAuth;
