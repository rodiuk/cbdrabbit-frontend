"use client";

import React from "react";
import TabletCheckout from "./TabletCheckout";
import MobileCheckout from "./MobileCheckout";
import { npDeliveryType } from "@/components/NovaPoshta/npDelivery";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { signIn, useSession } from "next-auth/react";
import { ICheckoutDict } from "@/interfaces/i18n.interface";
import { getUserInfo } from "@/libs/api/user.api";
import { createOrder } from "@/libs/api/order.api";
import { IOrderCreate } from "@/interfaces/order.interface";
import { useAtom } from "jotai";
import { cartAtom } from "@/libs/store/atoms";
import { formatItemsForOrder } from "@/utils/formatItemsForOrder";
import { createUrlForCheckout } from "@/libs/api/checkout.api";

interface Props {
  dict: ICheckoutDict;
  currency: string;
}

const initial = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
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
  const [comment, setComment] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const delivery = npDeliveryType.filter(d => d.id === deliveryId)[0]?.text;
  const [cart] = useAtom(cartAtom);

  React.useEffect(() => {
    if (!data?.user?.id) return;
    (async function fetchUser() {
      try {
        const res = await getUserInfo(data.user.id);

        setUserInfo({
          firstName: res?.firstName ?? "",
          lastName: res?.lastName ?? "",
          phone: res?.address?.phoneNumber ?? "",
          email: res?.email ?? "",
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
    if (
      !city ||
      !postPoint ||
      !deliveryId ||
      !userInfo?.phone?.length ||
      !userInfo?.firstName?.length ||
      !userInfo?.lastName?.length ||
      !userInfo?.email?.length
    )
      return setIsEmptyFields(true);

    try {
      setIsLoading(true);

      const payload: IOrderCreate = {
        userId: data?.user?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        comment,
        totalSum: cart.totalAmount,
        itemPrice: cart.totalAmount / cart.totalCount,
        items: formatItemsForOrder(cart?.products),
        address: {
          city,
          npDepartment: postPoint,
          npDeliveryType: delivery,
          phoneNumber: userInfo?.phone,
        },
      };

      const res = await createUrlForCheckout(
        cart.totalAmount,
        cart?.products?.filter(p => p.count > 0),
        finalPrice / cart.totalCount
      );

      if (!res?.pageUrl || !res?.invoiceId) return;

      const resOrder = await createOrder(payload, res?.invoiceId);

      if ("auth" in resOrder) {
        await signIn("credentials", {
          redirect: false,
          email: resOrder?.auth?.email,
          password: resOrder?.auth?.password,
        });
      }

      window.open(res.pageUrl, "_blank");
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
        isLoading={isLoading}
        comment={comment}
        setComment={setComment}
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
        isLoading={isLoading}
        comment={comment}
        setComment={setComment}
      />
    </>
  );
};
