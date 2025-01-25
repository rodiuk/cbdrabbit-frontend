import { Suspense } from "react";

import type { Metadata } from "next";
import { Providers } from "../providers";
import { appConfig } from "@/configs/app.config";
import { Scripts } from "@/components/layout/Scripts";
import { Header } from "@/components/layout/Header/Header";
import { i18n } from "../../../../i18n.config";
import { IPageParams } from "@/interfaces/page.interface";

import { getDictionary } from "@/libs/18n/getDictionary";
import dynamic from "next/dynamic";
import LabelListener from "@/components/LabelListener";
import { fonts } from "../fonts";

import Favicon from "/public/favicon.ico";

const CartBanner = dynamic(() => import("@/components/CartBanner/CartBanner"), {
  ssr: false,
});

import cn from "clsx";
import "../globals.css";

export const metadata: Metadata = {
  title: "CBD Rabbit",
  description:
    "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
  metadataBase: new URL(appConfig.PUBLIC_DOMAIN),
  icons: [{ rel: "icon", url: Favicon.src }],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: IPageParams }>) {
  const isProduction = process.env.NODE_ENV === "production";
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn(fonts.manrope.variable, fonts.merriweather.variable)}>
        <Providers>
          <Header lang={params.lang} />
          {children}

          <CartBanner
            currency={dict.currency}
            lang={params.lang}
            checkoutLabel={dict.cartBanner.checkoutLabel}
            buttonLabel={dict.cartBanner.checkoutButton}
          />

          <Suspense fallback={null}>
            <LabelListener />
          </Suspense>
        </Providers>

        {isProduction && <Scripts />}
      </body>
    </html>
  );
}
