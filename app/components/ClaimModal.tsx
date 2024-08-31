"use client";
import { BRAINLET_TOKEN_ADDRESS } from "@/constants";
import { comicSans } from "@/fonts";
import { useGetUserTokenRoyaltyBalance } from "@/hooks/royalties/useGetUserTokenRoyaltyBalance";
import { useGlobalStore } from "@/stores/global";
import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { degen } from "viem/chains";
import { useAccount } from "wagmi";
import Button from "./Button";
import { toNumber } from "mint.club-v2-sdk";

export default function ClaimModal() {
  const showRoyaltyPopup = useGlobalStore((state) => state.showRoyaltyPopup);
  const router = useRouter();

  const { data } = useGetUserTokenRoyaltyBalance({
    reserveToken: BRAINLET_TOKEN_ADDRESS,
    chainId: degen.id,
  });
  const size = useWindowSize();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (data && toNumber(data, 18) > 0) {
      useGlobalStore.setState({ showRoyaltyPopup: true });
    }
    if (!isConnected) {
      useGlobalStore.setState({ showRoyaltyPopup: false });
    }
  }, [data, isConnected]);

  return (
    <>
      {showRoyaltyPopup && (
        <div className="absolute">
          <div
            className={`fixed left-0 top-0 ${comicSans.className} z-20 h-[100lvh] w-screen backdrop-blur-sm`}
          />
          <Confetti
            width={size.width || 1000}
            height={size.height || 1000}
            gravity={0.2}
          />
          <div className="fixed z-[40] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <motion.div
              initial={{
                scale: 0,
                rotate: 0,
              }}
              animate={{
                scale: 1,
                rotate: 1080,
              }}
              transition={{ duration: 1.5, ease: "linear" }}
              className={`w-[300px] bg-green-500 p-4 ${comicSans.className} h-[200px] border-2 border-black text-center flex flex-col items-center justify-center  z-40`}
            >
              <div className="text-xl flex flex-col">
                <span className="">Congratss! 🎉</span>
                <span className="">
                  loooks like you have earned some $BRAINLET 🤤
                </span>
              </div>
              <Button
                onClick={() => {
                  router.push(`/dashboard`);
                  useGlobalStore.setState({ showRoyaltyPopup: false });
                }}
                className=" px-2.5 mt-4 bg-gradient-to-r w-[200px] py-1 from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
              >
                Go to Dashboard
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
