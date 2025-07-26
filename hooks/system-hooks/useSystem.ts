import { getSolanaLatestPrice } from "@/services/system-service/system.service";
import useAppStore from "@/stores/useAppStore";

const useSystem = () => {
  const { setSolPrice } = useAppStore();

  const handleGetSolPrice = async () => {
    const price = await getSolanaLatestPrice();

    setSolPrice(price);
  };

  return { handleGetSolPrice };
};

export default useSystem;
