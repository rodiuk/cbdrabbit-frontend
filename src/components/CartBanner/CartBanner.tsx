"use client";

import React from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { getTotalPriceAtom } from "@/libs/store/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { useProcessUpdateCart } from "@/hooks/useProcessUpdateCart";

import styles from "./CartBanner.module.css";
import Loader from "../Ui/Loader";

interface Props {
  currency: string;
  checkoutLabel: string;
  buttonLabel: string;
  lang: string;
}

const excludedPaths = [
  "checkout",
  "profile",
  "signIn",
  "signUp",
  "privacy",
  "policy",
  "blog",
];

const CartBanner = (props: Props): React.JSX.Element | null => {
  const { currency, checkoutLabel, buttonLabel, lang } = props;
  const [total] = useAtom(getTotalPriceAtom);
  const pathname = usePathname()?.split("/")?.at(-1);

  const router = useRouter();

  const [state, startTransition] = React.useTransition();

  const hasExcludedPath = !!pathname ? excludedPaths.includes(pathname) : false;

  useProcessUpdateCart(props?.lang);

  return (
    <AnimatePresence mode="wait">
      {total > 0 && !hasExcludedPath ? (
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
          <div
            className={styles.button}
            onClick={() => startTransition(() => router.push(`/checkout`))}
          >
            {state ? <Loader /> : buttonLabel}
            {!state && <ArrowRightIcon iconStyle={styles.icon} />}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CartBanner;
