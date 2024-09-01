import {
  Patrick_Hand,
  Rock_Salt,
  Noto_Sans,
  Duru_Sans,
  Sue_Ellen_Francisco,
  Just_Another_Hand,
} from "next/font/google";
import localFont from "next/font/local";

export const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--patrick-hand",
});

export const comicSans = localFont({
  src: "./fonts/sans/Ldfcomicsans-jj7l.ttf",
  display: "swap",
});

export const mferFont = localFont({
  src: "./fonts/sartoshi.ttf",
  display: "swap",
});

export const comicSansBold = localFont({
  src: "./fonts/sans/Ldfcomicsansbold-zgma.ttf",
  display: "swap",
});

export const justAnotherHand = Just_Another_Hand({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--just-another-hand",
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
