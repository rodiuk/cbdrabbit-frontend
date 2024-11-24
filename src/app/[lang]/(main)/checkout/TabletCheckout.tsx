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

import cn from "clsx";
import styles from "./page.module.css";

import np from "/public/img/np.svg";
import money from "/public/img/money.svg";
import { IValidateData } from "./CheckoutWrapper";

const ProductsCheckout = dynamic(() => import("./ProductsCheckout"), {
  ssr: false,
});
const CheckoutRes = dynamic(
  () => import("@/components/Checkout/CheckoutRes/CheckoutRes"),
  { ssr: false }
);

export interface TabletCheckoutProps {
  dict: any;
  city: string;
  postPoint: string;
  deliveryId: string;
  userInfo: IUserCheckoutForm;
  setCity: (city: string) => void;
  setPostPoint: (postPoint: string) => void;
  setDeliveryId: (deliveryId: string) => void;
  setFinalPrice: (finalPrice: number) => void;
  handleCheckout: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserCheckoutForm>>;
  hasError: boolean;
  currency: string;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setPromocode: React.Dispatch<React.SetStateAction<Promocode | null>>;
  promocode: Promocode | null;
  isLoading?: boolean;
  validateData?: IValidateData[];
  signUpUser: boolean;
  setSignUpUser: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthorized: boolean;
}

const TabletCheckout = (props: TabletCheckoutProps): React.JSX.Element => {
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
    userInfo,
    comment,
    setComment,
    setPromocode,
    promocode,
    isLoading,
    validateData,
    signUpUser,
    setSignUpUser,
    isAuthorized,
  } = props;

  return (
    <section className={styles.tablet}>
      <div className={styles.left}>
        <div className={styles.checkoutBlock}>
          <h1 className={styles.checkoutBlock_h2}>
            {dict.checkout.contactTitle}
          </h1>
          <UserCheckoutForm
            setUserInfo={setUserInfo}
            dict={dict}
            userInfo={userInfo}
            validateData={validateData}
            signUpUser={signUpUser}
            setSignUpUser={setSignUpUser}
            isAuthorized={isAuthorized}
          />
        </div>
        <div className={styles.checkoutBlock}>
          <h2
            className={cn(styles.checkoutBlock_h2, styles.checkoutBlock_h2mb)}
          >
            {dict.checkout.deliveryTitle}
          </h2>
          <div className={styles.checkoutBlock_np}>
            <Image src={np.src} alt="np" width={38} height={38} />
            <div className={styles.checkoutBlock_ttl}>
              {dict.checkout.npDelivery}
            </div>
            <div className={styles.checkoutBlock_price}>
              {dict.checkout.npCostLabel}
            </div>
          </div>

          <NovaPost
            city={city}
            postPoint={postPoint}
            deliveryId={deliveryId}
            setCity={setCity}
            setPostPoint={setPostPoint}
            setDeliveryId={setDeliveryId}
            validateData={validateData}
          />
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlock_h2}>
            {dict.checkout.commentTitle}
          </div>
          <Textarea
            placeholder={dict.checkout.commentLabel}
            value={comment}
            setValue={setComment}
          />
        </div>

        <div className={styles.checkoutBlock}>
          <h3 className={styles.checkoutBlock_h2}>{dict.checkout.payTitle}</h3>
          <div className={styles.checkoutBlock_img}>
            <Image src={money.src} alt="money" width={112} height={32} />
          </div>
          <div className={styles.checkoutBlock_list}>
            <p>{dict.checkout.payLabelFirst}</p>
            <p>{dict.checkout.payLabelSecond}</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.checkoutBlock}>
          <h3 className={styles.checkoutBlock_h2}>
            {dict.checkout.orderTitle}
          </h3>
          <ProductsCheckout homeDict={dict.home} />
        </div>

        <CheckoutRes
          currency={currency}
          dict={dict.checkout}
          setFinalPrice={setFinalPrice}
          handleCheckout={handleCheckout}
          hasError={hasError}
          isLoading={isLoading}
          setPromocode={setPromocode}
          promocode={promocode}
        />
      </div>
    </section>
  );
};

export default TabletCheckout;
