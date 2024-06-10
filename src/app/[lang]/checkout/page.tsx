import React from "react";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { CheckoutWrapper } from "./CheckoutWrapper";
import { SuccessOrder } from "@/components/auth/SuccessOrder";
import { Footer } from "@/components/layout/Footer/Footer";
 
import cn from "clsx";
import styles from "./page.module.css";

export default async function Checkout({
  params,
  searchParams,
}: IMainPageProps) {
  const { lang } = params;
	const dict = await getDictionary(lang);
	const {header} = dict
  const homeDict = dict?.home;
  const successOrder = searchParams?.successOrder;
 
  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.checoutPage}>
          {!successOrder && (
            <div className={styles.checkoutBlocks}>
              <CheckoutWrapper
                dict={dict.checkout}
                currency={dict.currency}
                homeDict={homeDict}
                lang={lang}
              />
            </div>
          )}

          {successOrder && (
            <SuccessOrder
              lang={lang}
              dict={dict.orders}
              containerStyle={styles.successOrder}
            />
          )}
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
