import { BRAINLET_TOKEN_ADDRESS, DEGEN_BOND_ADDRESS } from "@/constants";
import { BOND_ABI } from "mint.club-v2-sdk";
import { switchToProperNetwork } from "@/utils/web3";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { degen } from "viem/chains";
import { config } from "../../Providers";

export async function claimRoyalties() {
  await switchToProperNetwork();
  const { request } = await simulateContract(config, {
    chainId: degen.id,
    address: DEGEN_BOND_ADDRESS,
    abi: BOND_ABI,
    functionName: "claimRoyalties",
    args: [BRAINLET_TOKEN_ADDRESS],
  });
  const tx = await writeContract(config, request);
  const receipt = await waitForTransactionReceipt(config, {
    hash: tx,
    retryCount: 10,
    retryDelay: 1000,
  });

  return receipt;
}
