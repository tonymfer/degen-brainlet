"use client";

import { BRAINLET_TOKEN_ADDRESS, DEGEN_CHAIN_ID } from "@/constants";
import { mintclub } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { degen } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";

export default function useCreate(symbol: string) {
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [exists, setExists] = useState(false);
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient({
    account: address,
    chainId: DEGEN_CHAIN_ID,
  });

  async function createProfile(
    metadataUrl: `ipfs://${string}`,
    onSuccess: () => void,
    onError: (err: any) => void
  ) {
    const curveTypes = ["LINEAR", "LOGARITHMIC", "EXPONENTIAL"];
    const curveType = curveTypes[
      Math.floor(Math.random() * curveTypes.length)
    ] as any;
    try {
      await mintclub
        .withWalletClient({ ...walletClient, chain: degen } as any)
        .network("degen")
        .nft(symbol)
        .create({
          name: symbol,
          reserveToken: {
            address: BRAINLET_TOKEN_ADDRESS, // 1,000 KRW
            decimals: 18,
          },
          curveData: {
            curveType,
            stepCount: 60,
            maxSupply: 69,
            initialMintingPrice: 69000,
            finalMintingPrice: 6_900_000,
            creatorAllocation: 1,
          },
          buyRoyalty: 6.9,
          sellRoyalty: 6.9,
          metadataUrl,
          onSuccess,
          onError,
        });
    } catch (error) {
      onError(error);
      toast.error("Failed to create");
    }
  }

  async function checkExisting(symbol: string) {
    setCheckingUsername(true);
    const exists = await mintclub.network("degen").nft(symbol).exists();
    setCheckingUsername(false);
    return exists;
  }

  useEffect(() => {
    if (symbol) {
      checkExisting(symbol).then(setExists);
    } else {
      setCheckingUsername(false);
      setExists(false);
    }
  }, [symbol]);

  return {
    createProfile,
    exists,
    checkingUsername,
  };
}
