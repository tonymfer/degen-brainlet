/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import { comicSans, comicSansBold } from "@/fonts";
import useNft from "@/hooks/useNft";
import useNftBalance from "@/hooks/useNftBalance";
import { commify, shortenNumber } from "mint.club-v2-sdk";
import { useRouter } from "next/navigation";
import NftImage from "./NftImage";
import useWallet from "@/hooks/useWallet";

export default function TokenItem(props: { tokenAddress: `0x${string}` }) {
  const { tokenAddress } = props;
  const { data, loading, nftUrl } = useNft(tokenAddress);
  const { balance } = useNftBalance(tokenAddress);
  const router = useRouter();
  const { account } = useWallet();

  if (loading || !data) {
    return (
      <div
        className={`flex aspect-square md:h-[300px] md:w-[300px] ${comicSans.className} w-full items-center justify-center p-5`}
      >
        loading...
      </div>
    );
  }

  const { price, sold, maxSupply, symbol, priceChange } = data || {};

  return (
    <div
      className={`flex h-fit flex-col ${comicSans.className} justify-center`}
    >
      <div className="flex w-full justify-between items-end">
        <div
          className={`text-xl md:text-2xl text-black text-center ${comicSans.className}`}
        >
          {symbol}
        </div>
        <div className={`text-green-600 ${comicSansBold.className}`}>
          +{commify(Math.floor(priceChange)) || 0}%
        </div>
      </div>
      <div
        className={`flex ${account && "border-4"} ${
          balance > 0 ? "border-green-500" : "border-gray-200"
        } relative w-fit h-fit items-center`}
      >
        <NftImage
          image={nftUrl}
          size={300}
          className="md:w-[300px] md:h-[300px]"
        />
        {/* <div className="mt-1 bg-white -translate-y-1 absolute top-0 right-0 -translate-x-2 text-xl text-purple-600 font-bold">
          {maxSupply - sold}
          <span className="text-xl text-black">/{commify(maxSupply)}</span>
        </div> */}
        {balance > 0 && (
          <div
            className={`mt-1 ${
              balance > 0 ? "bg-green-500" : "bg-gray-400"
            } absolute bottom-0 right-0 text-xl text-white px-2 font-bold`}
          >
            {account && `holding: ${shortenNumber(balance)}`}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between px-2 text-black">
        <div className="flex text-xl items-end text-center">
          {maxSupply - sold}
          <span className="text-sm mb-0.5 text-black">
            /{commify(maxSupply)}
          </span>
          {/* <span className="text-base ml-1 text-black">remaining</span> */}
        </div>
        <div className="flex items-center text-center">
          <span className="mt-1 text-xl font-bold">
            {commify(Math.floor(price))}{" "}
            <span className="text-xl font-normal">🧠</span>
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
