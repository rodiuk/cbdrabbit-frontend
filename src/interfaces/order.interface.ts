import {
  Address,
  DeliveryInfo,
  Image,
  OrderStatusHistory,
  Product,
  Promocode,
} from "@prisma/client";
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
  acceptedSignUp: boolean;
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
  presentQuantity: number | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_medium?: string | null;
  utm_source?: string | null;
  utm_term?: string | null;
  promocodeId?: string | null;
  orderStatusHistory?: Array<OrderStatusHistory>;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    address?: Partial<Address> | null;
  };
  orderItems: Array<Partial<IUserOrderItem>>;
  promocode?: Promocode | null;
  deliveryInfo?: DeliveryInfo | null;
}

export interface IUserOrderItem {
  id: string;
  quantity: number;
  product: IOrderProduct;
}

export interface IOrderProduct extends Product {
  images: Image[];
}
