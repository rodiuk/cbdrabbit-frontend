"use client";

import React from "react";
import Image from "next/image";
import { useAtom } from "jotai/react";
import { cartAtom } from "@/libs/store/atoms";
import ListSales from "@/components/ListSales/ListSales";
import { PresentIcon } from "@/components/icons/PresentIcon";
import { IProductRes } from "@/interfaces/product.interface";
import ActionBar from "@/components/ProductCard/ActionBar/ActionBar";

import styles from "./page.module.css";
import { calculateGiftCandies } from "@/utils/calculateGiftCandies";

interface Props {
  homeDict: any;
}

const ProductsCheckout = ({ homeDict }: Props): React.JSX.Element => {
  const [cart] = useAtom(cartAtom);

  const rendererProducts = cart?.products?.filter(product => product.count > 0);
  const [products, setProduct] = React.useState(rendererProducts);

  React.useEffect(() => {
    setProduct(rendererProducts);
  }, []);

  return (
    <>
      <ul className={styles.productCheckout}>
        {products?.map(product => (
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
              {product.isStock ? (
                <>
                  <div className={styles.productCheckout_count}>
                    {/* <span className={styles.grey}>{product.price}</span> */}
                    {cart?.newPrice} ₴<span className={styles.elem}>/шт</span>
                  </div>
                  <div className={styles.checkout_actions}>
                    <ActionBar
                      product={product as IProductRes}
                      className="checkout_input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.noInstock}>
                    {homeDict?.product?.notAvailable}
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* {!hasOrders && isRendered && (
        <div className={styles.first_client}>
          <div className={styles.img_client}>
            <PresentIcon />
          </div>
          {homeDict?.product?.firstOrder}
        </div>
      )} */}

      {cart?.totalCount >= 7 && (
        <div className={styles.first_client}>
          <div className={styles.img_client}>
            <PresentIcon />
          </div>
          + {calculateGiftCandies(cart?.totalCount || 0)} Rabbit Classic
          у&nbsp;подарунок за кількість
        </div>
      )}

      {/* <ListSales home={homeDict} className={styles.checkoutList} /> */}
    </>
  );
};

export default ProductsCheckout;
