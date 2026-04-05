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
import LayPopupPassRecoverySuccess from "@/components/LaysPopups/LayPopupPassRecoverySuccess/LayPopupPassRecoverySuccess";
import LayPopupChangeEmailSuccess from "@/components/LaysPopups/LayPopupChangeEmailSuccess/LayPopupChangeEmailSuccess";
import LayPopupDeleteAkk from "@/components/LaysPopups/LayPopupDeleteAkk/LayPopupDeleteAkk";
import LayPopupDeleteDelivery from "@/components/LaysPopups/LayPopupDeleteDelivery/LayPopupDeleteDelivery";

import s from "./page.module.css";
import { Session } from "next-auth";

interface Props {
  isOpen: boolean;
  actualLay: string;
  handleInfo: (info: string) => void;
  recoveryDict: IRecoveryPasswordDict;
  profileDict: IProfileDict;
  checkoutDict: ICheckoutDict;
  user: IUserProfile | null;
  userSession: Session["user"] | null;
  lang: string;
  loadingLabel: string;
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
    lang,
    userSession,
    loadingLabel,
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
            <LayPopupEmail
              user={userSession}
              bottomBlock={handleInfo}
              dict={profileDict}
              lang={lang}
              loadingLabel={loadingLabel}
            />
          )}

          {actualLay === "password" && (
            <LayPopupPassword
              bottomBlock={handleInfo}
              dict={profileDict}
              user={user}
              loadingLabel={loadingLabel}
            />
          )}

          {actualLay === "recoveryAsk" && (
            <LayPopupPasswordRecovery
              dict={recoveryDict}
              email={user?.email ?? ""}
              bottomBlock={handleInfo}
              lang={lang}
              loadingLabel={loadingLabel}
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
              user={userSession}
              bottomBlock={handleInfo}
              profileDict={profileDict}
              checkoutDict={checkoutDict}
              loadingLabel={loadingLabel}
            />
          )}

          {actualLay === "deleteDelivery" && (
            <LayPopupDeleteDelivery
              user={userSession}
              bottomBlock={handleInfo}
              dict={profileDict}
              loadingLabel={loadingLabel}
            />
          )}

          {actualLay === "deleteAccount" && (
            <LayPopupDeleteAkk
              user={userSession}
              bottomBlock={handleInfo}
              dict={profileDict}
              loadingLabel={loadingLabel}
            />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
