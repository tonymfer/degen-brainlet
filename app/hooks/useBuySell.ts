import { useDebounce } from "@uidotdev/usehooks";
import { mintclub, toNumber, wei } from "mint.club-v2-sdk";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../Providers";
import { useAccount, useDisconnect, useWalletClient } from "wagmi";
import { DEGEN_CHAIN_ID } from "@/constants";
import { degen } from "viem/chains";

export default function useBuySell(
  tradeType: "buy" | "sell" | null,
  tokenAddress: `0x${string}`,
  amount: number
) {
  const [loading, setLoading] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [estimation, setEstimation] = useState(0);
  const debounced = useDebounce(amount, 500);
  const { address } = useAccount();

  const { data: walletClient } = useWalletClient({
    account: address,
    chainId: DEGEN_CHAIN_ID,
  });

  async function estimate() {
    try {
      setEstimating(true);
      const nft = mintclub.network("degen").nft(tokenAddress);

      let estimation: bigint;

      if (tradeType === "buy") {
        [estimation] = await nft.getBuyEstimation(BigInt(amount));
      } else {
        [estimation] = await nft.getSellEstimation(BigInt(amount));
      }

      setEstimation(toNumber(estimation, 18));
    } finally {
      setEstimating(false);
    }
  }

  useEffect(() => {
    if (tradeType === null) {
      setEstimation(0);
      setEstimating(false);
      setLoading(false);
    }

    if (
      tradeType !== null &&
      tokenAddress &&
      amount !== 0 &&
      amount !== undefined &&
      debounced === amount
    ) {
      estimate();
    }
    // eslint-disable-next-line
  }, [amount, debounced, tradeType, tokenAddress]);

  async function buy(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 7: buy NFT using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/buy
      await mintclub
        .withWalletClient({ ...walletClient, chain: degen } as any)
        .network("degen")
        .nft(tokenAddress)
        .buy({
          amount: BigInt(amount),
          onAllowanceSignatureRequest: () => {
            toast("🔓 Please allow the contract to use your tokens");
          },
          onAllowanceSuccess: () => {
            toast.success("Allowance granted");
          },
          onSignatureRequest: () => {
            toast("Proceed in your wallet");
          },
          onSigned: () => {
            toast.success("🚀 Transaction successfully sent");
          },
          debug: (e) => {
            console.log(e);
          },
          onSuccess,
          onError: (e: any) => {
            console.error(e);
            toast.error(e.message);
          },
        });
    } finally {
      setLoading(false);
    }
  }

  async function sell(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 8: sell NFT using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/sell

      await mintclub
        .withWalletClient({ ...walletClient, chain: degen } as any)
        .network("degen")
        .nft(tokenAddress)
        .sell({
          amount: BigInt(amount),
          onAllowanceSignatureRequest: () => {
            toast("🔓 Please allow the contract to use your tokens");
          },
          onAllowanceSuccess: () => {
            toast.success("Allowance granted");
          },
          onSignatureRequest: () => {
            toast("🖊️ Please approve the transaction");
          },
          onSigned: () => {
            toast.success("🚀 Transaction successfully sent");
          },
          debug: (e) => {
            console.log(e);
          },
          onSuccess,
          onError: (e: any) => {
            console.error(e);
            toast.error(e.message);
          },
        });
    } finally {
      setLoading(false);
    }
  }

  return {
    buy,
    sell,
    estimation,
    estimating: estimating || debounced !== amount,
    txLoading: loading,
  };
}
