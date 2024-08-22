import React from "react";
import bg from "@brainlet/bg.png";
import Image from "next/image";
import one from "@brainlet/coffee.png";
import two from "@brainlet/hat.png";
import three from "@brainlet/base-degen.png";
import four from "@brainlet/hang.png";

export default function LongComponent() {
  return (
    <div className="w-full mt-[400px] h-fit">
      <Image src={bg} alt="bg" width={1000} className="w-screen" />
    </div>
  );
}
