"use client";

import React from "react";
import { Locale } from "../../../../i18n.config";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";
import { Menu } from "./Menu/Menu";
import MenuDrop from "./MenuDrop/MenuDrop";
import { IHeaderDict } from "@/interfaces/i18n.interface";
import Cart from "@/components/layout/Header/Cart/Cart";

import styles from "./Header.module.css";
import LoginButton from "./ButtonTop/ButtonTop";
import { Session } from "next-auth";

interface Props {
  lang: Locale;
  dict: IHeaderDict;
  isAuthenticated: boolean;
  session: Session | null;
}

export const NavWrapper = ({
  lang,
  dict,
  session,
  isAuthenticated,
}: Props): React.JSX.Element => {
  const [isMenu, setIsMenu] = React.useState(false);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <>
      <nav className={styles.navigation}>
        <LoginButton
          lang={lang}
          isAuthenticated={isAuthenticated}
          label={dict.titles.signIn}
        />
        <div className={styles.headerSwitcher}>
          <LocaleSwitcher current={lang} />
        </div>

        <Cart lang={lang} />
        <Menu toggleMenu={toggleMenu} />
      </nav>
      {isMenu && (
        <MenuDrop
          lang={lang}
          toggleMenu={toggleMenu}
          session={session}
          dict={dict}
        />
      )}
    </>
  );
};
