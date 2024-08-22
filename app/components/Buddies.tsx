import React from "react";
import bg from "@brainlet/bg.png";
import Image from "next/image";
import one from "@brainlet/coffee.png";
import two from "@brainlet/hat.png";
import three from "@brainlet/base-degen.png";
import four from "@brainlet/hang.png";

export default function Buddies() {
  return (
    <div className="inset-0 relative">
      <Image
        src={one}
        alt="bg"
        width={500}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]  bottom-0"
      />
    </div>
  );
}
