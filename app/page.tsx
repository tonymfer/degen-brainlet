"use client";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import brainlet from "@brainlet/animation/brainlet.png";
import hat from "@brainlet/animation/hat.png";
import hatTopInner from "@brainlet/animation/hat-top-inner.png";
import hatTopOuter from "@brainlet/animation/hat-top-outer.png";
import scissorClose from "@brainlet/animation/scissor-close.png";
import scissorOpen from "@brainlet/animation/scissor-open.png";
import brainTop from "@brainlet/animation/brain-top.png";
import arrow from "@brainlet/animation/arrow.png";
import brainBottom from "@brainlet/animation/brain-bottom.png";
import brainDisconnected from "@brainlet/animation/brain-disconnected.png";
import water from "@brainlet/animation/water.png";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  comicSans,
  comicSansBold,
  duruSans,
  justAnotherHand,
  notoSans,
  patrickHand,
  rockSalt,
  sue,
} from "./fonts";
import LongComponent from "./components/LongComponent";
import mainText from "@brainlet/animation/main-text.png";
import Buddies from "./components/Buddies";
import Link from "next/link";
import Explaination from "./components/Explaination";
const spring = {
  stiffness: 300,
  damping: 60,
};

export default function Home() {
  const [mouseDown, setMouseDown] = useState(false);
  const [sliceCount, setSliceCount] = useState(0);
  const [sliceSuccess, setSliceSuccess] = useState(false);

  const [play, { pause, stop }] = useSound("/sounds/brainlet-bgm-lofi.mp3", {
    loop: true,
  });

  useEffect(() => {
    if (play) play();
    return () => {
      stop();
    };
  }, []);

  return (
    <main className="flex py-10 relative w-full min-h-screen overflow-clip flex-col items-center justify-center">
      <div className="flex flex-col relative h-[100vh] items-center w-full justify-center">
        <AnimatePresence>
          {sliceSuccess && (
            <motion.div
              initial={{ y: 100, opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "fit-content" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.3,
              }}
              className={`${comicSansBold.className} flex pb-40 sm:pb-[400px] leading-none flex-col items-center font-[900] text-6xl sm:text-[170px] text-[#1EFF1E]`}
            >
              <span className="">BRAINLET</span>
              <span
                className={`text-black text-3xl sm:text-6xl leading-none tracking-wide ${sue.className}`}
              >
                on Base Chain L3
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover="hover"
          whileTap="hover"
          onMouseDown={() => setMouseDown(true)}
          onTouchStart={() => setMouseDown(true)}
          onTouchEnd={() => setMouseDown(false)}
          onMouseUp={() => setMouseDown(false)}
          onClick={() => {
            if (sliceCount >= 2) {
              setSliceSuccess(true);
              stop();

              play({
                forceSoundEnabled: true,
              });
            } else {
              setSliceCount(sliceCount + 1);
            }
          }}
          variants={container}
          className="absolute -bottom-[1%] overflow-hidden mt-5"
        >
          {!sliceSuccess && (
            <motion.div
              variants={explain}
              className={`text-3xl ${sue.className} text-center absolute left-[57%] top-0 -translate-x-1/2 translate-y-1/2 font-bold `}
            >
              cut to start
            </motion.div>
          )}
          <AnimatePresence>
            {sliceSuccess && (
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                }}
                className={`absolute -left-4 top-0 z-[10] -translate-y-1/2 font-bold`}
              >
                <Image src={mainText} alt="Brainlet" width={240} height={220} />
              </motion.div>
            )}
          </AnimatePresence>
          <Image src={brainlet} alt="Brainlet" width={400} height={400} />
          <motion.div className="absolute left-0 top-0 z-[2]">
            <Image src={hat} alt="Brainlet" width={400} height={400} />
          </motion.div>
          <Image
            src={hatTopInner}
            alt="Brainlet"
            width={400}
            height={400}
            className="absolute left-0 top-0 z-[0]"
          />
          <motion.div
            variants={openHat}
            style={{
              transformOrigin: "73% 24%",
            }}
            className="absolute left-0 top-0 z-[1]"
            transition={spring}
          >
            <Image src={hatTopOuter} alt="Brainlet" width={400} />
          </motion.div>
          <motion.div
            className="absolute left-0 top-0 z-[1]"
            transition={spring}
            style={{
              opacity: sliceSuccess ? 1 : 0,
            }}
          >
            <Image src={water} alt="Brainlet" width={400} />
          </motion.div>
          <motion.div
            variants={brains}
            initial={{ y: 80 }}
            className="absolute left-0 top-0 z-[1]"
            transition={spring}
            style={{
              opacity: sliceSuccess ? 1 : 0,
            }}
          >
            <Image src={brainDisconnected} alt="Brainlet" width={400} />
          </motion.div>
          <motion.div
            variants={brains}
            initial={{ y: 80 }}
            className="absolute left-0 top-0 z-[1]"
            style={{
              opacity: sliceSuccess ? 0 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.1,
            }}
          >
            <Image src={brainTop} alt="Brainlet" width={400} />
          </motion.div>
          <motion.div
            variants={explain}
            className="absolute left-0 top-0 z-[0]"
            style={{
              opacity: sliceSuccess ? 0 : 1,
            }}
            transition={spring}
          >
            <Image src={arrow} alt="Brainlet" width={400} />
          </motion.div>
          <motion.div
            variants={brains}
            initial={{ y: 80 }}
            className="absolute left-0 top-0 z-[0]"
            style={{
              opacity: sliceSuccess ? 0 : 1,
            }}
            transition={spring}
          >
            <Image src={brainBottom} alt="Brainlet" width={400} />
          </motion.div>
          {!sliceSuccess && (
            <motion.div
              variants={scissor}
              initial={{ x: -10, opacity: 0 }}
              className="absolute left-0 top-0 z-[0]"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.1,
              }}
            >
              {mouseDown ? (
                <Image src={scissorClose} alt="Brainlet" width={400} />
              ) : (
                <Image src={scissorOpen} alt="Brainlet" width={400} />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {sliceSuccess && (
          <>
            <motion.button
              variants={brains}
              initial={{ y: -100, opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "fit-content" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.3,
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  "0xC97e22D7Dc2aBcC96964f6B7E8717e9c960758d4"
                );
              }}
              className={`${comicSansBold.className} mt-10 sm:mt-20 flex flex-col gap-10 items-center justify-center h-fit relative hover:underline-offset-4 text-orange-400 text-lg font-bold text-center`}
            >
              <div className="relative group">
                <div
                  className={`group-hover:opacity-100 opacity-0 text-black mt-2 ${comicSans.className} text-lg md:text-7xl`}
                >
                  <span className=" text-lg">click to copy👇</span>
                </div>
                <div className="flex group text-[2.5vw] leading-none items-end gap-1 text-black">
                  <span className="text-black">$BRAINLET(L3):</span>
                  0xC97e22D7Dc2aBcC96964f6B7
                  <span className="group-hover:opacity-0 text-[1.5vw] leading-normal group-hover:hidden transition-all overflow-hidden">
                    ...umm🤤...
                  </span>
                  E8717e9c960758d4
                </div>
              </div>
              <div className="flex my-20 flex-col sm:flex-row gap-20 sm:gap-[80px] items-center text-5xl sm:text-[6vw] font-bold justify-center">
                <Link
                  href="https://mint.club/token/degen/BRAINLET"
                  passHref
                  className={`underline underline-offset-8 mt-5 ${comicSansBold.className} text-orange-500`}
                >
                  explooorer
                </Link>
                <Link
                  href="https://"
                  passHref
                  className={`underline underline-offset-8 mt-5 ${comicSansBold.className} text-[#916af3]`}
                >
                  fartcaster
                </Link>
              </div>
            </motion.button>
            <Buddies />
          </>
        )}
      </AnimatePresence>
      {sliceSuccess && (
        <div className="flex flex-col justify-center mt-20 items-center">
          <Link
            href="https://mint.club/token/degen/BRAINLET"
            passHref
            className={`w-full text-[8vw] text-center px-5 sm:px-10 mt-5 ${comicSansBold.className} text-blue-600`}
          >
            <div className=" p-10 bg-gradient-to-r rounded-2xl from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]">
              brrruuuuuuuuuuy
            </div>
          </Link>
          <Explaination />
          <LongComponent />
        </div>
      )}
    </main>
  );
}
const explain = {
  hover: {
    opacity: 0,
  },
  notHover: {
    opacity: 100,
  },
};

const brains: Variants = {
  hover: {
    y: "0%",
  },
  notHover: {
    y: 80,
  },
};

const scissor: Variants = {
  hover: {
    x: "0%",
    opacity: 1,
  },
  notHover: {
    x: -50,
    opacity: 0,
  },
};
// const openHat = {
//   hover: {
//     rotate: 140,
//   },
//   notHover: {
//     rotate: 0,
//   },
// };
const openHat = {
  hover: {
    rotate: 140,
  },
  notHover: {
    rotate: 0,
  },
};

const container = {
  hover: {},
  notHover: {},
};
