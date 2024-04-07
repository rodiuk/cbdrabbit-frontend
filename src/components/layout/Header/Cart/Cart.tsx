import React from "react";
import Link from "next/link";
import { CartIcon } from "@/components/icons/Cart";

import styles from "./Cart.module.css";

interface Props {
  lang: string;
}

export const Cart = ({ lang }: Props): React.JSX.Element => {
  return (
    <Link href={`/${lang}/checkout`} className={styles.container}>
      <CartIcon />
    </Link>
  );
};
