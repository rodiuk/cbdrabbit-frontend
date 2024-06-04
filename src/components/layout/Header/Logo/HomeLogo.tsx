"use client";

import React from "react";
import Link from "next/link";
import MobileMainLogoIcon from "@/components/icons/MobileMainLogo";

import cn from "clsx";
import styles from "./styles.module.css";
import BaseLogoIcon from "@/components/icons/BaseLogo";
import { usePathname } from "next/navigation";

import { ArrowRightIcon } from "@/components/icons/ArrowRight";

interface Props {
  lang: string;
}

export const HomeLogo = ({ lang }: Props): React.JSX.Element => {
  const pathname = usePathname();
  const isPrevIcon =
		pathname === `/${lang}/checkout` || pathname === `/${lang}/blog`;
	
  return (
    <Link
      href={`/${lang}/`}
      className={cn(styles.container, styles.home_container)}
    >
      {!isPrevIcon ? (
        <>
          <BaseLogoIcon iconStyle={styles.mobile_home_logo} />
          <MobileMainLogoIcon iconStyle={styles.home_logo} />
        </>
      ) : (
        <div className={styles.icon_left}>
          <ArrowRightIcon iconStyle={styles.arrow} />
        </div>
      )}
    </Link>
  );
};
