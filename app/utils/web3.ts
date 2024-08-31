import { getWalletClient, switchChain } from "@wagmi/core";
import { config } from "../../Providers";
import { DEGEN_CHAIN_ID } from "@/constants";
import { degen } from "viem/chains";
import toast from "react-hot-toast";
export async function switchToProperNetwork() {
  const walletClient = await getWalletClient(config);

  const userAddress = walletClient.account.address;

  const connectedChainId = await walletClient.getChainId();

  if (connectedChainId !== degen.id) {
    // try changing chain
    const switched = await switchChain(config, { chainId: degen.id }).catch(
      async (e) => {
        // 4902 code is thrown when the chain is not configured in the wallet
        if ((e as any)?.code === 4902) {
          await walletClient.addChain({ chain: degen }).catch((e) => {
            toast.error("Failed to add Degen chain to your wallet");
          });
        } else {
          throw e;
        }
      }
    );

    if (switched) {
      // toastSuccess(`Switched network to ${switched.name}`);
    } else {
      throw new HandledError(
        "Failed to switch network. Your wallet may not support multiple chains."
      );
    }
  }

  return { userAddress };
}
