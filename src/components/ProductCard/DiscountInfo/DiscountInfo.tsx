"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Close from "@/components/icons/Close";
import Button from "@/components/Ui/Button/Button";
import { InfoIcon } from "@/components/icons/InfoIcon";

import cn from "clsx";
import styles from "./DiscountInfo.module.css";

import sale from "/public/img/salenew.jpg";

interface Props {
  label: string;
  discountList: string[];
  className?: string;
}

export const DiscountInfo = ({
  label,
  discountList,
  className,
}: Props): React.JSX.Element => {
  const [show, setShow] = React.useState(false);

  const closeLay = () => {
    setShow(false);
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  };
  return (
    <div className={cn(styles.container, className)}>
      <p className={styles.label} onClick={() => setShow(prev => !prev)}>
        {label}
        {/* <ArrowDownIcon
          iconStyle={cn(styles.icon, {
            [styles.icon_rotate]: show,
          })}
        /> */}
        <InfoIcon />
      </p>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            className={styles.list}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            onClick={e => handleBackdropClick(e)}
          >
            <div className={styles.lay}>
              <div className={styles.ttl}>Знижка на великі замовлення</div>
              <div className={styles.img}>
                <Image src={sale} alt="sale" />
              </div>
              <ul className={styles.ul}>
                {discountList?.map(discount => (
                  <li key={discount} className={styles.discount}>
                    {discount}
                  </li>
                ))}
                <li className={styles.discount} />
              </ul>
              <button className={styles.close} onClick={closeLay}>
                <Close iconStyle={styles.grey} />
              </button>
              <div className={styles.bb}>
                <Button text="Чудово" handleClick={closeLay} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
