"use client";

import React from "react";
import Link from "next/link";
import MobileMainLogoIcon from "@/components/icons/MobileMainLogo";

import logo from "/public/img/logoHome.svg";

import cn from "clsx";
import styles from "./styles.module.css";
import BaseLogoIcon from "@/components/icons/BaseLogo";

interface Props {
  lang: string;
}

export const HomeLogo = ({ lang }: Props): React.JSX.Element => {
  return (
    <Link
      href={`/${lang}/`}
      className={cn(styles.container, styles.home_container)}
    >
<BaseLogoIcon iconStyle={styles.mobile_home_logo} />
      <MobileMainLogoIcon iconStyle={styles.home_logo} />
    </Link>
  );
};
