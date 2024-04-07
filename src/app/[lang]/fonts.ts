import { Manrope, Merriweather } from "next/font/google";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["cyrillic", "latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
});

export const fonts = {
  manrope,
  merriweather,
};
