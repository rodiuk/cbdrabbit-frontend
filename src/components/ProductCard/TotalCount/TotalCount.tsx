"use client";

import React from "react";
import { useAtom } from "jotai";
import { getAllProductsAtom, changeProductCountAtom } from "@/libs/store/atoms";
import { IProductRes } from "@/interfaces/product.interface";

import cn from "clsx";
import styles from "./TotalCount.module.css";

interface Props {
  product: IProductRes;
}

export const TotalCount = ({ product }: Props): React.JSX.Element => {
  const [products, _] = useAtom(getAllProductsAtom);
  const [, changeCount] = useAtom(changeProductCountAtom);

  const count = products.find(p => p.id === product.id)?.count ?? 0;
  const [localCount, setLocalCount] = React.useState<string>(count.toString());

  React.useEffect(() => {
    setLocalCount(count.toString());
  }, [count]);

  React.useEffect(() => {
    changeCount({ product, countValue: Number(localCount) });
  }, [localCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLocalCount(value);
    } else {
      setLocalCount("0");
    }
  };

  return (
    <input
      className={cn(styles.container, {
        [styles.disabled]: count <= 0,
      })}
      value={localCount}
      onChange={handleChange}
      suppressHydrationWarning
    />
  );
};
