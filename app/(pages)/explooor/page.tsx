"use client";
import Loading from "@/components/Loading";
import TokenItem from "@/components/TokenItem";
import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { comicSans, comicSansBold, mferFont } from "@/fonts";
import useERC20Balance from "@/hooks/useERC20Balance";
import useNftList from "@/hooks/useNftList";
import useWallet from "@/hooks/useWallet";
import { commify } from "mint.club-v2-sdk";
import Link from "next/link";

export default function Home() {
  const { list, refresh, loading } = useNftList();
  const { account, connect } = useWallet();

  const {
    balance: krwBalance,
    loadingBalance: loadingKrw,
    refresh: refreshKrw,
  } = useERC20Balance(BRAINLET_TOKEN_ADDRESS);

  return (
    <div className="flex h-full mt-20 w-full flex-col items-center padded-horizontal">
      <div className={`${comicSansBold.className} text-2xl md:text-5xl mt-10`}>
        Brruuy Brainlets with $BRAINLETS 🤤🤤{" "}
      </div>
      <div className={`${mferFont.className} text-xl mt-2 mb-10`}>
        brainlet memes are stealable and creditless - anon brainlet
      </div>

      {list.length > 0 && (
        <div
          className={`flex ${comicSans.className} sm:flex-row flex-col text-3xl w-full items-center justify-between gap-2`}
        >
          <div className="flex gap-4 items-center justify-center">
            total: {commify(list.length)}
            {/* <div
              className="cursor-pointer border-2 text-2xl leading-none bg-transparent"
              onClick={refresh}
            >
              <span className="text-4xl">↻</span>
            </div> */}
          </div>
          <div className="relative">
            <Link
              href="https://mint.club/token/degen/BRAINLET"
              passHref
              className="absolute whitespace-nowrap right-0 top-0 -translate-y-full text-lg underline-offset-2 underline"
            >
              buy more $BRAINLET ↗️
            </Link>
            {/* <div
              className="cursor-pointer text-xl bg-transparent"
              onClick={account ? refreshKrw : connect}
            >
              {!account ? (
                <div className="">balance: connect to check</div>
              ) : loadingKrw ? (
                <Loading />
              ) : (
                "balance: " + commify(Math.floor(krwBalance)) + " 🧠"
              )}
            </div> */}
          </div>
        </div>
      )}

      <div className="mt-5 md:flex w-full gap-3 md:flex-wrap grid grid-cols-2 md:justify-between sm:mt-10 ">
        {!list ? (
          <Loading />
        ) : (
          list.map((address) => {
            return <TokenItem key={address} tokenAddress={address} />;
          })
        )}
      </div>
    </div>
  );
}
