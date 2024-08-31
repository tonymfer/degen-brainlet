"use client";
import Loading from "@/components/Loading";
import TokenItem from "@/components/TokenItem";
import { comicSansBold } from "@/fonts";
import useNftList from "@/hooks/useNftList";
import InfiniteText from "./Infinite";

export default function Home() {
  const { list, refresh, loading } = useNftList();

  return (
    <div className="flex h-full mt-20 w-full flex-col items-center padded-horizontal">
      <div className="mt-10 padded-horizontal w-full flex items-center justify-center flex-col">
        <InfiniteText />
        <div className={`${comicSansBold.className} text-xl md:text-5xl `}>
          Brruuy Brainlets with $BRAINLETS 🤤🤤{" "}
        </div>

        <InfiniteText direction="right" />
      </div>

      {/* {list.length > 0 && (
        <div
          className={`flex ${comicSans.className} sm:flex-row flex-col text-3xl w-full items-center justify-between gap-2`}
        >
          <div className="flex gap-4 items-center justify-center">
            meme count: {commify(list.length)}
          </div>
          <div className="flex gap-4 items-center justify-center">
            tvl: {shortenNumber(totalTvl)}
          </div>
          <div className="relative">
            <Link
              href="https://mint.club/token/degen/BRAINLET"
              passHref
              className="flex text-xs items-center justify-center border-b-2 leading-tight border-black"
            >
              buy more $BRAINLET
              <svg
                height="18"
                viewBox="0 0 18 18"
                width="18"
                className="scale-75"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2 16 14-14m-14 0h14v14"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
              </svg>
            </Link>
          </div>
        </div>
      )} */}

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
