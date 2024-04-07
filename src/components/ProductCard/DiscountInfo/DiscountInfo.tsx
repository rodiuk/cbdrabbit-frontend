"use client";

import React from "react";

import cn from "clsx";
import styles from "./DiscountInfo.module.css";
import { ArrowDownIcon } from "@/components/icons/ArrowDown";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  label: string;
  discountList: string[];
}

export const DiscountInfo = ({
  label,
  discountList,
}: Props): React.JSX.Element => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={styles.container}>
      <p className={styles.label} onClick={() => setShow(prev => !prev)}>
        {label}
        <ArrowDownIcon
          iconStyle={cn(styles.icon, {
            [styles.icon_rotate]: show,
          })}
        />
      </p>
      <AnimatePresence mode="wait">
        {show && (
          <motion.ul
            className={styles.list}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {discountList?.map(discount => (
              <li key={discount} className={styles.discount}>
                {discount}
              </li>
            ))}
            <li className={styles.discount} />
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
