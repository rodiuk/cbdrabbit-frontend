import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/img/logoHome.svg";

import styles from "./HomeLogo.module.css";

interface Props {
  lang: string;
}

export const HomeLogo = ({ lang }: Props): React.JSX.Element => {
  return (
    <Link href={`/${lang}/`} className={styles.container}>
      <Image src={logo} alt="Logo" />
    </Link>
  );
};
