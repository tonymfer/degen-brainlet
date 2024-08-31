import { mintclub, toNumber } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";
import { useERC1155Image } from "./useERC1155Image";
import { useGlobalStore } from "@/stores/global";

export type NftDetail = {
  name: string;
  price: number;
  sold: number;
  maxSupply: number;
  address: `0x${string}`;
  symbol: string;
  priceChange: number;
};

export default function useNft(symbolOrAddress?: string) {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const { image: nftUrl } = useERC1155Image({
    address: data?.address,
  });

  async function fetchData() {
    if (!symbolOrAddress) {
      setData(null);
      return;
    }
    try {
      setLoading(true);
      const nft = mintclub.network("degen").nft(symbolOrAddress);
      const {
        info: {
          name,
          token,
          symbol,
          priceForNextMint,
          currentSupply,
          maxSupply,
          reserveBalance,
        },
        steps,
      } = await nft.getDetail();
      useGlobalStore.setState((state) => ({
        tvl: new Map(state.tvl).set(token, toNumber(reserveBalance, 18)),
      }));
      const initialPrice = steps[1].price;
      const initialPriceNumber = toNumber(initialPrice, 18);
      const priceForNextMintNumber = toNumber(priceForNextMint, 18);
      const priceChange =
        initialPriceNumber !== 0
          ? ((priceForNextMintNumber - initialPriceNumber) /
              initialPriceNumber) *
            100
          : 0;

      // const imageHash = await Promise.race([
      //   nft.getImageUri(),
      //   new Promise<string>((_, reject) =>
      //     setTimeout(() => reject(new Error("Timeout")), 5000)
      //   ),
      // ]).catch((e) => {
      //   console.error(e);
      //   setLoading(false);
      //   return "";
      // });
      // const imageUrl = mintclub.ipfs.hashToGatewayUrl(imageHash);

      setData({
        name,
        maxSupply: Number(maxSupply),
        price: toNumber(priceForNextMint, 18),
        sold: Number(currentSupply),
        address: token,
        symbol,
        priceChange,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolOrAddress]);

  return { data, nftUrl, refresh: fetchData, loading };
}
