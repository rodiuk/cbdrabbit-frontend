import React from "react";
import { getServerSession } from "next-auth";
import { getUserInfo } from "@/libs/api/user.api";
import { authConfig } from "@/configs/auth.config";
import { CheckoutWrapper } from "./CheckoutWrapper";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Footer } from "@/components/layout/Footer/Footer";
import { IMainPageProps } from "@/interfaces/page.interface";
import { SuccessOrder } from "@/components/auth/SuccessOrder/SuccessOrder";

import cn from "clsx";
import styles from "./page.module.css";

export default async function Checkout({
  params,
  searchParams,
}: IMainPageProps) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;

  const session = await getServerSession(authConfig);

  let user = null;

  if (session?.user?.id) {
    user = await getUserInfo(session?.user?.id);
  }

  const successOrder = searchParams?.successOrder;

  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.checoutPage}>
          {!successOrder && (
            <div className={styles.checkoutBlocks}>
              <CheckoutWrapper
                dict={dict}
                userData={user}
                currency={dict.currency}
                lang={lang}
              />
            </div>
          )}

          {successOrder && (
            <SuccessOrder dict={dict.orders} orderNumber={successOrder} />
          )}
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
