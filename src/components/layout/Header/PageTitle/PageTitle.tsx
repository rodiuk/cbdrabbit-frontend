"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Locale } from "../../../../../i18n.config";
import { IHeaderTitles } from "@/interfaces/headerTitles.interface";

import styles from "./PageTitle.module.css";

interface Props {
  lang: Locale;
  titles: IHeaderTitles;
}

export const PageTitle = ({
  lang,
  titles,
}: Props): React.JSX.Element | null => {
  const pathname = usePathname();

  const content = useMemo(() => {
    return {
      [`/${lang}/signIn`]: titles?.signIn,
      [`/${lang}/signUp`]: titles?.signUp,
      [`/${lang}/checkout`]: titles?.checkout,
      [`/${lang}/checkout?type=success`]: titles?.success,
      [`/${lang}/profile`]: titles?.profile,
      [`/${lang}/orders`]: titles?.orders,
      [`/${lang}/contacts`]: titles?.contacts,
      [`/${lang}/cooperation`]: titles?.cooperation,
      [`/${lang}/blog`]: titles?.blog,
      [`/${lang}/blog/`]: titles?.post,
      [`/${lang}/about`]: titles?.about,
      [`/${lang}/whereToBuy`]: titles?.whereToBuy,
      [`/${lang}/checkout-info`]: titles?.checkoutInfo,
      [`/${lang}/about-cbd`]: titles?.aboutCbd,
      [`/${lang}/policy`]: titles?.policy,
      [`/${lang}/privacy`]: titles?.privacy,
    };
  }, [lang, titles]);

  const rendererContent = content[pathname] ?? null;
  const isLandingPage = new RegExp(`^/${lang}/(classic|banana|matcha|coffee)$`).test(
    pathname
  );

  return !!rendererContent || isLandingPage ? (
    <p
      className={`${styles.container} ${
        isLandingPage ? styles.landingContainer : ""
      }`}
    >
      {rendererContent ?? titles?.candies}
    </p>
  ) : null;
};
