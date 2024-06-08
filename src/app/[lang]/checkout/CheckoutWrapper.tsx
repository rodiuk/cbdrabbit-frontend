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
import { createOrderEmail } from "@/libs/api/emails.api";
import useLocalStorage from "@/hooks/useLocaleStorage";
import { constants } from "@/configs/constants";
import { Promocode } from "@prisma/client";

interface Props {
  dict: ICheckoutDict;
  homeDict: any;
  currency: string;
  lang?: string;
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
  homeDict,
  lang,
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
  const [promocode, setPromocode] = React.useState<Promocode | null>(null);

  const [utmLabels] = useLocalStorage(constants.UTM_LABELS, "");

  // const delivery = npDeliveryType.filter(d => d.id === deliveryId)[0]?.text;
  const [cart, setCart] = useAtom(cartAtom);

  React.useEffect(() => {
    if (!data?.user?.id) return;
    (async function fetchUser() {
      try {
        const res = await getUserInfo(data.user.id);

        const deliveryType =
          res?.address?.npDeliveryType?.length === 1
            ? npDeliveryType.filter(
                d => d.id === res.address?.npDeliveryType
              )[0]?.text
            : res?.address?.npDeliveryType;

        setUserInfo({
          firstName: res?.firstName ?? "",
          lastName: res?.lastName ?? "",
          phone: res?.address?.phoneNumber ?? "",
          email: res?.email ?? "",
        });
        setCity(res?.address?.city ?? "");
        setPostPoint(res?.address?.npDepartment ?? "");

        setDeliveryId(deliveryType || "");
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

      const totalCalcSum = finalPrice > 0 ? finalPrice : cart.totalAmount;

      const payload: IOrderCreate = {
        userId: data?.user?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        comment,
        totalSum: totalCalcSum,
        itemPrice: totalCalcSum / cart.totalCount,
        items: formatItemsForOrder(cart?.products),
        address: {
          city,
          npDepartment: postPoint,
          npDeliveryType: deliveryId,
          phoneNumber: userInfo?.phone,
        },
        promocodeId: promocode?.id,
        ...utmLabels,
      };

      const res = await createUrlForCheckout(
        totalCalcSum,
        cart?.products?.filter(p => p.count > 0),
        totalCalcSum / cart.totalCount
      );

      if (!res?.pageUrl || !res?.invoiceId) return;

      const resOrder = await createOrder(payload, res?.invoiceId);

      if ("user" in resOrder && !data?.user?.id) {
        setCart(prev => ({ ...prev, fromCheckout: true }));
        await signIn("autoSignIn", {
          redirect: false,
          userId: resOrder.user.id,
        });
      }

      createOrderEmail(
        resOrder.user.id,
        payload,
        cart.products,
        cart.fromCheckout,
        lang
      );

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
        homeDict={homeDict}
        setPromocode={setPromocode}
        promocode={promocode}
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
        homeDict={homeDict}
        setPromocode={setPromocode}
        promocode={promocode}
      />
    </>
  );
};
