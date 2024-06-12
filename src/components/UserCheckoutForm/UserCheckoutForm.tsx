import React from "react";
import Input from "../Ui/Input/Input";
import { IUserCheckoutForm } from "@/interfaces/user.interface";
import { ICheckoutDict } from "@/interfaces/i18n.interface";

import s from "./UserCheckoutForm.module.css";

interface Props {
  dict: ICheckoutDict;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserCheckoutForm>>;
  userInfo?: IUserCheckoutForm;
	isPopup?: boolean;
	validateData?: any
}

const UserCheckoutForm = ({
  setUserInfo,
  dict,
  userInfo,
	isPopup,
	validateData
}: Props): React.JSX.Element => {
  const handleInputChange = (key: string, field: string): void => {
    setUserInfo((prev: IUserCheckoutForm) => ({ ...prev, [key]: field }));
	};
	
	console.log(validateData)

  return (
	  <div className={s.labels}>
		  <div className={s.wrap_row}>
        <Input
          type="text"
          name="lastName"
          value={userInfo?.lastName}
          text={dict.userLabelLastName}
          required={true}
          placeholder={dict.userLabelPlaceholderLastName}
				  onInputChange={value => handleInputChange("lastName", value)}
				  validateData={validateData}
        />
        <Input
          type="text"
          name="firstName"
          value={userInfo?.firstName}
          text={dict.userLabelFirstName}
          required={true}
          placeholder={dict.userLabelPlaceholderFirstName}
				  onInputChange={value => handleInputChange("firstName", value)}
				  validateData={validateData}
        />
      </div>
      <Input
        type="text"
        name="phone"
        text={dict.userLabelPhone ?? ""}
        required={true}
        value={userInfo?.phone}
        placeholder="+380 (__)___-__-__"
			  onInputChange={value => handleInputChange("phone", value)}
			  validateData={validateData}
      />
      {!isPopup && (
        <Input
          type="email"
          name="email"
          required
          placeholder={dict?.userLabelEmail}
          text={dict?.userLabelEmail}
          value={userInfo?.email}
				  onInputChange={value => handleInputChange("email", value)}
				  validateData={validateData}
        />
      )}
      
    </div>
  );
};

export default UserCheckoutForm;
