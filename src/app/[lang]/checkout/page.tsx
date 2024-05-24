import React from "react";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { CheckoutWrapper } from "./CheckoutWrapper";
import { SuccessOrder } from "@/components/auth/SuccessOrder";

import cn from "clsx";
import styles from "./page.module.css";

export default async function Checkout({
  params,
  searchParams,
}: IMainPageProps) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const successOrder = searchParams?.successOrder;

  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.checoutPage}>
        {!successOrder && (
          <div className={styles.checkoutBlocks}>
            <CheckoutWrapper lang={lang} dict={dict.checkout} currency={dict.currency} />
          </div>
        )}

        {successOrder && <SuccessOrder lang={lang} dict={dict.orders} containerStyle={styles.successOrder} />}
      </div>
    </main>
  );
} 1347
