"use client";

import React, { useMemo } from "react";
import { Locale } from "../../../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";
import { usePathname } from "next/navigation";
import { IHeaderTitles } from "@/interfaces/headerTitles.interface";

import styles from "./PageTitle.module.css";

interface Props {
  lang: Locale;
}

export const PageTitle = (props: Props): React.JSX.Element | null => {
  const { lang } = props;
  const pathname = usePathname();
  const [titles, setTitles] = React.useState<IHeaderTitles | null>(null);
  React.useEffect(() => {
    (async function fetchLocale() {
      const { titles } = (await getDictionary(lang)).header;
      setTitles(titles as IHeaderTitles);
    })();
  }, [lang]);

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
      [`/${lang}/blog/`]: titles?.post, // need fixed
      [`/${lang}/about`]: titles?.about,
      [`/${lang}/whereToBuy`]: titles?.whereToBuy,
      [`/${lang}/checkout-info`]: titles?.checkoutInfo,
      [`/${lang}/about-cbd`]: titles?.aboutCbd,
      [`/${lang}/policy`]: titles?.policy,
      [`/${lang}/privacy`]: titles?.privacy,
    };
  }, [lang, titles]);

  const rendererContent = content[pathname] ?? null;

  return !!rendererContent ? (
    <p className={styles.container}>{rendererContent}</p>
  ) : null;
};
