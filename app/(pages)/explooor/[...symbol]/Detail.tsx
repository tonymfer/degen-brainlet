"use client";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import NftImage from "@/components/NftImage";
import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { comicSans } from "@/fonts";
import useBuySell from "@/hooks/useBuySell";
import useERC20Balance from "@/hooks/useERC20Balance";
import useNft, { NftDetail } from "@/hooks/useNft";
import useNftBalance from "@/hooks/useNftBalance";
import useWallet from "@/hooks/useWallet";
import { useGlobalStore } from "@/stores/global";
import {
  applyDecimals,
  commify,
  shortenNumber,
  uncommify,
} from "mint.club-v2-sdk";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export default function Detail() {
  const { symbol: _symbol } = useParams<{ symbol: string }>();
  const symbol = decodeURIComponent(_symbol);

  const { data, loading, nftUrl, refresh } = useNft(symbol);
  const {
    balance,
    loadingBalance,
    refresh: refreshBalance,
  } = useNftBalance(symbol);

  if (!data) {
    return (
      <div className="flex h-[208px] w-full items-center justify-center border border-gray-500/50 p-5">
        <Loading />
      </div>
    );
  }

  const { name, price, sold, maxSupply, address } = data || {};

  return (
    <div
      className={`flex h-[100lvh] mt-20 flex-col ${comicSans.className} padded-horizontal items-center justify-center`}
    >
      <div className="flex flex-col max-w-full md:max-w-[900px] items-center justify-center">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/explooor"
            className="place-self-start mb-4 -translate-x-4"
          >
            <Button className="bg-transparent text-black text-2xl">
              ← Go back
            </Button>
          </Link>
          <Link
            href={`https://mint.club/nft/degen/${symbol}`}
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="place-self-start mb-4"
          >
            <Button className="bg-transparent bg-[#15e6b7] border-2 text-black text-2xl">
              MintClub
            </Button>
          </Link>
        </div>
        <div className="flex w-full justify-between">
          <div
            className={`text-3xl text-black text-center ${comicSans.className}`}
          >
            {symbol}
          </div>
          <div className="flex flex-col text-center">
            <div className="mt-1 text-2xl font-bold">
              {maxSupply - sold}{" "}
              <span className="text-2xl text-gray-500">
                /{commify(maxSupply)}
              </span>
            </div>
          </div>
          {/* <div className="text-green-600">+{priceChange || 0}%</div> */}
        </div>
        <div className="flex flex-col w-full items-center">
          <NftImage
            image={nftUrl}
            size={500}
            className="w-[400px] aspect-square border-black border-2 h-[400px] md:w-[500px] md:h-[500px]"
          />
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
        <BuySellButtons
          refreshBalance={refreshBalance}
          tokenAddress={address}
          refresh={refresh}
          data={data}
        />
      </div>
    </div>
  );
}

function BuySellButtons(
  props: { tokenAddress: `0x${string}` } & {
    data: NftDetail;
    refresh: ReturnType<typeof useNft>["refresh"];
    refreshBalance: () => void;
  }
) {
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);
  const [input, setInput] = useState(0);
  const { tokenAddress, data, refresh: refreshToken, refreshBalance } = props;
  const { maxSupply, sold } = data;
  const {
    balance: krwBalance,
    loadingBalance: loadingKrw,
    refresh: refreshKrw,
  } = useERC20Balance(BRAINLET_TOKEN_ADDRESS);
  const { address, isConnected } = useAccount();

  const { buy, sell, estimating, txLoading, estimation } = useBuySell(
    tradeType,
    tokenAddress,
    Number(input)
  );

  const notEnoughBalance = input && !estimating && krwBalance < estimation;

  function reset() {
    setTradeType(null);
    setInput(0);
    refresh();
  }

  function refresh() {
    refreshBalance();
    refreshKrw();
    refreshToken();
  }

  return tradeType !== null ? (
    <div className=" flex w-full flex-col">
      <div>
        <div className="mt-5 text-xs text-black">
          {tradeType === "sell" ? "You'll receive" : "Estimated Price"}
        </div>
        {input !== undefined && estimating ? (
          <div className="text-yellow-500">estimatingrrr..</div>
        ) : (
          !!input && (
            <div className="text-green-500">
              {applyDecimals(estimation)} $BRAINLET
            </div>
          )
        )}
      </div>
      <input
        className="w-full border-2 border-black rounded-lg bg-transparent p-2 text-sm text-black outline-none"
        inputMode="numeric"
        placeholder={
          tradeType === "sell" ? "How many u sellin?" : "How many u buyin?"
        }
        prefix=""
        autoFocus
        value={input === 0 ? "" : commify(input)}
        onChange={(e) => {
          let value = uncommify(e.target.value);
          let numeric = Number(value.replace(/[^0-9]/g, ""));

          if (tradeType === "sell") {
            numeric = Math.min(Math.max(numeric, 0), sold);
          }

          if (tradeType === "buy") {
            numeric = Math.min(numeric, maxSupply - sold);
          }

          setInput(numeric);
        }}
      />
      <div className="mt-2 flex items-center text-sm">
        balance:{" "}
        <span className="mx-1 flex items-center text-black">
          {loadingKrw ? (
            <div className="mx-1 inline-block">loading...</div>
          ) : (
            shortenNumber(krwBalance) + " $BRAINLET"
          )}{" "}
        </span>
      </div>

      <div className="relative mt-5 flex gap-2 text-sm">
        <Button
          className="w-full bg-green-500 text-black"
          loading={estimating || txLoading}
          spinnerColor="grey"
          disabled={!isConnected || !input || !!notEnoughBalance}
          onClick={async () => {
            console.log("buy or sell");
            try {
              if (tradeType === "sell") {
                await sell(() => {
                  toast.success("Sell Brainlet Success 🤤");
                  reset();
                });
              } else {
                await buy(() => {
                  toast.success("Buy Brainlet Success 🤤");
                  reset();
                });
              }
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {tradeType === "sell" ? "Sell" : "Brrrruy"}
        </Button>
        <Button
          className="w-full bg-gray-500 text-black"
          onClick={() => {
            reset();
          }}
        >
          Cancel
        </Button>
      </div>
      {!!notEnoughBalance && (
        <div className="mt-5 text-center text-xs text-red-500">
          no enough balance
        </div>
      )}
    </div>
  ) : (
    <div className="relative w-full mt-5 flex-col flex gap-2 text-sm">
      {!isConnected ? (
        <Button
          className=" px-2.5 py-2 bg-gradient-to-r max-w-full font-thin rounded-2xl from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
          onClick={() => useGlobalStore.setState({ collapsed: false })}
        >
          Connect Wallet
        </Button>
      ) : (
        <div className="w-full flex gap-2">
          <Button
            className=" px-2.5 w-full py-2 mt-2 bg-gradient-to-r max-w-full font-thin rounded-xl from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
            onClick={() => setTradeType("buy")}
          >
            Brrruy
          </Button>
          <Button
            className="w-full mt-2 bg-orange-400 text-black"
            onClick={() => setTradeType("sell")}
          >
            Sell
          </Button>
        </div>
      )}
    </div>
  );
}
