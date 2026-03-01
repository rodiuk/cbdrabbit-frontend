import React from "react";
import PercentageHeartIcon from "@/components/icons/PercentageHeartIcon";

import cn from "clsx";
import styles from "./Header.module.css";

interface Props {
  title: string;
  classNames?: string;
}

export const HeaderCTA = ({ title, classNames }: Props) => {
  return (
    <div className={cn(styles.not_auth_cta, classNames)}>
      <div>{title}</div>
      <PercentageHeartIcon />
    </div>
  );
};
