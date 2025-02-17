"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NovaPost from "@/components/NovaPoshta/NovaPoshta";
import UserCheckoutForm from "@/components/UserCheckoutForm/UserCheckoutForm";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import Textarea from "@/components/Ui/Textarea/Textarea";
import { Promocode } from "@prisma/client";

import styles from "./page.module.css";

import np from "/public/img/np.svg";
import money from "/public/img/money.svg";
import { GreetingBlock } from "./GreetingBlock";

const ProductsCheckout = dynamic(() => import("./ProductsCheckout"), {
  ssr: false,
});
const CheckoutRes = dynamic(
  () => import("@/components/Checkout/CheckoutRes/CheckoutRes"),
  { ssr: false }
);

interface Props {
  dict: any;
  city: string;
  postPoint: string;
  deliveryId: string;
  currency: string;
  setCity: (city: string) => void;
  setPostPoint: (postPoint: string) => void;
  setDeliveryId: (deliveryId: string) => void;
  setFinalPrice: (finalPrice: number) => void;
  deliveryAddress: string;
  setDeliveryAddress: (deliveryAddress: string) => void;
  handleCheckout: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserCheckoutForm>>;
  hasError: boolean;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setPromocode: React.Dispatch<React.SetStateAction<Promocode | null>>;
  promocode: Promocode | null;
  isLoading?: boolean;
  validateData?: any;
  userInfo: IUserCheckoutForm;
  signUpUser: boolean;
  setSignUpUser: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthorized: boolean;
  userData: any;
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
    deliveryAddress,
    setDeliveryAddress,
    hasError,
    currency,
    comment,
    setComment,
    isLoading,
    setPromocode,
    promocode,
    validateData,
    userInfo,
    signUpUser,
    setSignUpUser,
    isAuthorized,
    userData,
  } = props;

  return (
    <section className={styles.mobile}>
      {isAuthorized && <GreetingBlock userInfo={userInfo} />}

      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>
          {dict.checkout.orderTitle}
        </div>
        <ProductsCheckout homeDict={dict.home} />
      </div>
      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>
          {dict.checkout.contactTitle}
        </div>
        <UserCheckoutForm
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          dict={dict}
          validateData={validateData}
          isPopup={false}
          signUpUser={signUpUser}
          setSignUpUser={setSignUpUser}
          isAuthorized={isAuthorized}
        />
      </div>
      <div className={styles.checkoutBlock}>
        <div
          className={`${styles.checkoutBlock_h2} ${styles.checkoutBlock_h2mb}`}
        >
          {dict.checkout.deliveryTitle}
        </div>
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
          setCity={setCity}
          postPoint={postPoint}
          setPostPoint={setPostPoint}
          deliveryId={deliveryId}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          setDeliveryId={setDeliveryId}
          validateData={validateData}
        />
      </div>

      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>{dict.checkout.payTitle}</div>
        <div className={styles.checkoutBlock_img}>
          <Image src={money.src} alt="money" width={112} height={32} />
        </div>
        <div className={styles.checkoutBlock_list}>
          <p>{dict.checkout.payLabelFirst}</p>
          <p>{dict.checkout.payLabelSecond}</p>
        </div>
      </div>

      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutBlock_h2}>Коментар</div>
        <Textarea
          placeholder={dict.checkout.commentLabel}
          value={comment}
          setValue={setComment}
        />
      </div>

      <CheckoutRes
        userData={userData}
        dict={dict.checkout}
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
