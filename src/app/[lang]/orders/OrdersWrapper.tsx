"use client";

import React from "react";
import EmptyOrders from "@/components/Orders/EmptyOrders/EmptyOrders";
import { Locale } from "../../../../i18n.config";
import { useSession } from "next-auth/react";
import { getAllUserOrders } from "@/libs/api/order.api";
import OrderItemCard from "@/components/Orders/OrderItem/OrderItem";
import { IUserOrder } from "@/interfaces/order.interface";
import { IOrderDict } from "@/interfaces/i18n.interface";

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
              />
            );
          })}
        </>
      )}
    </>
  );
};
