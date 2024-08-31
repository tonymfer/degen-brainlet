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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import degenIcon from "@brainlet/degen@2x.png";
import { shortenNumber } from "mint.club-v2-sdk";

export default function Header() {
  const setCollapsed = (collapsed: boolean) =>
    useGlobalStore.setState({ collapsed });
  const {
    balance: brainletBalance,
    loadingBalance: loadingBrainlet,
    refresh: refreshBrainlet,
  } = useERC20Balance(BRAINLET_TOKEN_ADDRESS);

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
          {/* <Button
            className=" px-4 py-2 bg-gradient-to-r max-w-full font-thin rounded-lg from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
            onClick={() => useGlobalStore.setState({ collapsed: false })}
          >
            {account ? (
              <div className="text-black">{abbreviateAddress(account)}</div>
            ) : (
              <div className="text-black">Connect Wallet</div>
            )}
          </Button> */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button">
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ display: "flex", alignItems: "center" }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? "Chain icon"}
                                  src={degenIcon}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                        </button>

                        <button
                          // onClick={openAccountModal}
                          onClick={() =>
                            useGlobalStore.setState({ collapsed: false })
                          }
                          type="button"
                          className="border-2 border-black flex flex-col px-2.5 py-1 items-end justify-center"
                        >
                          <span className="flex items-center justify-center">
                            <Image
                              src={degenIcon}
                              width={25}
                              height={25}
                              className="rounded-full mr-2 border border-black"
                              alt="logo"
                            />
                            {account.displayName}
                          </span>
                          {brainletBalance && (
                            <span className="text-sm">
                              {" "}
                              {shortenNumber(brainletBalance)} $BRAINLET
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
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
  const { balance } = useERC20Balance(BRAINLET_TOKEN_ADDRESS);
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  return (
    <>
      {!collapsed && (
        <>
          <div
            className={`fixed left-0 top-0 ${comicSans.className} z-20 h-[100lvh] w-screen backdrop-blur-sm`}
          />
          <div className="fixed w-[300px] h-[400px] bg-white border-2 -translate-y-1/2 border-black top-1/2 text-center flex flex-col items-center justify-center left-1/2 z-40 -translate-x-1/2">
            <Image src={logo} width={60} height={100} alt="logo" />
            {address ? (
              <>
                <Button
                  onClick={() => {
                    router.push(`/dashboard`);
                  }}
                  className=" px-2.5 py-2 max-w-full font-thin rounded-2xl"
                >
                  Dashboard
                </Button>
                {/* <ConnectButton /> */}
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
                <ConnectButton />
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
