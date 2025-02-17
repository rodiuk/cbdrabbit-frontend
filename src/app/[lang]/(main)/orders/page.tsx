import React from "react";
import { getServerSession } from "next-auth";
import { OrdersWrapper } from "./OrdersWrapper";
import { authConfig } from "@/configs/auth.config";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Footer } from "@/components/layout/Footer/Footer";
import { IMainPageProps } from "@/interfaces/page.interface";

import cn from "clsx";
import styles from "./page.module.css";
import { getAllUserOrders } from "@/libs/api/order.api";

export default async function Orders({ params }: IMainPageProps) {
  const { orders, currency } = await getDictionary(params.lang);
  const session = await getServerSession(authConfig);

  const ordersList = await getAllUserOrders(session?.user?.id);

  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;

  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.wrapPage}>
          <OrdersWrapper
            lang={params.lang}
            dict={orders}
            orders={ordersList}
            currency={currency}
          />
        </div>
      </main>

      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
