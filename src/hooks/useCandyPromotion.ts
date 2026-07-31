"use client";

import React from "react";
import {
  AUGUST_CANDY_PROMOTION,
  getNextCandyPromotionBoundary,
  isCandyPromotionActive,
} from "@/configs/candyPromotion";

const MAX_TIMEOUT = 2_147_483_647;

export const useCandyPromotion = () => {
  const [isActive, setIsActive] = React.useState(() =>
    isCandyPromotionActive()
  );

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const syncPromotion = () => {
      const now = new Date();
      setIsActive(isCandyPromotionActive(now));

      const nextBoundary = getNextCandyPromotionBoundary(now);
      if (!nextBoundary) return;

      const delay = Math.min(
        Math.max(nextBoundary.getTime() - now.getTime(), 0),
        MAX_TIMEOUT
      );
      timeoutId = setTimeout(syncPromotion, delay);
    };

    syncPromotion();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return {
    isActive,
    originalPrice: AUGUST_CANDY_PROMOTION.originalPrice,
    promotionalPrice: AUGUST_CANDY_PROMOTION.price,
  };
};
