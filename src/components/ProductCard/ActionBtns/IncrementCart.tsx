"use client";

import React from "react";
import { useAtom } from "jotai";
import { addProductToCartAtom } from "@/libs/store/atoms";
import { Product } from "@prisma/client";
import { PlusIcon } from "@/components/icons/Plus";

import styles from "./buttons.module.css";

interface Props {
  product: Product;
}

export const IncrementCart = ({ product }: Props) => {
  const [cart, add] = useAtom(addProductToCartAtom);
  const itemCount = cart.products.find(p => p.id === product.id)?.count || 0;

  return (
    <button
      onClick={() => add(product)}
      className={styles.container}
      disabled={itemCount >= 500}
    >
      <PlusIcon iconStyle={styles.icon} />
    </button>
  );
};
