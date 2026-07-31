import { constants } from "./constants";
import { fromZonedTime } from "date-fns-tz";

export const CANDY_PROMOTION_TIMEZONE = "Europe/Kyiv";

export const AUGUST_CANDY_PROMOTION = {
  originalPrice: constants.DEFAULT_PRICE,
  price: 70,
  startsAt: fromZonedTime("2026-08-01T00:00:00", CANDY_PROMOTION_TIMEZONE),
  endsAt: fromZonedTime("2026-09-01T00:00:00", CANDY_PROMOTION_TIMEZONE),
} as const;

export const isCandyPromotionActive = (at: Date = new Date()): boolean => {
  const timestamp = at.getTime();

  return (
    timestamp >= AUGUST_CANDY_PROMOTION.startsAt.getTime() &&
    timestamp < AUGUST_CANDY_PROMOTION.endsAt.getTime()
  );
};

export const getCandyUnitPrice = (at: Date = new Date()): number =>
  isCandyPromotionActive(at)
    ? AUGUST_CANDY_PROMOTION.price
    : AUGUST_CANDY_PROMOTION.originalPrice;

export const getNextCandyPromotionBoundary = (
  at: Date = new Date()
): Date | null => {
  if (at < AUGUST_CANDY_PROMOTION.startsAt) {
    return AUGUST_CANDY_PROMOTION.startsAt;
  }

  if (at < AUGUST_CANDY_PROMOTION.endsAt) {
    return AUGUST_CANDY_PROMOTION.endsAt;
  }

  return null;
};
