"use client";

import React from "react";
import TabletCheckout from "./TabletCheckout";
import MobileCheckout from "./MobileCheckout";
import { npDeliveryType } from "@/components/NovaPoshta/npDelivery";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { useSession } from "next-auth/react";

interface Props {
  dict: ICheckoutDict;
  currency: string;
}

const initial = {
  firstName: "",
  lastName: "",
  phone: "",
};

export const CheckoutWrapper = ({
  dict,
  currency,
}: Props): React.JSX.Element => {
  const { data } = useSession();
  const [city, setCity] = React.useState<string>("");
  const [postPoint, setPostPoint] = React.useState<string>("");
  const [deliveryId, setDeliveryId] = React.useState<string>("");
  const [userInfo, setUserInfo] = React.useState<IUserCheckoutForm>(initial);
  const [finalPrice, setFinalPrice] = React.useState<number>(0);
  const [isEmptyFields, setIsEmptyFields] = React.useState<boolean>(false);
  const delivery = npDeliveryType.filter(d => d.id === deliveryId)[0]?.text;

  console.log({ finalPrice, city, postPoint, delivery, userInfo, data });

  const handleCheckout = () => {
    if (
      !city ||
      !postPoint ||
      !deliveryId ||
      !userInfo?.phone?.length ||
      !userInfo?.firstName?.length ||
      !userInfo?.lastName?.length
    )
      setIsEmptyFields(true);

    if (isEmptyFields) setIsEmptyFields(false);

    
  };

  return (
    <>
      <TabletCheckout
        dict={dict}
        city={city}
        currency={currency}
        postPoint={postPoint}
        deliveryId={deliveryId}
        setCity={setCity}
        setPostPoint={setPostPoint}
        setDeliveryId={setDeliveryId}
        setFinalPrice={setFinalPrice}
        handleCheckout={handleCheckout}
        hasError={isEmptyFields}
        setUserInfo={setUserInfo}
      />
      <MobileCheckout
        dict={dict}
        currency={currency}
        city={city}
        postPoint={postPoint}
        deliveryId={deliveryId}
        setCity={setCity}
        setPostPoint={setPostPoint}
        setDeliveryId={setDeliveryId}
        setFinalPrice={setFinalPrice}
        handleCheckout={handleCheckout}
        hasError={isEmptyFields}
        setUserInfo={setUserInfo}
      />
    </>
  );
};
