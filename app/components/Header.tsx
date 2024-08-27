"use client";

import Button from "@/components/Button";
import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { comicSans, comicSansBold } from "@/fonts";
import useERC20Balance from "@/hooks/useERC20Balance";
import useProfile from "@/hooks/useProfile";
import useWallet from "@/hooks/useWallet";
import { useGlobalStore } from "@/stores/global";
import { abbreviateAddress } from "@/utils/strings";
import logo from "@brainlet/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const setCollapsed = (collapsed: boolean) =>
    useGlobalStore.setState({ collapsed });
  const { account, connect, disconnect, change } = useWallet();
  useProfile();

  return (
    <div
      className={`flex absolute top-0 z-[40000] w-screen flex-col justify-between sm:gap-5 py-5 bg-white text-sm md:text-lg padded-horizontal ${comicSansBold.className} md:flex-row`}
    >
      <div className="flex items-center justify-between gap-5 w-full">
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image src={logo} width={40} height={60} alt="logo" />
          </Link>

          <div className="flex w-fit items-center gap-2">
            <Link href="/explooor" className="font-bold text-black">
              <Button className=" bg-transparent text-black/80">
                Explooor
              </Button>
            </Link>
            {/* <Link href="/" className="font-bold text-black">
              <Button className=" bg-transparent text-black/80">About</Button>
            </Link> */}
            <Link href="/create" className="flex w-fit text-black ">
              <Button className=" bg-transparent text-black/80">Post</Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className=" px-4 py-2 bg-gradient-to-r max-w-full font-thin rounded-lg from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
            onClick={() => useGlobalStore.setState({ collapsed: false })}
          >
            {account ? (
              <div className="text-black">{abbreviateAddress(account)}</div>
            ) : (
              <div className="text-black">Connect Wallet</div>
            )}
          </Button>
        </div>
      </div>

      <HeaderButtons />
    </div>
  );
}

function HeaderButtons() {
  const myPrice = useGlobalStore((state) => state.myPrice);
  const collapsed = useGlobalStore((state) => state.collapsed);
  const setCollapsed = (collapsed: boolean) =>
    useGlobalStore.setState({ collapsed });
  const { account, connect, disconnect, change } = useWallet();
  const { balance } = useERC20Balance(BRAINLET_TOKEN_ADDRESS);
  const router = useRouter();
  return (
    <>
      {!collapsed && (
        <>
          <div
            className={`fixed left-0 top-0 ${comicSans.className} z-20 h-[100lvh] w-screen backdrop-blur-sm`}
          />
          <div className="fixed w-[300px] h-[400px] bg-white border-2 -translate-y-1/2 border-black top-1/2 text-center flex flex-col items-center justify-center left-1/2 z-40 -translate-x-1/2">
            <Image src={logo} width={60} height={100} alt="logo" />
            {account ? (
              <>
                <Button className="border-2 bg-transparent text-black">
                  <span className="text-gray-500">
                    {abbreviateAddress(account)}
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    router.push(`/dashboard`);
                  }}
                  className=" px-2.5 py-2 max-w-full font-thin rounded-2xl"
                >
                  Dashboard
                </Button>
                <Button
                  className="bg-transparent text-black"
                  onClick={() => {
                    change();
                    setCollapsed(true);
                  }}
                >
                  Change Wallet
                </Button>
                <Button
                  className="bg-transparent text-black"
                  onClick={() => {
                    disconnect();
                    setCollapsed(true);
                  }}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <>
                <Button
                  className=" px-2.5 py-2 bg-gradient-to-r max-w-full font-thin rounded-2xl from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
                  onClick={connect}
                >
                  Connect Wallet
                </Button>
              </>
            )}
            <Button
              className="bg-orange-400 w-[200px] py-1 mt-2"
              onClick={() => setCollapsed(true)}
            >
              Close
            </Button>
          </div>
        </>
      )}
    </>
  );
}
