"use client";
import Button from "@/components/Button";
import { comicSans } from "@/fonts";
import { useRoyaltyPageItem } from "@/hooks/royalties/useRoyaltyPageItem";
import { useWindowSize } from "@uidotdev/usehooks";
import { applyDecimals, toNumber } from "mint.club-v2-sdk";
import { useState } from "react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

export default function Dashboard() {
  const {
    isLoadingBalance,
    isLoadingClaimed,
    balanceData,
    claimedData,
    claim,
  } = useRoyaltyPageItem();
  const balance = (balanceData && toNumber(balanceData, 18)) || 0;
  const claimed = (claimedData && toNumber(claimedData, 18)) || 0;
  const size = useWindowSize();

  const [claimSuccess, setClaimSuccess] = useState(false);

  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center ${comicSans.className} text-3xl`}
    >
      {claimSuccess && (
        <Confetti
          width={size.width || 1000}
          height={size.height || 1000}
          gravity={0.2}
        />
      )}

      <div className="flex-col items-center justify-center text-center">
        <div className="text-xl">
          {claimSuccess ? "total Claimed Amount:" : "Your Earnings 🤤"}
        </div>
        <div className="text-7xl mt-4 mb-2">
          {claimSuccess
            ? isLoadingClaimed
              ? "Loading..."
              : applyDecimals(claimed)
            : isLoadingBalance
            ? "Loading..."
            : applyDecimals(balance)}
        </div>
        <div className="text-2xl">$BRAINLET</div>
      </div>
      <Button
        disabled={balance === 0 || !balance}
        className=" px-10 py-2 mt-4 bg-gradient-to-r max-w-full font-thin rounded-lg from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
        onClick={async () => {
          const receipt = await claim();
          if (receipt) {
            setClaimSuccess(true);
            toast.success("Claimed Succcess🤤");
          }
        }}
      >
        Claim
      </Button>

      {/* <Link
        href="https://mint.club/dashboard/royalties"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline underline-offset-8 mt-5 ${comicSansBold.className} text-[#916af3]`}
      >
        Check out your royalties on MintClub
      </Link> */}
    </div>
  );
}
