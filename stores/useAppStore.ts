import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";
import { AccountInterface } from "@/types/app.type";
import { createWithEqualityFn } from "zustand/traditional";
import {
  SystemStatsServiceType,
  GetAffiliateInfoInterface,
} from "@/types/service.type";
import { Socket } from "socket.io-client";

interface AppStore {
  soundOn: boolean;
  setSoundOn: (value: boolean) => void;

  appSocket: Socket | null;
  setAppSocket: (value: Socket | null) => void;

  isEmitAuthenticate: boolean;
  setIsEmitAuthenticate: (value: boolean) => void;

  solPrice: number;
  setSolPrice: (value: number) => void;

  isShowSplash: boolean;
  setIsShowSplash: (value: boolean) => void;

  isOpenConnectDialog: boolean;
  setIsOpenConnectDialog: (value: boolean) => void;

  accountInfo?: AccountInterface;
  setAccountInfo: (value: AccountInterface | undefined) => void;

  balance: number;
  setBalance: (value: number) => void;

  systemStats?: SystemStatsServiceType;
  setSystemStats: (value?: SystemStatsServiceType) => void;

  referralInfo?: GetAffiliateInfoInterface;
  setReferralInfo: (value?: GetAffiliateInfoInterface) => void;

  isShowNavigation: boolean;
  setIsShowNavigation: (value: boolean) => void;
}

const useAppStore = createWithEqualityFn<AppStore>()(
  persist(
    set => ({
      soundOn: true,
      setSoundOn: (value: boolean) => set({ soundOn: value }),

      appSocket: null,
      setAppSocket: (value: Socket | null) => set({ appSocket: value }),

      isEmitAuthenticate: false,
      setIsEmitAuthenticate: (value: boolean) =>
        set({ isEmitAuthenticate: value }),

      solPrice: 0,
      setSolPrice: (value: number) => set({ solPrice: value }),

      isShowSplash: true,
      setIsShowSplash: value => set({ isShowSplash: value }),

      isOpenConnectDialog: false,
      setIsOpenConnectDialog: (value: boolean) =>
        set({ isOpenConnectDialog: value }),

      accountInfo: undefined,
      setAccountInfo: (value: AccountInterface | undefined) =>
        set({ accountInfo: value }),

      balance: 0,
      setBalance: (value: number) => set({ balance: value }),

      systemStats: undefined,
      setSystemStats: (value?: SystemStatsServiceType) =>
        set({ systemStats: value }),

      referralInfo: undefined,
      setReferralInfo: (value?: GetAffiliateInfoInterface) =>
        set({ referralInfo: value }),

      isShowNavigation: true,
      setIsShowNavigation: value => set({ isShowNavigation: value }),
    }),
    {
      name: "app-store",
      partialize: state => ({
        soundOn: state.soundOn,
        solPrice: state.solPrice,
        systemStats: state.systemStats,
        referralInfo: state.referralInfo,
        isShowNavigation: state.isShowNavigation,
      }),
    }
  ),
  shallow
);

export default useAppStore;
