import { getSolanaNativeTokenBalance } from "@/utils/blockchain.utils";

const useBalances = () => {
  const handleGetSvmNativeBalanceToken = async (
    walletAddress: string,
    rpcUrl: string
  ) => {
    if (!walletAddress || !rpcUrl) return 0;

    const balance = await getSolanaNativeTokenBalance(walletAddress, rpcUrl);

    return balance;
  };

  return {
    handleGetSvmNativeBalanceToken,
  };
};

export default useBalances;
