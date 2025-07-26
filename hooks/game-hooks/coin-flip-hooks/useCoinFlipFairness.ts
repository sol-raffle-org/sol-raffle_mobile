import { showErrorToast } from "@/components/common/custom-toast";
import { DEFAULT_PAGE_SIZE } from "@/constants/api.const";
import {
  getCoinFlipFairnessService,
  getCoinFlipFairnessTransactionService,
} from "@/services/games-service/coin-flip/coin-flip.service";
import useCoinFlipStore from "@/stores/useCoinflipStore";

const useCoinFlipFairness = () => {
  const { setPage, setTotalItems, setCoinFlipFairness, setCurrentTransaction } =
    useCoinFlipStore();

  const handleGetCoinFlipFairness = async (page: number) => {
    const response = await getCoinFlipFairnessService(page, DEFAULT_PAGE_SIZE);

    if (!response) return;

    setCoinFlipFairness(response.pageData);
    setTotalItems(response.total);
    setPage(response.pageNum);
  };

  const handleGetCoinFlipFairnessTransaction = async (
    gameId: number,
    creatorWallet: string
  ) => {
    const response = await getCoinFlipFairnessTransactionService(
      gameId,
      creatorWallet
    );

    if (!response || !Array.isArray(response)) {
      showErrorToast("Error");
      return;
    }

    setCurrentTransaction(response);

    return response;
  };

  return { handleGetCoinFlipFairness, handleGetCoinFlipFairnessTransaction };
};

export default useCoinFlipFairness;
