"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMainLogoIcon from "@/components/icons/MobileMainLogo";

import logo from "/public/img/logoHome.svg";

import cn from "clsx";
import styles from "./styles.module.css";

interface Props {
  lang: string;
}

export const HomeLogo = ({ lang }: Props): React.JSX.Element => {
  return (
    <Link
      href={`/${lang}/`}
      className={cn(styles.container, styles.home_container)}
    >
      <Image src={logo} alt="Logo" className={styles.desktop_home_logo} />

      <MobileMainLogoIcon iconStyle={styles.mobile_home_logo} />
    </Link>
  );
};
