"use client";

import React from "react";
import { useAtom, useStore } from "jotai";
import {
  getAllProductsAtom,
  removeProductFromCartAtom,
} from "@/libs/store/atoms";
import { Product } from "@prisma/client";
import { MinusIcon } from "@/components/icons/Minus";

import cn from "clsx";
import styles from "./buttons.module.css";

interface Props {
  product: Product;
}

export const DecrementCart = ({ product }: Props) => {
  const [, remove] = useAtom(removeProductFromCartAtom, {
    store: useStore(),
  });
  const [products] = useAtom(getAllProductsAtom, {
    store: useStore(),
  });

  const count = products.find(p => p.id === product.id)?.count ?? 0;

  return (
    <button
      onClick={() => remove(product)}
      className={cn(styles.container, {
        [styles.disabled]: count <= 0,
      })}
    >
      <MinusIcon iconStyle={styles.icon} />
    </button>
  );
};
