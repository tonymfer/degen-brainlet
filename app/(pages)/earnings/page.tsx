import { comicSans } from "@/fonts";
import React from "react";

export default function page() {
  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${comicSans.className} text-5xl`}
    >
      Coming Soon
    </div>
  );
}
