"use client";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import bgMusic from "@sounds/bg-music.mp3";
import brainlet from "@brainlet/animation/brainlet.png";
import hat from "@brainlet/animation/hat.png";
import hatTopInner from "@brainlet/animation/hat-top-inner.png";
import hatTopOuter from "@brainlet/animation/hat-top-outer.png";
import scissorClose from "@brainlet/animation/scissor-close.png";
import scissorOpen from "@brainlet/animation/scissor-open.png";
import brainTop from "@brainlet/animation/brain-top.png";
import brainBottom from "@brainlet/animation/brain-bottom.png";
import brainDisconnected from "@brainlet/animation/brain-disconnected.png";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
const spring = {
  stiffness: 300,
  damping: 60,
};

export default function Home() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const [play, data] = useSound(bgMusic, {
    loop: true,
    volume: 0.5,
    // onload: () => {
    //   setLoaded(true);
    // },
  });

  useEffect(() => {
    if (play) play?.();
  }, [play]);

  return (
    <main className="flex min-h-screen overflow-clip flex-col items-center justify-center pb-40">
      {!clicked ? (
        <button
          onClick={() => {
            setClicked(true);
            play?.();
          }}
          className=" text-black p-40 font-duru-sans text-4xl"
        >
          click me
        </button>
      ) : (
        <>
          <div className="text-7xl font-rock-salt">BRAINLET on L3</div>
          <motion.div
            whileHover="hover"
            whileTap="hover"
            // onHoverStart={() => play?.()}
            variants={container}
            className="relative"
          >
            <Image src={brainlet} alt="Brainlet" width={500} height={500} />
            <motion.div className="absolute left-0 top-0 z-[1]">
              <Image src={hat} alt="Brainlet" width={500} height={500} />
            </motion.div>
            <Image
              src={hatTopInner}
              alt="Brainlet"
              width={500}
              height={500}
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
              <Image src={hatTopOuter} alt="Brainlet" width={500} />
            </motion.div>
            <motion.div
              variants={brains}
              initial={{ y: 100 }}
              className="absolute left-0 top-0 z-[0]"
              transition={spring}
            >
              <Image src={brainTop} alt="Brainlet" width={500} />
            </motion.div>
            <motion.div
              variants={brains}
              initial={{ y: 100 }}
              className="absolute left-0 top-0 z-[0]"
              transition={spring}
            >
              <Image src={brainBottom} alt="Brainlet" width={500} />
            </motion.div>
          </motion.div>
        </>
      )}
    </main>
  );
}

const brains: Variants = {
  hover: {
    y: "0%",
  },
  notHover: {
    y: 100,
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
