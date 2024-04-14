"use client";

import React from "react";
import { useAtom } from "jotai";
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
  const [, remove] = useAtom(removeProductFromCartAtom);
  const [products] = useAtom(getAllProductsAtom);

  const count = products.find(p => p.id === product.id)?.count;

  return (
    <button
      onClick={() => remove(product)}
      className={cn(styles.container, {
        [styles.disabled]: count && count <= 0,
      })}
    >
      <MinusIcon iconStyle={styles.icon} />
    </button>
  );
};
