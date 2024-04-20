export const calculateTotalUserPrice = (
  totalAmount: number,
  userDiscount: number
) => {
  const userDiscountSum = (totalAmount / 100) * userDiscount;
  const finalPrice = totalAmount - userDiscountSum;

  return finalPrice;
};
