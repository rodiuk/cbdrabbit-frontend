import { IAddressData } from "./adress.interface";

export interface IOrderCreate {
  userId: string;
  totalSum: number;
  address: IAddressData;
  items: IOrderItem[];
}

export interface IOrderItem {
  productId: string;
  quantity: number;
}
