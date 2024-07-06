"use client";

import React from "react";
import EmptyOrders from "@/components/Orders/EmptyOrders/EmptyOrders";
import { useSession } from "next-auth/react";
import { getAllUserOrders } from "@/libs/api/order.api";
import OrderItemCard from "@/components/Orders/OrderItem/OrderItem";
import { IUserOrder } from "@/interfaces/order.interface";
import { IOrderDict } from "@/interfaces/i18n.interface";
import { AnimatePresence, motion } from "framer-motion";
import LayPopupOrderInfo from "@/components/LaysPopups/LayPopupOrderInfo/LayPopupOrderInfo";
import { Locale } from "../../../../../i18n.config";

import s from "./page.module.css";

interface Props {
  lang: Locale;
  dict: IOrderDict;
  currency: string;
}

export const OrdersWrapper = (props: Props): React.JSX.Element => {
  const { lang, dict, currency } = props;
  const [orders, setOrders] = React.useState<IUserOrder[]>([]);
  const [fetchOrders, setFetchOrders] = React.useState<boolean>(false);
  const { data, status } = useSession();

  const isLoading = status === "loading" || fetchOrders;

  const hasOrders = orders?.length > 0;

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);

  const closePoup = () => {
    setIsOpenPopup(false);
  };
  const openPoup = () => {
    setIsOpenPopup(true);
  };

  const handleBadkdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setIsOpenPopup(false);
    }
  };

  React.useEffect(() => {
    (async function fetchOrders() {
      try {
        setFetchOrders(true);
        if (!data?.user?.id) return;

        const orders = await getAllUserOrders(data?.user?.id);
        setOrders(orders as unknown as IUserOrder[]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchOrders(false);
      }
    })();
  }, [data?.user?.id]);

  return (
    <>
      {!hasOrders && !isLoading && <EmptyOrders lang={lang} dict={dict} />}

      {hasOrders && !isLoading && (
        <>
          {orders?.map(order => {
            return (
              <OrderItemCard
                key={order.id}
                order={order}
                dict={dict}
                currency={currency}
                openPoup={openPoup}
              />
            );
          })}

          <AnimatePresence mode="wait">
            {isOpenPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LayPopupOrderInfo
                  closePoup={closePoup}
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
