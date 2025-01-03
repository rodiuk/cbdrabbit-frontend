interface PriceRange {
  min: number;
  max: number;
  price: number;
}

const priceRanges: PriceRange[] = [
  { min: 1, max: 5, price: 85 },
  { min: 6, max: 10, price: 82 },
  { min: 11, max: 15, price: 80 },
  { min: 16, max: 20, price: 78.5 },
  { min: 21, max: 30, price: 77.5 },
  { min: 31, max: 40, price: 76.5 },
  { min: 41, max: 50, price: 75.5 },
  { min: 51, max: 75, price: 75 },
  { min: 76, max: 100, price: 74.5 },
  { min: 101, max: 200, price: 74 },
  { min: 201, max: Infinity, price: 73.5 },
];

/**
 * Calculate price based on quantity
 * @param quantity - total quantity of products
 * @returns
 * - price per product
 */

export const calculatePrice = (quantity: number): number => {
  const priceRange = priceRanges.find(
    range => quantity >= range.min && quantity <= range.max
  );
  return priceRange ? priceRange.price : priceRanges[0].price;
};
