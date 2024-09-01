const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_URL || "https://brainlets.vercel.app";

import { Metadata } from "next";

const title = "Farkaster - Farcaster with a hint of KAIST";
const description =
  "본딩커브 위에서 내 친구권이 사고팔리는 짜릿한 경험을 느껴보세요!";

const sharedMetadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_ROOT_URL),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/manifest.json`,
  robots: {},
};

export { sharedMetadata };
