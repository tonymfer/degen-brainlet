import React from "react";
import bg from "@brainlet/bg.png";
import Image from "next/image";
import one from "@brainlet/coffee.png";
import two from "@brainlet/hat.png";
import three from "@brainlet/base-degen.png";
import four from "@brainlet/hang.png";
import { motion } from "framer-motion";

export default function Buddies() {
  return (
    <div className="inset-0 rotate-180 md:rotate-0 pointer-events-none absolute w-screen h-screen bg-transparent">
      {[one, two, three, four].map((src, index) => (
        <motion.div
          key={index}
          initial={{ y: index * 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: index * 0.1,
            duration: 1,
          }}
          className={`absolute ${
            index === 0
              ? "left-[4%] w-[40vw] md:w-[30vw] -bottom-5 z-[100]"
              : index === 1
              ? "left-[27%] w-[30vw] md:w-[20vw] -bottom-5 z-[100]"
              : index === 2
              ? "left-1/3 md:left-[55%] w-[40vw] md:w-[40vw] -bottom-5 z-[100]"
              : "scale-x-[-1] left-3/4 md:left-[80%] w-[40vw] md:w-[20vw] -bottom-5 z-[100]"
          }`}
        >
          <Image src={src} alt="bg" width={500} />
        </motion.div>
      ))}
    </div>
  );
}
