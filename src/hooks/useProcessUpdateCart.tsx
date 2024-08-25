"use client";

import React from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/libs/store/atoms";
import { getAllProducts } from "@/libs/api/products.api";

export const useProcessUpdateCart = (lang: string) => {
  const [cart, setCart] = useAtom(cartAtom);

  React.useEffect(() => {
    const localeChanged = cart?.products?.some(p => p.locale !== lang);

    if (localeChanged) {
      (async function () {
        const products = await getAllProducts(lang);
        const updatedProducts = cart.products.map(p => {
          const product = products.find(pr => pr.productName === p.productName);
          return product ? { ...product, count: p.count } : p;
        });
        setCart({ ...cart, products: updatedProducts });
      })();
    }
  }, [cart, lang, setCart]);

  return {};
};
