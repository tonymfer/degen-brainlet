import Image from "next/image";
import React from "react";
import plainBrainlet from "@brainlet/animation/brainlet.png";
import logo from "@brainlet/logo.png";
import degen from "@brainlet/degen@2x.png";
import { comicSans } from "../fonts";
import { motion } from "framer-motion";

export default function Explaination() {
  return (
    <div className="flex flex-col md:flex-row items-center mt-40 relative justify-center gap-4 md:gap-[60px]">
      <div className="flex items-center gap-[60px] justify-center">
        <div className="flex flex-col h-full items-center">
          <Image
            src={plainBrainlet}
            alt="brainlet"
            width={500}
            height={500}
            className="w-[25vw] -translate-y-[10%]"
          />
          <span className={`${comicSans.className} text-[2vw] mt-2`}>
            Brainlet
          </span>
        </div>
        <span className={`${comicSans.className} text-[7vw]`}>+</span>
        <div className="flex flex-col relative items-center justify-end md:justify-center h-full">
          <Image
            src={degen}
            alt="brainlet"
            width={800}
            height={800}
            className="w-[40vw] sm:w-[10vw]"
          />
          <span className={`${comicSans.className} mt-10 md:hidden text-[2vw]`}>
            Degen
          </span>
        </div>
      </div>
      <span className={`${comicSans.className} text-[7vw]`}>=</span>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col items-center"
      >
        <Image
          src={logo}
          alt="brainlet"
          width={500}
          height={500}
          className="w-[25vw] -translate-x-[10%]"
        />
        <span className={`${comicSans.className} text-[3vw] leading-none mt-2`}>
          🤤
        </span>
      </motion.div>
      <span
        className={`${comicSans.className} hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 text-[2vw] mt-2`}
      >
        Degen
      </span>
    </div>
  );
}
