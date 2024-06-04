import React from "react";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { OrdersWrapper } from "./OrdersWrapper";

import cn from "clsx";
import styles from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";

export default async function Orders({ params }: IMainPageProps) {
  const { orders, currency } = await getDictionary(params.lang);

  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.wrapPage}>
          <OrdersWrapper lang={params.lang} dict={orders} currency={currency} />
        </div>
      </main>
      <Footer />
    </>
  );
}
