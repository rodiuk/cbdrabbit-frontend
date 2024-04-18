import React from "react";

import cn from "clsx";
import styles from "./page.module.css";
import OrderItem from "@/components/OrderItem/OrderItem";
import EmptyOrders from "./EmptyOrders/EmptyOrders";

export default function Orders() {
	const test = true
  return (
    <main className={cn("container", styles.main)}>
		  <div className={styles.wrapPage}>
			  {test ? (
				  <EmptyOrders />/*  не было покупок */
			  ): (
					  <>
						  <OrderItem menu status="Оплачено" products={[{id: "1", name: "Rabbit Black", price: "80", quantity: "2"}, {id: "2",  name: "Rabbit Banana", price: "80", quantity: "3"}]} />
		<OrderItem status="Відправлено" products={[{id: "1", name: "Rabbit Black", price: "80", quantity: "2"}, {id: "2",  name: "Rabbit Banana", price: "80", quantity: "3"}, {id: "3",  name: "Rabbit Banana", price: "80", quantity: "4"}]} />
		<OrderItem status="Отримано" products={[{id: "1", name: "Rabbit Black", price: "80", quantity: "2"}, {id: "2",  name: "Rabbit Banana", price: "80", quantity: "3"}]} />
		<OrderItem status="Скасовано" products={[{id: "1", name: "Rabbit Black", price: "80", quantity: "2"}, {id: "2",  name: "Rabbit Banana", price: "80", quantity: "3"}]} />
					  </>
			  ) }
		
      </div>
    </main>
  );
}
