import type { Metadata } from "next";
import {
  Inter,
  Patrick_Hand,
  Rock_Salt,
  Sue_Ellen_Francisco,
  Noto_Sans,
  Duru_Sans,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--patrick-hand",
});

export const rockSalt = Rock_Salt({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--rock-salt",
});

export const notoSans = Noto_Sans({
  weight: ["400", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--noto-sans",
});
export const duruSans = Duru_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--duru-sans",
});

export const sue = Sue_Ellen_Francisco({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--sue-ellen-francisco",
});

// export const metadata: Metadata = {
//   title: "L3 Brainlets",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
