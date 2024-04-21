import React from "react";
import { LogoContainer } from "./Logo/LogoContainer";
import { Locale } from "../../../../i18n.config";
import { PageTitle } from "./PageTitle/PageTitle";
import { NavWrapper } from "./NavWrapper";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./Header.module.css";

interface Props {
  lang: Locale;
}

export const Header = async ({ lang }: Props): Promise<React.JSX.Element> => {
  const dict = await getDictionary(lang);

  return (
    <header className={cn("container", styles.container, styles.header)}>
      <LogoContainer lang={lang} />
      <PageTitle lang={lang} />
      <NavWrapper lang={lang} dict={dict.header} />
    </header>
  );
};
