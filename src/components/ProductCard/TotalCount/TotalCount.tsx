"use client";

import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { IProductRes } from "@/interfaces/product.interface";
import { getAllProductsAtom, changeProductCountAtom } from "@/libs/store/atoms";

import cn from "clsx";
import styles from "./TotalCount.module.css";

interface Props {
  product: IProductRes;
  className?: string | undefined;
}

export const TotalCount = ({
  product,
  className,
}: Props): React.JSX.Element => {
  const [products, _] = useAtom(getAllProductsAtom);
  const [, changeCount] = useAtom(changeProductCountAtom);

  const count = useMemo(() => {
    return (
      products.find(p => p.productName === product.productName)?.count ?? 0
    );
  }, [products, product.productName]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      changeCount({ product, countValue: Number(value) });
    },
    [changeCount, product]
  );

  return (
    <input
      className={cn(styles.container, {
        [styles.disabled]: count !== undefined && count <= 0,
        [styles.enabled]: count > 0,
        [styles?.[className ?? ""]]: className !== undefined,
      })}
      value={count}
      onChange={handleChange}
      suppressHydrationWarning
    />
  );
};
