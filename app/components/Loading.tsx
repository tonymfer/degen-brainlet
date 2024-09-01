import { cn } from "@/utils/classnames";
import { motion } from "framer-motion";
import React from "react";
import logo from "@brainlet/logo.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col z-[10] inset-0 absolute w-screen h-screen backdrop-blur-lg items-center justify-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <Image src={logo} width={80} height={120} alt="logo" />
      </motion.div>
      <div className="">Loading...</div>
    </div>
  );
}
