import React from "react";

import cn from "clsx";
import styles from "./Header.module.css";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";

export const Header = (): React.JSX.Element => {
  return (
    <header className={cn("container", styles.container)}>
      <h2>CBD Rabbit</h2>
      <LocaleSwitcher />
    </header>
  );
};
