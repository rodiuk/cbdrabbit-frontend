"use client";

import React from "react";
import { TotalCount } from "../TotalCount/TotalCount";
import { IProductRes } from "@/interfaces/product.interface";
import { DecrementCart } from "../ActionBtns/DecrementCart";
import { IncrementCart } from "../ActionBtns/IncrementCart";

import cn from "clsx";
import styles from "./ActionBar.module.css";

interface Props {
  product: IProductRes;
  className?: string | undefined;
}

const ActionBar = ({ product, className }: Props): React.JSX.Element => {
  return (
    <div
      className={cn(styles.container, {
        [styles[className ?? ""]]: className,
      })}
    >
      <DecrementCart product={product} />
      <TotalCount product={product} className={className} />
      <IncrementCart product={product} />
    </div>
  );
};

export default ActionBar;
