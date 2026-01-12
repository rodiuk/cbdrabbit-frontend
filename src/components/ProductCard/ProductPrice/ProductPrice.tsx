"use client";

import React from "react";
import { useAtom } from "jotai";
import { getProductNewPriceAtom } from "@/libs/store/atoms";

import cn from "clsx";
import styles from "./ProductPrice.module.css";

interface Props {
  currentPrice: number;
  currency: string;
}

const ProductPrice = ({
  currentPrice: defaultPrice,
  currency,
}: Props): React.JSX.Element | null => {
  const [newPrice] = useAtom(getProductNewPriceAtom);

  const hasPriceChange = React.useMemo(() => {
    return newPrice !== 85 && newPrice !== 0;
  }, [newPrice]);

  return (
    <div className={styles.container} suppressHydrationWarning>
      <span className={styles.currency}>{currency}</span>
      <p
        className={cn(styles.current, {
          [styles.crossed]: hasPriceChange,
        })}
      >
        {defaultPrice}
      </p>
      {hasPriceChange && <p className={styles.sale}>{newPrice}</p>}
    </div>
  );
};

export default ProductPrice;
