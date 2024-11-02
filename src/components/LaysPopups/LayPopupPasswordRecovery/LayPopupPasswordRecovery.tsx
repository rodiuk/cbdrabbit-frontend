"use client";

import React from "react";
import { resetPasswordService } from "@/libs/api/user.api";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";
import { LayPopupPasswordRecoveryContent } from "./LayPopupPasswordRecoveryContent";

import s from "./LayPopupPasswordRecovery.module.css";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IRecoveryPasswordDict;
  email: string;
  lang: string;
}

const LayPopupPasswordRecovery = (props: Props): React.JSX.Element => {
  const { bottomBlock, dict, email, lang } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  const handleSendRecoveryEmail = async () => {
    try {
      setIsLoading(true);
      const res = await resetPasswordService(email, lang);

      if ("id" in res) return bottomBlock("successResetPassword");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.overl} onClick={e => handleBackdropClick(e)}>
      <LayPopupPasswordRecoveryContent
        bottomBlock={bottomBlock}
        dict={dict}
        email={email}
        isLoading={isLoading}
        handleSendRecoveryEmail={handleSendRecoveryEmail}
      />
    </div>
  );
};

export default LayPopupPasswordRecovery;
