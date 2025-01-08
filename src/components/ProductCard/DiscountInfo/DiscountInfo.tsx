import React from "react";
import GiftIcon from "@/components/icons/GigtIcon";

import cn from "clsx";
import styles from "./DiscountInfo.module.css";

interface Props {
  label: string;
  className?: string;
}

export const DiscountInfo = ({
  label,
  className,
}: Props): React.JSX.Element => {
  return (
    <div className={cn(styles.container, className)}>
      <h1 className={styles.label}>
        {label}

        <GiftIcon />
      </h1>
      {/* <AnimatePresence mode="wait">
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
      </AnimatePresence> */}
    </div>
  );
};
