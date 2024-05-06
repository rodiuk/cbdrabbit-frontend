import React, { ReactNode } from "react";

import cn from "clsx";
import styles from "./InfoField.module.css";

interface Props {
  title: string;
  children: ReactNode;
  hasBorder?: boolean;
}

export const InfoField = (props: Props): React.JSX.Element => {
  const { title, children, hasBorder } = props;

  return (
    <li
      className={cn(styles.container, {
        [styles.border]: hasBorder,
      })}
    >
      <h3 className={styles.title}>{title}</h3>
      {children}
    </li>
  );
};
