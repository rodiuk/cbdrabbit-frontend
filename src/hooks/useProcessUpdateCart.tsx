"use client";

import React from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/libs/store/atoms";
import { getAllProducts } from "@/libs/api/products.api";
import {
  getCandyUnitPrice,
  getNextCandyPromotionBoundary,
} from "@/configs/candyPromotion";

const MAX_TIMEOUT = 2_147_483_647;

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
        setCart(currentCart => ({ ...currentCart, products: updatedProducts }));
      })();
    }
  }, [cart.products, lang, setCart]);

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const syncCartPrice = () => {
      const now = new Date();
      const unitPrice = getCandyUnitPrice(now);

      setCart(currentCart => {
        const totalAmount = currentCart.totalCount * unitPrice;

        if (
          currentCart.newPrice === unitPrice &&
          currentCart.totalAmount === totalAmount
        ) {
          return currentCart;
        }

        return { ...currentCart, newPrice: unitPrice, totalAmount };
      });

      const nextBoundary = getNextCandyPromotionBoundary(now);
      if (!nextBoundary) return;

      const delay = Math.min(
        Math.max(nextBoundary.getTime() - now.getTime(), 0),
        MAX_TIMEOUT
      );
      timeoutId = setTimeout(syncCartPrice, delay);
    };

    syncCartPrice();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [setCart]);

  return {};
};
