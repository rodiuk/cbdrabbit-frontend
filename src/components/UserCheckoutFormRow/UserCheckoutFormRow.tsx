import React from "react";
import Input from "../Ui/Input/Input";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { ICheckoutDict } from "@/interfaces/i18n.interface";

import s from "./UserCheckoutFormRow.module.css";

interface Props {
  dict: ICheckoutDict;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserCheckoutForm>>;
  userInfo?: IUserCheckoutForm;
}

const UserCheckoutFormRow = ({
  setUserInfo,
  dict,
  userInfo,
}: Props): React.JSX.Element => {
  const handleInputChange = (key: string, field: string): void => {
    setUserInfo((prev: IUserCheckoutForm) => ({ ...prev, [key]: field }));
  };

  return (
	  <div className={s.labels}>
      <Input
        type="text"
        name="phone"
        text={dict.userLabelPhone ?? ""}
        required={true}
        value={userInfo?.phone}
        placeholder="+380 (__)___-__-__"
        onInputChange={value => handleInputChange("phone", value)}
      />
      <Input
          type="text"
          name="lastName"
          value={userInfo?.lastName}
          text={dict.userLabelLastName}
          required={true}
          placeholder={dict.userLabelPlaceholderLastName}
          onInputChange={value => handleInputChange("lastName", value)}
        />
        <Input
          type="text"
          name="firstName"
          value={userInfo?.firstName}
          text={dict.userLabelFirstName}
          required={true}
          placeholder={dict.userLabelPlaceholderFirstName}
          onInputChange={value => handleInputChange("firstName", value)}
        />
      
    </div>
  );
};

export default UserCheckoutFormRow;
