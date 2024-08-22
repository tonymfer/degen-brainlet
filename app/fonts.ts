import {
  Patrick_Hand,
  Rock_Salt,
  Noto_Sans,
  Duru_Sans,
  Sue_Ellen_Francisco,
} from "next/font/google";

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
