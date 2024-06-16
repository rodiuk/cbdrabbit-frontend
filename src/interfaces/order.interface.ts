import { Image, Product } from "@prisma/client";
import { IAddressData } from "./adress.interface";

export interface IOrderCreate {
  userId?: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  totalSum: number;
  comment?: string;
  itemPrice: number;
  address: IAddressData;
  items: IOrderItem[];
  utm_campaign?: string;
  utm_content?: string;
  utm_medium?: string;
  utm_source?: string;
  utm_term?: string;
  promocodeId?: string;
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
  comment?: string | null;
  status?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_medium?: string | null;
  utm_source?: string | null;
  utm_term?: string | null;
  promocodeId?: string | null;
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
