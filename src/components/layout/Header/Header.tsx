import React from "react";

import cn from "clsx";
import styles from "./Header.module.css";

export const Header = (): React.JSX.Element => {
  return <header className={cn("container", styles.container)}>Header</header>;
};
