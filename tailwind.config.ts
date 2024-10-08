import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "patrick-hand": ["var(--patrick-hand)"],
        "noto-sans": ["var(--noto-sans)"],
        "sue-ellen-francisco": ["var(--sue-ellen-francisco)"],
        "duru-sans": ["var(--duru-sans)"],
        "rock-salt": ["var(--rock-salt)"],
      },
      screens: {
        xs: "390px",
        sm: "480px",
        md: "640px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1536px",
      },
      colors: {
        primary: "var(--primary)",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("./tailwind-plugins/scrollbar.js"),
    require("./tailwind-plugins/padding.js"),
  ],
};
export default config;
