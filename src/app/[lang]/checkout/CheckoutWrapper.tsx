"use client";

import React from "react";
import TabletCheckout from "./TabletCheckout";
import MobileCheckout from "./MobileCheckout";
import { npDeliveryType } from "@/components/NovaPoshta/npDelivery";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { useSession } from "next-auth/react";
import { ICheckoutDict } from "@/interfaces/i18n.interface";
import { getUserInfo } from "@/libs/api/user.api";
import { createOrder } from "@/libs/api/order.api";
import { IOrderCreate } from "@/interfaces/order.interface";
import { useAtom } from "jotai";
import { cartAtom, initialCartState } from "@/libs/store/atoms";
import { formatItemsForOrder } from "@/utils/formatItemsForOrder";

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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const delivery = npDeliveryType.filter(d => d.id === deliveryId)[0]?.text;
  const [cart, setCart] = useAtom(cartAtom);

  React.useEffect(() => {
    (async function fetchUser() {
      try {
        if (!data?.user?.id) return;
        const res = await getUserInfo(data.user.id);
        setUserInfo({
          firstName: res?.firstName ?? "",
          lastName: res?.lastName ?? "",
          phone: res?.address?.phoneNumber ?? "",
        });
        setCity(res?.address?.city ?? "");
        setPostPoint(res?.address?.npDepartment ?? "");
        setDeliveryId(res?.address?.npDeliveryType ?? "");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data?.user?.id]);

  const handleCheckout = async () => {
    if (!data?.user?.id) return;

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

    try {
      setIsLoading(true);

      const payload: IOrderCreate = {
        userId: data?.user?.id,
        totalSum: finalPrice,
        itemPrice: finalPrice / cart.totalCount,
        items: formatItemsForOrder(cart?.products),
        address: {
          city,
          npDepartment: postPoint,
          npDeliveryType: delivery,
          phoneNumber: userInfo?.phone,
        },
      };

      const res = await createOrder(payload);
      setCart(initialCartState);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        userInfo={userInfo}
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
