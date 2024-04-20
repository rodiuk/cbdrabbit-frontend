"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NovaPost from "@/components/NovaPoshta/NovaPoshta";
import UserCheckoutForm from "@/components/UserCheckoutForm/UserCheckoutForm";
import { IUserCheckoutForm } from "@/interfaces/user.interface";

import cn from "clsx";
import styles from "./page.module.css";

import np from "/public/img/np.svg";
import money from "/public/img/money.svg";

const ProductsCheckout = dynamic(() => import("./ProductsCheckout"), {
  ssr: false,
});
const CheckoutRes = dynamic(
  () => import("@/components/Checkout/CheckoutRes/CheckoutRes"),
  { ssr: false }
);

interface Props {
  dict: ICheckoutDict;
  city: string;
  postPoint: string;
  deliveryId: string;
  setCity: (city: string) => void;
  setPostPoint: (postPoint: string) => void;
  setDeliveryId: (deliveryId: string) => void;
  setFinalPrice: (finalPrice: number) => void;
  handleCheckout: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserCheckoutForm>>;
  hasError: boolean;
  currency: string;
}

const TabletCheckout = (props: Props): React.JSX.Element => {
  const {
    dict,
    city,
    postPoint,
    deliveryId,
    setCity,
    setPostPoint,
    setDeliveryId,
    setFinalPrice,
    handleCheckout,
    setUserInfo,
    hasError,
    currency,
  } = props;

  return (
    <section className={styles.tablet}>
      <div className={styles.left}>
        <div className={styles.checkoutBlock}>
          <h1 className={styles.checkoutBlock_h2}>{dict.contactTitle}</h1>
          <UserCheckoutForm setUserInfo={setUserInfo} dict={dict} />
        </div>
        <div className={styles.checkoutBlock}>
          <h2
            className={cn(styles.checkoutBlock_h2, styles.checkoutBlock_h2mb)}
          >
            {dict.deliveryTitle}
          </h2>
          <div className={styles.checkoutBlock_np}>
            <Image src={np.src} alt="np" width={38} height={38} />
            <div className={styles.checkoutBlock_ttl}>{dict.npDelivery}</div>
            <div className={styles.checkoutBlock_price}>{dict.npCostLabel}</div>
          </div>
          <NovaPost
            city={city}
            postPoint={postPoint}
            deliveryId={deliveryId}
            setCity={setCity}
            setPostPoint={setPostPoint}
            setDeliveryId={setDeliveryId}
          />
        </div>

        <div className={styles.checkoutBlock}>
          <h3 className={styles.checkoutBlock_h2}>{dict.payTitle}</h3>
          <div className={styles.checkoutBlock_img}>
            <Image src={money.src} alt="money" width={112} height={32} />
          </div>
          <div className={styles.checkoutBlock_list}>
            <p>{dict.payLabelFirst}</p>
            <p>{dict.payLabelSecond}</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.checkoutBlock}>
          <h3 className={styles.checkoutBlock_h2}>{dict.orderTitle}</h3>
          <ProductsCheckout />
        </div>

        <CheckoutRes
          currency={currency}
          dict={dict}
          setFinalPrice={setFinalPrice}
          handleCheckout={handleCheckout}
          hasError={hasError}
        />
      </div>
    </section>
  );
};

export default TabletCheckout;
