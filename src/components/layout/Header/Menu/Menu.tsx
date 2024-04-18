import React from "react";
import { BurgerMenuIcon } from "@/components/icons/BurgerMenu";

import styles from "./Menu.module.css";

interface Props {
	toggleMenu: () => void
}

export const Menu = ({toggleMenu}: Props): React.JSX.Element => {
  return (
    <div className={styles.container} onClick={() => toggleMenu()}>
      <BurgerMenuIcon />
    </div>
  );
};
