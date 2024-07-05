import type { Metadata } from "next";
import { Providers } from "../providers";
import { appConfig } from "@/configs/app.config";
import { Scripts } from "@/components/layout/Scripts";
import { Header } from "@/components/layout/Header/Header";
import { i18n } from "../../../../i18n.config";
import { IPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";


import { fonts } from "../fonts";
import cn from "clsx";
import "../globals.css";

export const metadata: Metadata = {
  title: "CBD Rabbit",
  description:
    "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
  metadataBase: new URL(appConfig.DOMAIN),
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<IPageProps>) {
  const isProduction = process.env.NODE_ENV === "production";
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn(fonts.manrope.variable, fonts.merriweather.variable)}>
        <Providers>
          
          {children}


        </Providers>

        {isProduction && <Scripts />}
      </body>
    </html>
  );
}