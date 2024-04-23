"use client";

import React from "react";
import { Locale } from "../../../../i18n.config";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";
//import Cart from "./Cart/Cart";
import { Menu } from "./Menu/Menu";
import MenuDrop from "./MenuDrop/MenuDrop";
import { IHeaderDict } from "@/interfaces/i18n.interface";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/layout/Header/Cart/Cart"), {
	ssr: false,
  });

import styles from "./Header.module.css";

interface Props {
  lang: Locale;
  dict: IHeaderDict;
}

export const NavWrapper = ({ lang, dict }: Props): React.JSX.Element => {
  const [isMenu, setIsMenu] = React.useState(false);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <>
      <nav className={styles.navigation}>
        <LocaleSwitcher current={lang} />
        <Cart lang={lang} />
        <Menu toggleMenu={toggleMenu} />
      </nav>
      {isMenu && <MenuDrop lang={lang} toggleMenu={toggleMenu} dict={dict} />}
    </>
  );
};
