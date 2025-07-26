"use client";

import { FC, PropsWithChildren, useEffect } from "react";

import { KEY_TOKEN } from "@/constants/app.const";

import Cookies from "js-cookie";
import useAppStore from "@/stores/useAppStore";
import useAccount from "@/hooks/account-hooks/useAccount";
import useSystem from "@/hooks/system-hooks/useSystem";
import { useWallet } from "@solana/wallet-adapter-react";
import useAuth from "@/hooks/auth-hooks/useAuth";
import useJackpotStore from "@/stores/useJackpotStore";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const token = Cookies.get(KEY_TOKEN);

  const { handleGetBalance, handleGetAccountInfo } = useAccount();
  const { setCurrentAddressBetAccount } = useJackpotStore();
  const { handleGetSolPrice } = useSystem();
  const { accountInfo } = useAppStore();
  const { handleLogout } = useAuth();
  const { publicKey } = useWallet();

  const handleDisconnect = () => {
    setCurrentAddressBetAccount(undefined);
    handleLogout();
  };

  useEffect(() => {
    if (!token) return;

    handleGetAccountInfo();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleGetSolPrice();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!accountInfo) return;

    handleGetBalance();
  }, [accountInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!accountInfo || !publicKey) return;

    if (accountInfo.wallet !== publicKey.toString()) {
      handleDisconnect();
    }
  }, [publicKey, accountInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};

export default AuthProvider;
