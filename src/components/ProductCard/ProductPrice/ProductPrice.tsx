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
    return newPrice !== 80 && newPrice !== 0;
  }, [newPrice]);

  return (
    <div className={styles.container} suppressHydrationWarning>
      <p
        className={cn(styles.current, {
          [styles.crossed]: hasPriceChange,
        })}
      >
        {defaultPrice}
      </p>
      {hasPriceChange && <p className={styles.sale}>{newPrice}</p>}
      {currency}
    </div>
  );
};

export default ProductPrice;
