"use client";
import { useAccount, useReadContract } from "wagmi";
import { degen } from "viem/chains";
import { BOND_ABI } from "mint.club-v2-sdk";
import { DEGEN_BOND_ADDRESS } from "@/constants";

export function useGetUserTokenRoyaltyClaimed({ reserveToken, chainId }: any) {
  const { address: userAddress } = useAccount();

  return useReadContract({
    chainId: degen.id,
    abi: BOND_ABI,
    functionName: "userTokenRoyaltyClaimed",
    ...(userAddress && reserveToken && chainId
      ? {
          args: [userAddress, reserveToken],
          address: DEGEN_BOND_ADDRESS,
        }
      : {}),
  });
}
