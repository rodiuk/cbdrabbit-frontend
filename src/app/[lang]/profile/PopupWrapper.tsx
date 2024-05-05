"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import LayPopupEmail from "@/components/LaysPopups/LayPopupEmail/LayPopupEmail";
import LayPopupPassword from "@/components/LaysPopups/LayPopupPassword/LayPopupPassword";
import LayPopupDelivery from "@/components/LaysPopups/LayPopupDelivery/LayPopupDelivery";
import {
  ICheckoutDict,
  IProfileDict,
  IRecoveryPasswordDict,
} from "@/interfaces/i18n.interface";
import { IUserProfile } from "@/interfaces/user.interface";
import LayPopupPasswordRecovery from "@/components/LaysPopups/LayPopupPasswordRecovery/LayPopupPasswordRecovery";

import s from "./page.module.css";
import LayPopupPassRecoverySuccess from "@/components/LaysPopups/LayPopupPassRecoverySuccess/LayPopupPassRecoverySuccess";
import LayPopupChangeEmailSuccess from "@/components/LaysPopups/LayPopupChangeEmailSuccess/LayPopupChangeEmailSuccess";
import LayPopupDeleteAkk from "@/components/LaysPopups/LayPopupDeleteAkk/LayPopupDeleteAkk";
import LayPopupDeleteDelivery from "@/components/LaysPopups/LayPopupDeleteDelivery/LayPopupDeleteDelivery";

interface Props {
  isOpen: boolean;
  actualLay: string;
  handleInfo: (info: string) => void;
  recoveryDict: IRecoveryPasswordDict;
  profileDict: IProfileDict;
  checkoutDict: ICheckoutDict;
  user: IUserProfile | null;
}

export const PopupWrapper = (props: Props): React.JSX.Element => {
  const {
    isOpen,
    actualLay,
    handleInfo,
    profileDict,
    checkoutDict,
    user,
    recoveryDict,
  } = props;

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          className={s.overl}
          style={{ height: "100vh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {actualLay === "email" && (
            <LayPopupEmail bottomBlock={handleInfo} dict={profileDict} />
          )}

          {actualLay === "password" && (
            <LayPopupPassword
              bottomBlock={handleInfo}
              dict={profileDict}
              user={user}
            />
          )}

          {actualLay === "recoveryAsk" && (
            <LayPopupPasswordRecovery
              dict={recoveryDict}
              email={user?.email ?? ""}
              bottomBlock={handleInfo}
            />
          )}

          {actualLay === "successResetPassword" && (
            <LayPopupPassRecoverySuccess
              bottomBlock={handleInfo}
              dict={recoveryDict}
              email={user?.email ?? ""}
            />
          )}

          {actualLay === "successChangeEmail" && (
            <LayPopupChangeEmailSuccess
              dict={recoveryDict}
              bottomBlock={handleInfo}
            />
          )}

          {actualLay === "delivery" && (
            <LayPopupDelivery
              bottomBlock={handleInfo}
              profileDict={profileDict}
              checkoutDict={checkoutDict}
            />
          )}

          {actualLay === "deleteDelivery" && (
            <LayPopupDeleteDelivery
              bottomBlock={handleInfo}
              dict={profileDict}
            />
          )}

          {actualLay === "deleteAccount" && (
            <LayPopupDeleteAkk bottomBlock={handleInfo} dict={profileDict} />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
