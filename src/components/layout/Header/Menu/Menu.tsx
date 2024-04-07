import React from "react";
import { BurgerMenuIcon } from "@/components/icons/BurgerMenu";

import styles from "./Menu.module.css";

interface Props {}

export const Menu = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <BurgerMenuIcon />
    </div>
  );
};
