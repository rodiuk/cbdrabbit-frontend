import React from "react";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { CheckoutWrapper } from "./CheckoutWrapper";

import cn from "clsx";
import styles from "./page.module.css";

export default async function Checkout({ params }: IMainPageProps) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.checoutPage}>
        <div className={styles.checkoutBlocks}>
          <CheckoutWrapper
            dict={dict.checkout}
            currency={dict.currency}
            lang={lang}
          />
        </div>
      </div>
    </main>
  );
}
