import { comicSans, comicSansBold } from "@/fonts";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center ${comicSans.className} text-3xl`}
    >
      Coming Soon
      <Link
        href="https://mint.club/dashboard/royalties"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline underline-offset-8 mt-5 ${comicSansBold.className} text-[#916af3]`}
      >
        Claim in mintclub for now 🤤
      </Link>
    </div>
  );
}
