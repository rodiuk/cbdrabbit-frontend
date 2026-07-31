"use client";

import React from "react";
import { useCandyPromotion } from "@/hooks/useCandyPromotion";

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
  const { isActive, promotionalPrice } = useCandyPromotion();
  const hasPriceChange = isActive && promotionalPrice < defaultPrice;

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
      {hasPriceChange && <p className={styles.sale}>{promotionalPrice}</p>}
    </div>
  );
};

export default ProductPrice;
