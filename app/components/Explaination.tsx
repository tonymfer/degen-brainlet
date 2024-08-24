import Image from "next/image";
import React from "react";
import plainBrainlet from "@brainlet/animation/brainlet.png";
import logo from "@brainlet/logo.png";
import degen from "@brainlet/degen@2x.png";
import { comicSans } from "../fonts";

export default function Explaination() {
  return (
    <div className="flex items-center mt-40 relative justify-center gap-4 md:gap-[60px]">
      <div className="flex flex-col items-center">
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
      <div className="flex flex-col relative items-center">
        <Image
          src={degen}
          alt="brainlet"
          width={500}
          height={500}
          className="w-[10vw]"
        />
      </div>
      <span className={`${comicSans.className} text-[7vw]`}>=</span>
      <div className="flex flex-col items-center">
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
      </div>
      <span
        className={`${comicSans.className} absolute bottom-0 left-1/2 -translate-x-1/2 text-[2vw] mt-2`}
      >
        Degen
      </span>
    </div>
  );
}
