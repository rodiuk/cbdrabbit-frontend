"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "clsx";
import s from "./page.module.css";

import useMedia from "@/hooks/useMedia";
import ProfileTablet from "./ProfileTablet";
import ProfileNoTablet from "./ProfileNoTablet";
import LayPopupEmail from "@/components/LaysPopups/LayPopupEmail/LayPopupEmail";
import LayPopupPassword from "@/components/LaysPopups/LayPopupPassword/LayPopupPassword";
import LayPopupDelivery from "@/components/LaysPopups/LayPopupDelivery/LayPopupDelivery";
import LayPopupDeleteAkk from "@/components/LaysPopups/LayPopupDeleteAkk/LayPopupDeleteAkk";

export default function Profile() {
  const [isDetailes, setIsDetailes] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [actualLay, setActualLay] = React.useState("");

  const bottomBlock = (info: string) => {
    setActualLay(info);
    setIsOpen(!isOpen);
    console.log(info);
  };

  const isTablet = useMedia(993);

  return (
    <main className={cn("container", s.wrapper)}>
      {isTablet ? (
        <ProfileTablet bottomBlock={bottomBlock} />
      ) : (
        <ProfileNoTablet bottomBlock={bottomBlock} />
      )}
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
          { actualLay === "email" && <LayPopupEmail bottomBlock={bottomBlock} />}
          { actualLay === "password" && <LayPopupPassword bottomBlock={bottomBlock} />}
          { actualLay === "delivery" && <LayPopupDelivery bottomBlock={bottomBlock} />}
          { actualLay === "delete" && <LayPopupDeleteAkk bottomBlock={bottomBlock} />}
        </motion.div>
		  ) : null}
		  </AnimatePresence>
    </main>
  );
}
