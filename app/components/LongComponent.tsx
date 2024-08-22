import React from "react";
import bg from "@brainlet/bg.png";
import Image from "next/image";

export default function LongComponent() {
  return (
    <div className="w-full mt-[400px] h-fit">
      <Image src={bg} alt="bg" width={1000} className="w-screen" />
    </div>
  );
}
