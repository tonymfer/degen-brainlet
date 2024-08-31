import useWallet from "@/hooks/useWallet";
import { ERC20_ABI, mintclub, toNumber } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { useAccount } from "wagmi";

export default function useERC20Balance(tokenAddress: `0x${string}`) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  async function getBalance() {
    if (tokenAddress && address) {
      setLoading(true);
      try {
        // using viem
        // const publicClient = createPublicClient({
        //   chain: base,
        //   transport: http('https://mainnet.base.org'),
        // });

        // const balance = await publicClient.readContract({
        //   abi: [
        //     {
        //       constant: true,
        //       inputs: [{ name: '_owner', type: 'address' }],
        //       name: 'balanceOf',
        //       outputs: [{ name: 'balance', type: 'uint256' }],
        //       payable: false,
        //       stateMutability: 'view',
        //       type: 'function',
        //     },
        //   ],
        //   address: tokenAddress,
        //   functionName: 'balanceOf',
        //   args: [address],
        // });

        // 이거를 좀더 쉽게 SDK 로 호출하려면 👇
        const balance = await mintclub
          .network("degen")
          .token(tokenAddress)
          .getBalanceOf(address);

        setBalance(toNumber(balance, 18));
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
  }, [tokenAddress, address]);

  return { balance, loadingBalance: loading, refresh: getBalance };
}
