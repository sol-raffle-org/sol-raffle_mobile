import { logEvent } from "firebase/analytics";
import { useSearchParams } from "next/navigation";
import { initAnalytics } from "@/utils/firebase.utils";

import useAppStore from "@/stores/useAppStore";

const useTracking = () => {
  const searchParams = useSearchParams();
  const { accountInfo, balance } = useAppStore();

  const utm_source = searchParams.get("utm_source") || "direct";
  const utm_medium = searchParams.get("utm_medium") || "none";
  const utm_campaign = searchParams.get("utm_campaign") || "none";

  const handleLogEvent = (
    eventName: string,
    customParams?: { [x: string]: any }
  ) => {
    try {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobile = /android|iphone|ipad|mobile/i.test(userAgent);

      const defaultParams = {
        utm_source,
        utm_medium,
        utm_campaign,
        wallet: accountInfo?.wallet || "",
        balance: balance || "",
        level: accountInfo?.level || "",
        timestamp: Math.ceil(Date.now()),
        user_agent: isMobile ? "mobile" : "desktop",
      };

      initAnalytics().then(analytics => {
        if (analytics) {
          logEvent(analytics, eventName, {
            ...defaultParams,
            ...customParams,
          });
        }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return { handleLogEvent };
};

export default useTracking;
