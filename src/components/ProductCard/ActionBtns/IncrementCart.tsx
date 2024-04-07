"use client";

import React from "react";
import { useAtom, useStore } from "jotai";
import { addProductToCartAtom } from "@/libs/store/atoms";
import { Product } from "@prisma/client";
import { PlusIcon } from "@/components/icons/Plus";

import styles from "./buttons.module.css";

interface Props {
  product: Product;
}

export const IncrementCart = ({ product }: Props) => {
  const [_, add] = useAtom(addProductToCartAtom, {
    store: useStore(),
  });

  return (
    <button onClick={() => add(product)} className={styles.container}>
      <PlusIcon iconStyle={styles.icon} />
    </button>
  );
};