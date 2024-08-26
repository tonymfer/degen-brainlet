import { mintclub, toNumber } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";

export type NftDetail = {
  name: string;
  image: string;
  price: number;
  sold: number;
  maxSupply: number;
  address: `0x${string}`;
  symbol: string;
};

export default function useNft(symbolOrAddress?: string) {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState(false);

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
        },
      } = await nft.getDetail();
      // const initialPrice = steps[0].price;
      // const priceChange =
      //   ((toNumber(priceForNextMint, 18) - toNumber(initialPrice, 18)) /
      //     toNumber(initialPrice, 18)) *
      //   100;

      const imageHash = await Promise.race([
        nft.getImageUri(),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        ),
      ]).catch((e) => {
        console.error(e);
        setLoading(false);
        return "";
      });
      const imageUrl = mintclub.ipfs.hashToGatewayUrl(imageHash);

      setData({
        name,
        maxSupply: Number(maxSupply),
        image: imageUrl,
        price: toNumber(priceForNextMint, 18),
        sold: Number(currentSupply),
        address: token,
        symbol,
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

  return { data, refresh: fetchData, loading };
}
