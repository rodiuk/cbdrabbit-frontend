import React from "react";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";
import { Cart } from "./Cart/Cart";
import { Menu } from "./Menu/Menu";
import { LogoContainer } from "./Logo/LogoContainer";
import { Locale } from "../../../../i18n.config";
import { PageTitle } from "./PageTitle/PageTitle";

import cn from "clsx";
import styles from "./Header.module.css";

interface Props {
  lang: Locale;
}

export const Header = ({ lang }: Props): React.JSX.Element => {
  return (
    <header className={cn("container", styles.container)}>
      <LogoContainer lang={lang} />
      <PageTitle lang={lang} />
      <nav className={styles.navigation}>
        <LocaleSwitcher current={lang} />
        <Cart lang={lang} />
        <Menu />
      </nav>
    </header>
  );
};
