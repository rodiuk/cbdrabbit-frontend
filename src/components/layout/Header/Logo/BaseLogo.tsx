import React from "react";
import Link from "next/link";
import BaseLogoIcon from "@/components/icons/BaseLogo";

import styles from "./styles.module.css";

interface Props {
  lang: string;
}

export const BaseLogo = ({ lang }: Props): React.JSX.Element => {
  return (
    <Link href={`/${lang}`} className={styles.container}>
      <BaseLogoIcon />
    </Link>
  );
};
