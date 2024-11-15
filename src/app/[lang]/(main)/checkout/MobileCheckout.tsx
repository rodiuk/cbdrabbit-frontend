"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NovaPost from "@/components/NovaPoshta/NovaPoshta";
import UserCheckoutForm from "@/components/UserCheckoutForm/UserCheckoutForm";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { ICheckoutDict } from "@/interfaces/i18n.interface";
import Textarea from "@/components/Ui/Textarea/Textarea";
import { Promocode } from "@prisma/client";

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
  currency: string;
  setCity: (city: string) => void;
  setPostPoint: (postPoint: string) => void;
  setDeliveryId: (deliveryId: string) => void;
  setFinalPrice: (finalPrice: number) => void;
  handleCheckout: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserCheckoutForm>>;
  hasError: boolean;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setPromocode: React.Dispatch<React.SetStateAction<Promocode | null>>;
  promocode: Promocode | null;
  homeDict: any;
  isLoading?: boolean;
  validateData?: any;
}

const MobileCheckout = (props: Props) => {
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
    comment,
    setComment,
    isLoading,
    homeDict,
    setPromocode,
    promocode,
    validateData,
  } = props;

  return (
    <section className={styles.mobile}>
      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>{dict.orderTitle}</div>

        <ProductsCheckout homeDict={homeDict} />
      </div>
      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>{dict.contactTitle}</div>
        <UserCheckoutForm setUserInfo={setUserInfo} dict={dict}  validateData={validateData} />
      </div>
      <div className={styles.checkoutBlock}>
        <div
          className={`${styles.checkoutBlock_h2} ${styles.checkoutBlock_h2mb}`}
        >
          {dict.deliveryTitle}
        </div>
        <div className={styles.checkoutBlock_np}>
          <Image src={np.src} alt="np" width={38} height={38} />
          <div className={styles.checkoutBlock_ttl}>{dict.npDelivery}</div>
          <div className={styles.checkoutBlock_price}>{dict.npCostLabel}</div>
        </div>

        <NovaPost
          city={city}
          setCity={setCity}
          postPoint={postPoint}
          setPostPoint={setPostPoint}
          deliveryId={deliveryId}
				  setDeliveryId={setDeliveryId}
				  validateData={validateData}
        />
      </div>

      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>{dict.payTitle}</div>
        <div className={styles.checkoutBlock_img}>
          <Image src={money.src} alt="money" width={112} height={32} />
        </div>
        <div className={styles.checkoutBlock_list}>
          <p>{dict.payLabelFirst}</p>
          <p>{dict.payLabelSecond}</p>
        </div>
      </div>

      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>Коментар</div>
        <Textarea
          placeholder={dict.commentLabel}
          value={comment}
          setValue={setComment}
        />
      </div>

      <CheckoutRes
        dict={dict}
        currency={currency}
        setFinalPrice={setFinalPrice}
        handleCheckout={handleCheckout}
        hasError={hasError}
        isLoading={isLoading}
        setPromocode={setPromocode}
        promocode={promocode}
      />
    </section>
  );
};

export default MobileCheckout;
