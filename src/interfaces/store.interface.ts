import { IProductCard } from "./product.interface";

export type Cart = {
  products: IProductCard[];
  totalAmount: number;
  totalCount: number;
  newPrice: number;
};
