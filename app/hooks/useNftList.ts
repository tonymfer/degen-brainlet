import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { useGlobalStore } from "@/stores/global";
import { mintclub } from "mint.club-v2-sdk";
import { useEffect } from "react";

export default function useNftList() {
  const list = useGlobalStore((state) => state.list);
  async function fetchList() {
    try {
      useGlobalStore.setState({ list: [] });
      const list = await mintclub
        .network("degen")
        .bond.getTokensByReserveToken({
          reserveToken: BRAINLET_TOKEN_ADDRESS,
          start: 0,
          end: 10000,
        });

      const filteredList = list.filter(
        (address) => address !== "0x1d1854DC3B78Bb9926DE929A4CddE4e44aF76F65"
      );
      useGlobalStore.setState({ list: filteredList });
    } catch (e) {
      console.error(e);
      fetchList();
    }
  }

  useEffect(() => {
    fetchList();

    // eslint-disable-next-line
  }, []);

  return { list, refresh: fetchList };
}
