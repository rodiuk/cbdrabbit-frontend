import type { Metadata } from "next";
import { Providers } from "./providers";
import { appConfig } from "@/configs/app.config";
import { Scripts } from "@/components/layout/Scripts";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { i18n } from "../../../i18n.config";
import { IPageProps } from "@/interfaces/page.interface";

import { fonts } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBD Rabbit",
  description:
    "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
  metadataBase: new URL(appConfig.DOMAIN),
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({ children, params }: Readonly<IPageProps>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang={params.lang}>
      <body className={fonts.roboto.variable}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

        {/* Scripts list with analytics and etc. */}
        {isProduction && <Scripts />}
      </body>
    </html>
  );
}
