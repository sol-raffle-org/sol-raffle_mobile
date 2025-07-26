import { showErrorToast } from "@/components/common/custom-toast";
import { DEFAULT_PAGE_SIZE } from "@/constants/api.const";

import {
  getJackpotFairnessService,
  getJackpotFairnessTransactionDetailService,
} from "@/services/games-service/jackpot/jackpot.service";

import useJackpotStore from "@/stores/useJackpotStore";

const useJackpotFairness = () => {
  const {
    setPage,
    setTotalItems,
    setJackpotFairness,
    setCurrentRoundTransaction,
  } = useJackpotStore();

  const handleGetJackpotFairness = async (page: number) => {
    const response = await getJackpotFairnessService(page, DEFAULT_PAGE_SIZE);

    if (!response) return;

    setJackpotFairness(response.pageData);
    setTotalItems(response.total);
    setPage(response.pageNum);
  };

  const handleGetJackpotFairnessTransactions = async (roundId: string) => {
    const response = await getJackpotFairnessTransactionDetailService(roundId);

    if (!response || !Array.isArray(response)) {
      showErrorToast("Error");
      return;
    }

    setCurrentRoundTransaction(response);

    return response;
  };

  return { handleGetJackpotFairness, handleGetJackpotFairnessTransactions };
};

export default useJackpotFairness;
