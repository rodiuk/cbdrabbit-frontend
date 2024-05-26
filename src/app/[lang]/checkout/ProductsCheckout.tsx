"use client";

import React from "react";
import Image from "next/image";
import { useAtom } from "jotai/react";
import { cartAtom } from "@/libs/store/atoms";

import cn from "clsx";

import styles from "./page.module.css";
import ActionBar from "@/components/ProductCard/ActionBar/ActionBar";
import { PresentIcon } from "@/components/icons/PresentIcon";
import ListSales from "@/components/ListSales/ListSales";
import { Locale } from "../../../../i18n.config";

interface Props{
	lang:Locale
	}

const ProductsCheckout = ({lang}: Props): React.JSX.Element => {
	const [cart] = useAtom(cartAtom);
	
  let inStock = 1; // есть или нет в наявності
	let firstClient = 0; // клиент первый раз или нет. если первый, то конфета в подарунок
	const rendererProducts = cart?.products?.filter(product => product.count > 0);
	const [products, setProduct] = React.useState(rendererProducts)

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
              {inStock ? (
                <>
                  <div className={styles.productCheckout_count}>
                    <span className={styles.grey}>{product.price}</span>
                    {cart?.newPrice} ₴<span className={styles.elem}>/шт</span>
                  </div>
                  <div className={styles.checkout_actions}>
                    <ActionBar product={product} className="checkout_input" />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.noInstock}>Поки немає в наявності</div>
                </>
              )}
            </div>
          </li>
        ))}
		  </ul>
		  {!firstClient && (
			  <div className={styles.first_client}>
				  <div className={styles.img_client}>
					  <PresentIcon />
				  </div>
				  До першого замовлення цукерка Rabbit Classic у&nbsp;подарунок 
			  </div>
		  )}
		  {/* <ListSales lang={lang} /> */}
    </>
  );
};

export default ProductsCheckout;
