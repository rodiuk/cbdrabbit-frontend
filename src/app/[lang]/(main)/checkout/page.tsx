import React from "react";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { CheckoutWrapper } from "./CheckoutWrapper";
import { Footer } from "@/components/layout/Footer/Footer";
import { SuccessOrder } from "@/components/auth/SuccessOrder/SuccessOrder";

export const dynamic = "force-dynamic";

import cn from "clsx";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth.config";
import { getUserInfo } from "@/libs/api/user.api";

export default async function Checkout({
  params,
  searchParams,
}: IMainPageProps) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;

  const session = await getServerSession(authConfig);

  const user = await getUserInfo(session?.user?.id || null);

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
