/**
 * Calculate the number of candies that can be exchanged for a gift.
 * @param candies - The number of candies.
 * @returns The number of candies that can be exchanged for a gift.
 * @example
 * calculateGiftCandies(14); // 2
 */
export function calculateGiftCandies(candies: number): number {
  return Math.floor(candies / 7);
}
