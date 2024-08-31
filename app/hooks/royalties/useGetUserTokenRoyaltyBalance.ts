"use client";
import { BOND_ABI } from "mint.club-v2-sdk";
import { useAccount, useReadContract } from "wagmi";
import { DEGEN_BOND_ADDRESS } from "@/constants";
import { degen } from "viem/chains";

export function useGetUserTokenRoyaltyBalance({ reserveToken, chainId }: any) {
  const { address: userAddress } = useAccount();

  return useReadContract({
    chainId: degen.id,
    abi: BOND_ABI,
    functionName: "userTokenRoyaltyBalance",
    ...(userAddress && reserveToken && chainId
      ? {
          args: [userAddress, reserveToken],
          address: DEGEN_BOND_ADDRESS,
        }
      : {}),
  });
}
