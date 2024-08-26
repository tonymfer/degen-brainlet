/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { comicSans } from "@/fonts";
import useNft from "@/hooks/useNft";
import useNftBalance from "@/hooks/useNftBalance";
import { commify, shortenNumber } from "mint.club-v2-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TokenItem(props: { tokenAddress: `0x${string}` }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { tokenAddress } = props;
  const { data, loading } = useNft(tokenAddress);
  const { balance } = useNftBalance(tokenAddress);
  const router = useRouter();

  if (loading || !data) {
    return (
      <div
        className={`flex aspect-square md:h-[300px] md:w-[300px] ${comicSans.className} w-full items-center justify-center p-5`}
      >
        loading...
      </div>
    );
  }

  const { image, price, sold, maxSupply, symbol } = data || {};

  return (
    <div
      className={`flex h-fit flex-col ${comicSans.className} justify-center`}
    >
      <div className="flex w-full justify-between">
        <div
          className={`text-xl md:text-2xl text-black text-center ${comicSans.className}`}
        >
          {symbol}
        </div>
        <div className="flex flex-col text-center">
          <div className="mt-1 text-xl text-purple-600 font-bold">
            {maxSupply - sold}{" "}
            <span className="text-xl text-black">/{commify(maxSupply)}</span>
          </div>
        </div>
        {/* <div className="text-green-600">+{priceChange || 0}%</div> */}
      </div>
      <div className="flex flex-col w-full items-center">
        {!imageFailed ? (
          <img
            className="w-full h-full md:w-[300px] aspect-square border-black border-2 md:h-[300px]"
            src={image}
            width={300}
            height={300}
            alt=""
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="h-[300px] w-full flex items-center justify-center aspect-square border-2 border-black bg-green-500">
            fetching Image...
          </div>
        )}
        {/* <div className="ml-3 flex flex-col">
          <div className="mt-2 text-sm text-gray-500">
            {abbreviateAddress(address)}
          </div>
        </div> */}
      </div>
      <div className="flex w-full items-center justify-between px-2 text-black">
        <div className="flex items-center text-center">
          <span className="mt-1 font-bold">
            price: {shortenNumber(price)} $BRAINLET
          </span>
        </div>
        <div className="flex items-center text-center">
          <span className="mt-1 font-bold">
            holding: {shortenNumber(balance)}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          router.push(`/explooor/${symbol}`);
        }}
        className=" px-2.5 py-2 mt-4 bg-gradient-to-r max-w-full font-thin rounded-2xl from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
      >
        Brrrruuy
      </Button>
    </div>
  );
}
