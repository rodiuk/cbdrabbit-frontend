import React from "react";
import Input from "../Ui/Input/Input";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { AuthInCheckout } from "../Checkout/AuthInCheckout/AuthInCheckout";
import { TabletCheckoutProps } from "@/app/[lang]/(main)/checkout/TabletCheckout";

import cn from "clsx";
import s from "./UserCheckoutForm.module.css";

interface Props
  extends Pick<
    TabletCheckoutProps,
    | "setUserInfo"
    | "validateData"
    | "dict"
    | "userInfo"
    | "setUserInfo"
    | "signUpUser"
    | "setSignUpUser"
    | "isAuthorized"
  > {
  isPopup?: boolean;
}

const UserCheckoutForm = ({
  setUserInfo,
  dict,
  userInfo,
  isPopup,
  validateData,
  signUpUser,
  setSignUpUser,
  isAuthorized,
}: Props): React.JSX.Element => {
  const handleInputChange = (key: string, field: string): void => {
    setUserInfo((prev: IUserCheckoutForm) => ({ ...prev, [key]: field }));
  };

  return (
    <div className={s.labels}>
      {!isAuthorized && <AuthInCheckout lang={dict.lang} dict={dict} />}

      <div className={s.wrap_row}>
        <Input
          type="text"
          name="lastName"
          value={userInfo?.lastName}
          text={dict.checkout.userLabelLastName}
          required={true}
          placeholder={dict.checkout.userLabelPlaceholderLastName}
          onInputChange={value => handleInputChange("lastName", value)}
          validateData={validateData}
        />
        <Input
          type="text"
          name="firstName"
          value={userInfo?.firstName}
          text={dict.checkout.userLabelFirstName}
          required={true}
          placeholder={dict.checkout.userLabelPlaceholderFirstName}
          onInputChange={value => handleInputChange("firstName", value)}
          validateData={validateData}
        />
      </div>
      <Input
        type="text"
        name="phone"
        text={dict.checkout.userLabelPhone ?? ""}
        required={true}
        value={userInfo?.phone}
        placeholder="+380 (__)___-__-__"
        onInputChange={value => handleInputChange("phone", value)}
        validateData={validateData}
        textOnTheRight="Потрібно для доставки"
      />
      {!isPopup && (
        <Input
          type="email"
          name="email"
          required
          placeholder={dict.checkout?.userLabelEmail}
          text={dict?.userLabelEmail}
          value={userInfo?.email}
          onInputChange={value => handleInputChange("email", value)}
          validateData={validateData}
          textOnTheRight="Сюди ми відправимо чек"
        />
      )}

      {!isAuthorized && (
        <label className={cn(s.checkbox)}>
          <input
            type="checkbox"
            className={s.customCheckbox}
            checked={signUpUser}
            onChange={() => setSignUpUser(!signUpUser)}
          />
          <span className="label_ttl">
            Створити акаунт та накопичувати персональну скидку
          </span>
        </label>
      )}
    </div>
  );
};

export default UserCheckoutForm;
