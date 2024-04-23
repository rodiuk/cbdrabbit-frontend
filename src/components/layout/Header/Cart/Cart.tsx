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

const Cart = ({ lang }: Props): React.JSX.Element => {
  const [cart] = useAtom(cartAtom);
  console.log(cart?.totalCount);

  return (
    <Link href={`/${lang}/checkout`} className={styles.container}>
		  <CartIcon />
		  <div className={styles.counter}>
			  {cart?.totalCount}
		  </div>
    </Link>
  );
};

export default Cart
