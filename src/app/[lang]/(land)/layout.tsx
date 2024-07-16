import type { Metadata } from "next";
import { Providers } from "../providers";
import { appConfig } from "@/configs/app.config";
import { Scripts } from "@/components/layout/Scripts";
import { i18n } from "../../../../i18n.config";
import { IPageParams } from "@/interfaces/page.interface";


import { fonts } from "../fonts";
import cn from "clsx";
import "../globals.css";

import Favicon from "/public/favicon.ico";

export const metadata: Metadata = {
  title: "CBD Rabbit",
  description:
    "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
  metadataBase: new URL(appConfig.DOMAIN),
  icons: [{ rel: "icon", url: Favicon.src }],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function LandLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: IPageParams }>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn(fonts.manrope.variable, fonts.merriweather.variable)}>
        <Providers>{children}</Providers>

        {isProduction && <Scripts />}
      </body>
    </html>
  );
}
