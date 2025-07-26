import { DEFAULT_PAGE_SIZE } from "@/constants/api.const";
import { getUserJackpotHistoryService } from "@/services/games-service/jackpot/jackpot.service";
import useJackpotStore from "@/stores/useJackpotStore";

const useGetUserJackpotHistory = () => {
  const { setIsFetching, setPage, setTotalItems, setUserJackpotHistory } =
    useJackpotStore();

  const handleGetTransactionHistory = async (page: number) => {
    setIsFetching(true);

    const response = await getUserJackpotHistoryService(
      page,
      DEFAULT_PAGE_SIZE
    );
    setIsFetching(false);
    if (!response) return;

    setUserJackpotHistory(response.pageData);
    setTotalItems(response.total);
    setPage(response.pageNum);
  };

  return { handleGetTransactionHistory };
};

export default useGetUserJackpotHistory;
