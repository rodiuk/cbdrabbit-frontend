"use client";

import React from "react";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import { Promocode } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cartAtom } from "@/libs/store/atoms";
import TabletCheckout from "./TabletCheckout";
import MobileCheckout from "./MobileCheckout";
import { constants } from "@/configs/constants";
import { createOrder } from "@/libs/api/order.api";
import useLocalStorage from "@/hooks/useLocaleStorage";
import { createOrderEmail } from "@/libs/api/emails.api";
import { IOrderCreate } from "@/interfaces/order.interface";
import { createUrlForCheckout } from "@/libs/api/checkout.api";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { formatItemsForOrder } from "@/utils/formatItemsForOrder";
import { npDeliveryType } from "@/components/NovaPoshta/npDelivery";
import { Session } from "next-auth";

interface Props {
  dict: any;
  currency: string;
  userData: any;
  user: Session["user"] | null;
  lang?: string;
}

const userInitial = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

export interface IValidateData {
  name: string;
  value: boolean;
}

export const CheckoutWrapper = ({
  dict,
  userData,
  currency,
  lang,
  user,
}: Props): React.JSX.Element => {
  const router = useRouter();
  const [city, setCity] = React.useState<string>("");
  const [postPoint, setPostPoint] = React.useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = React.useState<string>("");
  const [deliveryId, setDeliveryId] = React.useState<string>("");
  const [userInfo, setUserInfo] =
    React.useState<IUserCheckoutForm>(userInitial);
  const [finalPrice, setFinalPrice] = React.useState<number>(0);
  const [isEmptyFields, setIsEmptyFields] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [promocode, setPromocode] = React.useState<Promocode | null>(null);
  const [signUpUser, setSignUpUser] = React.useState<boolean>(true);
  const [validateData, setValidateData] = React.useState<IValidateData[]>([
    { name: "firstName", value: false },
    { name: "lastName", value: false },
    { name: "phone", value: false },
    { name: "email", value: false },
    { name: "Населений пункт", value: false },
    { name: "Відділення", value: false },
  ]);

  const [utmLabels] = useLocalStorage(constants.UTM_LABELS, "");

  // const delivery = npDeliveryType.filter(d => d.id === deliveryId)[0]?.text;
  const [cart] = useAtom(cartAtom);

  React.useEffect(() => {
    if (!userData?.id) return;

    const deliveryType =
      userData?.address?.npDeliveryType?.length === 1
        ? npDeliveryType.filter(
            d => d.id === userData.address?.npDeliveryType
          )[0]?.text
        : userData?.address?.npDeliveryType;

    setUserInfo({
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      phone: userData?.address?.phoneNumber ?? "",
      email: userData?.email ?? "",
    });
    setCity(userData?.address?.city ?? "");
    setPostPoint(userData?.address?.npDepartment ?? "");

    setDeliveryId(deliveryType || "");
  }, [userData]);

  const validateInputs = () => {
    setValidateData([
      { name: "firstName", value: false },
      { name: "lastName", value: false },
      { name: "phone", value: false },
      { name: "email", value: false },
      { name: "Населений пункт", value: false },
      { name: "Відділення", value: false },
      { name: "Адреса", value: false },
    ]);
    if (!userInfo.firstName) {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "firstName" ? { ...item, value: true } : item
        )
      );
    }
    if (!userInfo.lastName) {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "lastName" ? { ...item, value: true } : item
        )
      );
    }
    if (!userInfo.phone) {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "phone" ? { ...item, value: true } : item
        )
      );
    }
    if (!userInfo.email) {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "email" ? { ...item, value: true } : item
        )
      );
    }
    if (!city) {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "Населений пункт" ? { ...item, value: true } : item
        )
      );
    }
    if (!postPoint && deliveryId !== "3") {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "Відділення" ? { ...item, value: true } : item
        )
      );
    } else if (!deliveryAddress && deliveryId === "3") {
      setValidateData(prevState =>
        prevState.map(item =>
          item.name === "Адреса" ? { ...item, value: true } : item
        )
      );
    }
  };

  const handleCheckout = async () => {
    validateInputs();
    if (
      Object.values(validateData)?.some(x => x.value === true) ||
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
        userId: user?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        comment,
        totalSum: totalCalcSum,
        itemPrice: totalCalcSum / cart.totalCount,
        items: formatItemsForOrder(cart?.products),
        address: {
          city,
          npDepartment: postPoint || deliveryAddress,
          npDeliveryType: deliveryId,
          phoneNumber: userInfo?.phone,
        },
        acceptedSignUp: signUpUser,
        ...utmLabels,
        ...(!!promocode?.code && { promocodeId: promocode?.id }),
      };

      const res = await createUrlForCheckout(
        totalCalcSum,
        cart?.products?.filter(p => p.count > 0),
        totalCalcSum / cart.totalCount
      );

      if (!res?.pageUrl || !res?.invoiceId) return;

      const resOrder = await createOrder(payload, res?.invoiceId, lang);

      // if ("user" in resOrder && !data?.user?.id && signUpUser) {
      //   setCart(prev => ({ ...prev, fromCheckout: true }));
      // }

      if (resOrder?.["user"] && resOrder?.["user"]?.["isVerified"]) {
        await signIn("autoSignIn", {
          redirect: false,
          userId: resOrder?.user?.id,
        });
      }

      await createOrderEmail(
        resOrder?.user?.id,
        payload,
        cart.products,
        resOrder?.id,
        lang
      );

      router.replace(res.pageUrl);
    } catch (error) {
      console.log(error);
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
        setPromocode={setPromocode}
        promocode={promocode}
        validateData={validateData}
        signUpUser={signUpUser}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        setSignUpUser={setSignUpUser}
        userData={userData}
        isAuthorized={!!userData?.id}
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
        setDeliveryAddress={setDeliveryAddress}
        deliveryAddress={deliveryAddress}
        setPromocode={setPromocode}
        promocode={promocode}
        validateData={validateData}
        userInfo={userInfo}
        userData={userData}
        signUpUser={signUpUser}
        setSignUpUser={setSignUpUser}
        isAuthorized={!!userData?.id}
      />
    </>
  );
};
