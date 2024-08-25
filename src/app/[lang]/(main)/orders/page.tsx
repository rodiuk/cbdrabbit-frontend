import React from "react";
import { OrdersWrapper } from "./OrdersWrapper";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Footer } from "@/components/layout/Footer/Footer";

import cn from "clsx";
import styles from "./page.module.css";

export default async function Orders({ params }: IMainPageProps) {
  const { orders, currency } = await getDictionary(params.lang);
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;

  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.wrapPage}>
          <OrdersWrapper lang={params.lang} dict={orders} currency={currency} />
        </div>
      </main>

      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
