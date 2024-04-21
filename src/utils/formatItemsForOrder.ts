import { IOrderItem } from "@/interfaces/order.interface";
import { IProductCard } from "@/interfaces/product.interface";

export const formatItemsForOrder = (
  items: IProductCard[]
): Array<IOrderItem> => {
  const addedItems = items.filter(item => item.count > 0);

  return addedItems.map(item => {
    return {
      productId: item.id,
      quantity: item.count,
    };
  });
};
