import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "./components/Header";
import ClientToaster from "./components/Toaster";

const title = "Brainlets on DegenL3";
const description = "Brainlet L3 is the future of finance 🤤";

export const metadata: Metadata = {
  metadataBase: new URL("https://brainlets.life"),
  title,
  description,
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_ROOT_URL,
    locale: "en_US",
    title,
    siteName: "Brainlets",
    description,
    images: [
      {
        url: `/og-image-1200-630.png`,
        width: 1200,
        height: 630,
        alt: "Brainlets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: {
      url: `/og-image-1200-630.png`,
      width: 1200,
      height: 630,
      alt: "Brainlets",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/manifest.json`,
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://brainlets.life/og-1200-630.png",
    "fc:frame:button:1": "Go Brrrruuy",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://brainlets.life",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Header />
        <div className="relative z-10 overflow-y-scroll text-black hide-scrollbar flex h-full w-full flex-col">
          {children}
        </div>
      </body>
      <ClientToaster />
    </html>
  );
}
