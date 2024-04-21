"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import LayPopupEmail from "@/components/LaysPopups/LayPopupEmail/LayPopupEmail";
import LayPopupPassword from "@/components/LaysPopups/LayPopupPassword/LayPopupPassword";
import LayPopupDelivery from "@/components/LaysPopups/LayPopupDelivery/LayPopupDelivery";
import { ICheckoutDict, IProfileDict } from "@/interfaces/i18n.interface";
import { IUserProfile } from "@/interfaces/user.interface";

import s from "./page.module.css";

interface Props {
  isOpen: boolean;
  actualLay: string;
  handleInfo: (info: string) => void;
  profileDict: IProfileDict;
  checkoutDict: ICheckoutDict;
  user: IUserProfile | null;
}

export const PopupWrapper = (props: Props): React.JSX.Element => {
  const { isOpen, actualLay, handleInfo, profileDict, checkoutDict, user } =
    props;

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
          {actualLay === "delivery" && (
            <LayPopupDelivery
              bottomBlock={handleInfo}
              profileDict={profileDict}
              checkoutDict={checkoutDict}
            />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
