import { DEGEN_CHAIN_ID } from "@/constants";
import useWallet from "@/hooks/useWallet";
import { mintclub } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

export default function useNftBalance(symbolOrAddress?: string) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  async function getBalance() {
    if (symbolOrAddress && address) {
      setLoading(true);
      try {
        const balance = await mintclub
          .network("degen")
          .nft(symbolOrAddress)
          .getBalanceOf(address);

        setBalance(Number(balance));
        setLoading(false);
      } catch (e) {
        console.error(e);
        getBalance();
      }
    }
  }

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line
  }, [symbolOrAddress, address]);

  return { balance, loadingBalance: loading, refresh: getBalance };
}
