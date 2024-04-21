import { Image, Product } from "@prisma/client";
import { IAddressData } from "./adress.interface";

export interface IOrderCreate {
  userId: string;
  totalSum: number;
  comment?: string;
  itemPrice: number;
  address: IAddressData;
  items: IOrderItem[];
}

export interface IOrderItem {
  productId: string;
  quantity: number;
}

export interface IUserOrder {
  id: string;
  totalSum: number;
  itemPrice: number;
  checkId: number;
  comment: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: {
      id: string;
      city: string;
      npDeliveryType: string;
      npDepartment: string;
      phoneNumber: string;
    };
  };
  orderItems: Array<IUserOrderItem>;
}

export interface IUserOrderItem {
  id: string;
  quantity: number;
  product: IOrderProduct;
}

export interface IOrderProduct extends Product {
  images: Image[];
}
