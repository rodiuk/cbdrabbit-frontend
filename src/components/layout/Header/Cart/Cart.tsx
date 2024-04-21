"use client";

import React from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { cartAtom } from "@/libs/store/atoms";
import { CartIcon } from "@/components/icons/Cart";

import styles from "./Cart.module.css";

interface Props {
  lang: string;
}

export const Cart = ({ lang }: Props): React.JSX.Element => {
  const [cart] = useAtom(cartAtom);
  console.log(cart?.totalCount);

  return (
    <Link href={`/${lang}/checkout`} className={styles.container}>
      <CartIcon />
    </Link>
  );
};
