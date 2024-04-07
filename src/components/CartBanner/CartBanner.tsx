"use client";

import React from "react";
import Link from "next/link";
import { useAtom, useStore } from "jotai";
import { getTotalPriceAtom } from "@/libs/store/atoms";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import styles from "./CartBanner.module.css";

interface Props {
  currency: string;
  checkoutLabel: string;
  buttonLabel: string;
  lang: string;
}

const CartBanner = (props: Props): React.JSX.Element | null => {
  const { currency, checkoutLabel, buttonLabel, lang } = props;
  const [total] = useAtom(getTotalPriceAtom, {
    store: useStore(),
  });

  return (
    <AnimatePresence mode="wait">
      {total > 0 ? (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.content}>
            <h3 className={styles.label}>{checkoutLabel}</h3>
            <p className={styles.amount}>{`${total} ${currency}`}</p>
          </div>
          <Link href={`${lang}/checkout`} className={styles.button}>
            {buttonLabel}
            <ArrowRightIcon iconStyle={styles.icon} />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CartBanner;
