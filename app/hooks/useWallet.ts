"use client";
import { useGlobalStore } from "@/stores/global";
import { mintclub } from "mint.club-v2-sdk";
import toast from "react-hot-toast";

export default function useWallet() {
  const account = useGlobalStore((state) => state.account);
  const userLoading = useGlobalStore((state) => state.userLoading);

  async function syncAccount() {
    useGlobalStore.setState({ userLoading: true });
    const currentAddress = await mintclub.wallet.account();
    useGlobalStore.setState({ account: currentAddress });
    useGlobalStore.setState({ userLoading: false });
  }

  async function connect() {
    try {
      useGlobalStore.setState({ userLoading: true });
      await mintclub.wallet.connect();
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message);
    } finally {
      syncAccount();
    }
  }

  async function disconnect() {
    await mintclub.wallet.disconnect();
    await syncAccount();
  }

  async function change() {
    await mintclub.wallet.change();
    await syncAccount();
  }

  return {
    isUserLoading: !account && userLoading,
    account,
    connect,
    disconnect,
    change,
  };
}
