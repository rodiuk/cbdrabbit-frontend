import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
});

export const fonts = {
  roboto,
};
