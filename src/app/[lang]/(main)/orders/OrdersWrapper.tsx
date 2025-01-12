"use client";

import React from "react";
import { Locale } from "../../../../../i18n.config";
import { AnimatePresence, motion } from "framer-motion";
import { IOrderDict } from "@/interfaces/i18n.interface";
import { IUserOrder } from "@/interfaces/order.interface";
import OrderItemCard from "@/components/Orders/OrderItem/OrderItem";
import EmptyOrders from "@/components/Orders/EmptyOrders/EmptyOrders";
import LayPopupOrderInfo from "@/components/LaysPopups/LayPopupOrderInfo/LayPopupOrderInfo";

interface Props {
  lang: Locale;
  dict: IOrderDict;
  currency: string;
  orders: IUserOrder[];
}

export const OrdersWrapper = (props: Props): React.JSX.Element => {
  const { lang, dict, currency, orders } = props;

  const hasOrders = orders?.length > 0;

  const [isOpenPopup, setIsOpenPopup] = React.useState<IUserOrder | null>(null);

  const handleBadkdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setIsOpenPopup(null);
    }
  };

  return (
    <>
      {!hasOrders && <EmptyOrders lang={lang} dict={dict} />}

      {hasOrders && (
        <>
          {orders?.map(order => {
            return (
              <OrderItemCard
                key={order.id}
                order={order}
                dict={dict}
                currency={currency}
                openPoup={() => setIsOpenPopup(order)}
              />
            );
          })}

          <AnimatePresence mode="wait">
            {!!isOpenPopup?.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LayPopupOrderInfo
                  order={isOpenPopup}
                  closePoup={() => setIsOpenPopup(null)}
                  handleBadkdropClick={handleBadkdropClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
