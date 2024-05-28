"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Locale } from "../../../../../i18n.config";
import { HomeLogo } from "./HomeLogo";
import { BaseLogo } from "./BaseLogo";

interface Props {
  lang: Locale;
}

export const LogoContainer = ({ lang }: Props): React.JSX.Element => {
  const pathname = usePathname();

  const isMainPage = pathname === `/${lang}/` || pathname === `/${lang}`;

  const isCheckoutPage = pathname === `/${lang}/checkout`;

  return (
    <>
      {/* {isMainPage && <HomeLogo lang={lang} />} */}
	  <HomeLogo lang={lang} />
      {/* {!isCheckoutPage && !isMainPage && <BaseLogo lang={lang} />} */}
    </>
  );
};
