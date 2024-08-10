"use client";

import React from "react";
import { useAtom } from "jotai";
import { getAllProductsAtom, changeProductCountAtom } from "@/libs/store/atoms";
import { IProductRes } from "@/interfaces/product.interface";

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

  const count =
    products.find(p => p.productName === product.productName)?.count ?? 0;
  const [localCount, setLocalCount] = React.useState<string>(count.toString());

  React.useEffect(() => {
    setLocalCount(count.toString());
  }, [count]);

  // React.useEffect(() => {
  //   changeCount({ product, countValue: Number(localCount) });
  // }, [localCount]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setLocalCount(value);
      } else {
        setLocalCount("0");
      }
      changeCount({ product, countValue: Number(value) });
    },
    []
  );

  return (
    <input
      className={cn(styles.container, {
        [styles.disabled]: count <= 0,
        [styles[className ?? ""]]: className,
      })}
      value={localCount}
      onChange={handleChange}
      suppressHydrationWarning
    />
  );
};
