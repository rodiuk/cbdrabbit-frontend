import React from "react";
import { HomeLogo } from "./HomeLogo/HomeLogo";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";

import cn from "clsx";
import styles from "./Header.module.css";
import { Cart } from "./Cart/Cart";
import { Menu } from "./Menu/Menu";

interface Props {
  lang: string;
}

export const Header = ({ lang }: Props): React.JSX.Element => {
  return (
    <header className={cn("container", styles.container)}>
      <HomeLogo lang={lang} />
      <nav className={styles.navigation}>
        <LocaleSwitcher current={lang} />
        <Cart lang={lang} />
        <Menu />
      </nav>
    </header>
  );
};
