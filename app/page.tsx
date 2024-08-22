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
import { motion, Variants } from "framer-motion";
import { duruSans, notoSans, patrickHand, rockSalt, sue } from "./layout";
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
    <main className="flex min-h-screen overflow-clip flex-col items-center justify-center pb-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={sliceSuccess ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        className={`${patrickHand.className} font-[900] text-8xl text-black`}
      >
        BRAINLET ON L3
      </motion.div>
      <>
        <motion.div
          whileHover="hover"
          whileTap="hover"
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
          onClick={() => !sliceSuccess && setSliceCount(sliceCount + 1)}
          variants={container}
          className="relative "
        >
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
      {!sliceSuccess && (
        <div className={`text-2xl ${notoSans.className} font-bold `}>
          slice to start
        </div>
      )}
    </main>
  );
}

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
