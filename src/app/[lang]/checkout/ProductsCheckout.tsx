"use client";

import React from "react";
import Image from "next/image";
import { useAtom } from "jotai/react";
import { cartAtom } from "@/libs/store/atoms";

import styles from "./page.module.css";
import ActionBar from "@/components/ProductCard/ActionBar/ActionBar";

const ProductsCheckout = (): React.JSX.Element => {
  const [cart] = useAtom(cartAtom);
  const rendererProducts = cart?.products?.filter(product => product.count > 0);
console.log(rendererProducts)
  return (
    <ul className={styles.productCheckout}>
      {rendererProducts?.map(product => (
        <li className={styles.list} key={product.id}>
          <div className={styles.productCheckout_img}>
            {!!product?.images?.length && (
              <Image
                src={product?.images[0]?.url}
                alt="pic"
                width={64}
                height={64}
              />
            )}
          </div> 
          <div className={styles.productCheckout_info}>
            <div className={styles.productCheckout_ttl}>
              <h2>{product.productName}</h2>
            </div>
            <div className={styles.productCheckout_count}>
              <span className={styles.grey}>{product.price}</span>
              {cart?.newPrice} ₴<span className={styles.elem}>/шт</span>
				  </div>
				  <div className="actions">
				  <ActionBar product={product} />
				  </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductsCheckout;
