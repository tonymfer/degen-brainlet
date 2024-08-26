"use client";
import Loading from "@/components/Loading";
import TokenItem from "@/components/TokenItem";
import { comicSans, comicSansBold, mferFont } from "@/fonts";
import useNftList from "@/hooks/useNftList";
import { commify } from "mint.club-v2-sdk";

export default function Home() {
  const { list, refresh, loading } = useNftList();

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
          className={`flex ${comicSans.className} text-3xl w-full items-center justify-between gap-2 mobile:flex-col mobile:justify-center`}
        >
          <div className="">total {commify(list.length)} Brainlets</div>
          <div
            className="cursor-pointer text-2xl bg-transparent"
            onClick={refresh}
          >
            REefresh <span className="text-4xl">↻</span>
          </div>
        </div>
      )}

      <div className="mt-5 md:flex w-full gap-3 md:flex-wrap grid grid-cols-2 md:justify-start sm:mt-10 ">
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
