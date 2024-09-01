"use client";
import { useGetUserTokenRoyaltyBalance } from "./useGetUserTokenRoyaltyBalance";
import { useGetUserTokenRoyaltyClaimed } from "./useGetUserTokenRoyaltyClaimed";
import { claimRoyalties } from "../useRoyalty";
import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { degen } from "viem/chains";
const reserveToken = BRAINLET_TOKEN_ADDRESS;
const chainId = degen.id;

export function useRoyaltyPageItem() {
  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    refetch: refetchBalance,
  } = useGetUserTokenRoyaltyBalance({ reserveToken, chainId });

  const {
    data: claimedData,
    isLoading: isLoadingClaimed,
    refetch: refetchClaimed,
  } = useGetUserTokenRoyaltyClaimed({ reserveToken, chainId });

  return {
    isLoadingBalance,
    isLoadingClaimed,
    balanceData,
    claimedData,
    claim: async () => {
      const receipt = await claimRoyalties();
      refetchBalance?.();
      refetchClaimed?.();
      return receipt;
    },
  };
}
