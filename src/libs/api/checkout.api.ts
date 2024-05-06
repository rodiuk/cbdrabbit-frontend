"use server";

import {
  IMonoPayCheckoutRes,
  IMonoPayUrlRes,
} from "@/interfaces/checkout.interface";
import { IProductCard } from "@/interfaces/product.interface";
import { getOrderNewReference } from "./order.api";

export const createUrlForCheckout = async (
  totalSum: number,
  products: IProductCard[],
  itemPrice: number
): Promise<IMonoPayUrlRes | null> => {
  const convertPrice = (price: number) =>
    Number(String(price.toFixed(2).replace(".", "")));

  const reference = await getOrderNewReference();

  const arg = {
    amount: convertPrice(totalSum),
    ccy: 980,
    merchantPaymInfo: {
      reference,
      destination: "Rabbit CBD",
      basketOrder: products.map(item => ({
        name: item.productName,
        qty: item.count,
        sum: convertPrice(itemPrice),
        icon: (item?.images && item?.images[0]?.url) ?? "",
        unit: "шт.",
        code: item.id,
        tax: [0],
        uktzed: "uktzedcode",
      })),
    },
    redirectUrl: "https://cbdrabbit.shop/uk/checkout?successOrder=true",
    webHookUrl: "https://cbdrabbit.shop/api/checkout",
    validity: 3600,
    paymentType: "debit",
  };

  try {
    const res = await fetch(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Token": "uuQ6VjssSwihvTMlQGy3tWsdeiwSN_3TmQw8TU1fKRFo",
        },
        body: JSON.stringify(arg),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    // TODO: for validate logs on server
    console.log(await res.json());

    return null;
  } catch (error) {
    throw error;
  }
};

export const checkOrderStatusOnMono = async (
  invoiceId: string
): Promise<IMonoPayCheckoutRes | null> => {
  try {
    const res = await fetch(
      "https://api.monobank.ua/api/merchant/invoice/status?invoiceId=" +
        invoiceId,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-Token": "uuQ6VjssSwihvTMlQGy3tWsdeiwSN_3TmQw8TU1fKRFo",
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    // TODO: for validate logs on server
    console.log(await res.json());
    return null;
  } catch (error) {
    throw error;
  }
};
