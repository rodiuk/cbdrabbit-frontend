import type { Metadata } from "next";
import { Providers } from "./providers";
import { appConfig } from "@/configs/app.config";
import { Scripts } from "@/components/layout/Scripts";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

import { fonts } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBD Rabbit",
  description:
    "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
  metadataBase: new URL(appConfig.DOMAIN),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="uk">
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
