"use client";

import React from "react";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";
import { LayPopupPassRecoverySuccessContent } from "./LayPopupPassRecoverySuccessContent";

import s from "./LayPopupPassRecoverySuccess.module.css";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IRecoveryPasswordDict;
  email: string;
}

const LayPopupPassRecoverySuccess = (props: Props): React.JSX.Element => {
  const { bottomBlock, dict, email } = props;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  return (
    <div className={s.overl} onClick={e => handleBackdropClick(e)}>
      <LayPopupPassRecoverySuccessContent
        dict={dict}
        email={email}
        onHandleBack={() => bottomBlock("password")}
        onHandleClose={() => bottomBlock("")}
      />
    </div>
  );
};

export default LayPopupPassRecoverySuccess;
