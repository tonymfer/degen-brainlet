"use client";

import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { mintclub } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCreate(symbol: string) {
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [exists, setExists] = useState(false);

  async function createProfile(
    metadataUrl: `ipfs://${string}`,
    onSuccess: () => void,
    onError: (err: any) => void
  ) {
    // TODO: Mission 4: create NFT using sdk
    // https://sdk.mint.club/docs/sdk/network/nft/create
    // NFT 생성하기
    try {
      await mintclub
        .network("degen")
        .nft(symbol)
        .create({
          name: symbol,
          reserveToken: {
            address: BRAINLET_TOKEN_ADDRESS, // 1,000 KRW
            decimals: 18,
          },
          curveData: {
            curveType: "LOGARITHMIC",
            stepCount: 20, // how granular the curve is
            maxSupply: 69, // NFT max supply
            initialMintingPrice: 69000, // starting price, 천원
            finalMintingPrice: 6_900_000, // ending price, 일억
            creatorAllocation: 1, // initial supply to the deployer = 1 = self follow
          },
          buyRoyalty: 6.9, // 10% of the buy price goes to the creator
          sellRoyalty: 6.9, // 10% of the sell price goes to the creator
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
    // TODO: Mission 5: check if NFT exists using sdk
    // https://sdk.mint.club/docs/sdk/network/token-nft/exists
    // 이미 같은 심볼로 발행된 NFT 는 발행 불가능. 유저이름으로 사용.
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
