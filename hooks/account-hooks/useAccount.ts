import { useTranslations } from "next-intl";
import { STT_CREATED, STT_OK } from "@/constants/api.const";
import { getSolanaRpcEndpoint } from "@/utils/blockchain.utils";
import { getClaimReferralRewardService } from "@/services/account-service/affiliate.service";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/common/custom-toast";
import {
  putUpdateNameService,
  getAccountInfoService,
  putUpdateEmailService,
  putUpdateRefCodeService,
  putUpdateAvatarService,
  putUpdateReferByService,
} from "@/services/account-service/account.service";

import useAppStore from "@/stores/useAppStore";
import useBalances from "../blockchain-hooks/useBalance";

const useAccount = () => {
  const t = useTranslations("Profile");

  const { accountInfo, setBalance, setAccountInfo } = useAppStore();
  const { handleGetSvmNativeBalanceToken } = useBalances();

  const handleGetAccountInfo = async () => {
    const responseData = await getAccountInfoService();

    setAccountInfo(responseData);
  };

  const handleUpdateName = async (name: string) => {
    const { status, message } = await putUpdateNameService(name);

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo();
      showSuccessToast(t("msgUpdateNameSuccessfully"));
    } else {
      showErrorToast(message || "Error");
    }
  };

  const handleGetBalance = async () => {
    if (!accountInfo) return;

    const rpc = getSolanaRpcEndpoint();

    const nativeBalance = await handleGetSvmNativeBalanceToken(
      accountInfo.wallet,
      rpc
    );

    setBalance(nativeBalance);
  };

  const handleUpdateEmail = async (email: string) => {
    const { status, message } = await putUpdateEmailService(email);

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo();
      showSuccessToast(t("msgUpdateEmailSuccessfully"));
    } else {
      showErrorToast(message || "Error");
    }
  };

  const handleUpdateRefCode = async (refCode: string) => {
    const { status, message } = await putUpdateRefCodeService(refCode);

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo();
      showSuccessToast(t("msgUpdateRefCodeSuccessfully"));
    } else {
      showErrorToast(message || "Error");
    }
  };

  const handleUpdateReferBy = async (refCode: string, showToast?: boolean) => {
    const { status, message } = await putUpdateReferByService(refCode);

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo();

      if (showToast) {
        showSuccessToast(t("msgUpdateRefByWalletSuccessfully"));
      }
    }

    if (message && showToast) {
      showErrorToast(message || "Error");
    }
  };

  const handleUpdateAvatar = async (file: any) => {
    const { status, message } = await putUpdateAvatarService(file);

    if (status === STT_OK || status === STT_CREATED) {
      handleGetAccountInfo();
      showSuccessToast(t("msgUpdateAvatarSuccessfully"));
      return true;
    } else {
      showErrorToast(message || "Error");
      return false;
    }
  };

  const handleRequestClaim = async () => {
    const { data: responseData, status } =
      await getClaimReferralRewardService();

    const { data, message } = responseData;

    if (status === STT_OK || status === STT_CREATED || data) {
      showSuccessToast(t("msgRequestClaimRewardSuccessfully"));
      return data;
    } else {
      showErrorToast(message || "Error");
      return;
    }
  };

  return {
    handleUpdateName,
    handleGetBalance,
    handleUpdateEmail,
    handleUpdateAvatar,
    handleRequestClaim,
    handleUpdateRefCode,
    handleUpdateReferBy,
    handleGetAccountInfo,
  };
};

export default useAccount;
