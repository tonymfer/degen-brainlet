"use client";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import bgMusic from "@sounds/brainlet-bgm-lofi.mp3";
import brainlet from "@brainlet/animation/brainlet.png";
import hat from "@brainlet/animation/hat.png";
import hatTopInner from "@brainlet/animation/hat-top-inner.png";
import hatTopOuter from "@brainlet/animation/hat-top-outer.png";
import scissorClose from "@brainlet/animation/scissor-close.png";
import scissorOpen from "@brainlet/animation/scissor-open.png";
import brainTop from "@brainlet/animation/brain-top.png";
import brainBottom from "@brainlet/animation/brain-bottom.png";
import brainDisconnected from "@brainlet/animation/brain-disconnected.png";
import water from "@brainlet/animation/water.png";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { duruSans, notoSans, patrickHand, rockSalt, sue } from "./fonts";
import LongComponent from "./components/LongComponent";
import mainText from "@brainlet/animation/main-text.png";
import Buddies from "./components/Buddies";
const spring = {
  stiffness: 300,
  damping: 60,
};

const randomSliceNumber = Math.floor(Math.random() * 10) + 1;

export default function Home() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [sliceCount, setSliceCount] = useState(0);
  const [sliceSuccess, setSliceSuccess] = useState(false);

  const [play, data] = useSound(bgMusic, {
    loop: true,
    volume: 0.5,
  });

  useEffect(() => {
    if (7 <= sliceCount && !sliceSuccess) {
      setSliceSuccess(true);
      play?.();
    }
  }, [sliceCount]);

  return (
    <main className="flex relative min-h-screen overflow-clip flex-col items-center justify-center">
      <Buddies />
      <AnimatePresence>
        {sliceSuccess && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.3,
            }}
            className={`${patrickHand.className} absolute top-[10%] -translate-x-full flex flex-col items-center justify-self-center font-[900] text-7xl lg:text-9xl text-[#1EFF1E]`}
          >
            <span className="">BRAINLET</span>
            <span className={`text-[#53269E] text-3xl ${rockSalt.className}`}>
              on degen chain
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <>
        <motion.div
          whileHover="hover"
          whileTap="hover"
          onMouseDown={() => setMouseDown(true)}
          onTouchStart={() => setMouseDown(true)}
          onTouchEnd={() => setMouseDown(false)}
          onMouseUp={() => setMouseDown(false)}
          onClick={() => !sliceSuccess && setSliceCount(sliceCount + 1)}
          variants={container}
          className="relative "
        >
          {!sliceSuccess && (
            <motion.div
              variants={explain}
              className={`text-2xl ${notoSans.className} text-center absolute left-[60%] top-0 -translate-x-1/2 translate-y-1/2 font-bold `}
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
                className={`absolute -left-2 top-5 z-[10] -translate-y-1/2 font-bold`}
              >
                <Image src={mainText} alt="Brainlet" width={220} height={220} />
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
      </>
      {/* <LongComponent /> */}
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
