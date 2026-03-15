"use client";

import React from "react";
import PercentageHeartIcon from "@/components/icons/PercentageHeartIcon";

import cn from "clsx";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  notAuthorized: boolean;
  classNames?: string;
}

export const HeaderCTA = ({ title, notAuthorized, classNames }: Props) => {
  const pathname = usePathname();

  if ((typeof window !== "undefined" && pathname?.length > 3) || !notAuthorized)
    return <></>;

  return (
    <div className={cn(styles.not_auth_cta, classNames)}>
      <div>{title}</div>
      <PercentageHeartIcon />
    </div>
  );
};
