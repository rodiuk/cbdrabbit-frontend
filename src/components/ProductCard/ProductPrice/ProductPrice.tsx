"use client";

import React from "react";
import { useAtom, useStore } from "jotai";
import { getProductNewPriceAtom } from "@/libs/store/atoms";

import cn from "clsx";
import styles from "./ProductPrice.module.css";

interface Props {
  currentPrice: number;
  currency: string;
}

export const ProductPrice = ({
  currentPrice: defaultPrice,
  currency,
}: Props): React.JSX.Element => {
  const [newPrice] = useAtom(getProductNewPriceAtom, {
    store: useStore(),
  });

  const hasNewPrice = newPrice !== 80 && newPrice !== 0;

  return (
    <div className={styles.container}>
      <p
        className={cn(styles.current, {
          [styles.crossed]: hasNewPrice,
        })}
      >
        {defaultPrice}
      </p>
      {hasNewPrice && <p className={styles.sale}>{newPrice}</p>}
      {currency}
    </div>
  );
};
