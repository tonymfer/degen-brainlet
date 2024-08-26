import { cn } from "@/utils/classnames";
import { motion } from "framer-motion";
import React from "react";
import logo from "@brainlet/logo.png";
import Image from "next/image";

export default function Loading({
  spinnerColor = "primary",
  size = 24,
  className,
}: {
  spinnerColor?: "primary" | "grey";
  size?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-col inset-0 absolute w-screen h-screen items-center justify-center gap-2">
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
