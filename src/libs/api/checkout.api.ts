"use server";

import { IProductCard } from "@/interfaces/product.interface";

export const createUrlForCheckout = async (
  totalSum: number,
  products: IProductCard[],
  itemPrice: number
) => {
  const arg = {
    amount: totalSum.toFixed(0),
    ccy: 980,
    merchantPaymInfo: {
      reference: "555/6",
      destination: "Продукція Rubbit",
      basketOrder: [
        products.map(item => ({
          name: item.productName,
          qty: item.count,
          sum: itemPrice.toFixed(0),
          icon: (item?.images && item?.images[0]?.url) ?? "",
          unit: "шт.",
          code: item.id,
          tax: [0],
          uktzed: "uktzedcode",
        })),
      ],
    },
    redirectUrl: "https://cbdrabbit.shop/uk/orders",
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
          "X-Token": "uMPifdfwWuOCQHZlDW5zNC9-FZHbZjCktoXp34ciPTHo",
        },
        body: JSON.stringify(arg),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    return null;
  } catch (error) {
    throw error;
  }
};
