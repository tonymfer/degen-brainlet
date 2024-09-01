import { mintclub, toNumber } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";

export default function useERC20Price(tokenAddress: `0x${string}`) {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);

  async function getPrice() {
    if (tokenAddress) {
      setLoading(true);
      try {
        const price = await mintclub
          .network("degen")
          .token(tokenAddress)
          .getPriceForNextMint();

        setPrice(toNumber(price, 18));
        setLoading(false);
      } catch (e) {
        console.error(e);
        getPrice();
      }
    }
  }

  useEffect(() => {
    getPrice();
    // eslint-disable-next-line
  }, [tokenAddress]);

  return { price, loadingBalance: loading, refresh: getPrice };
}
