import { Address, Loyalty } from "@prisma/client";

export interface IUser extends IUserData {
  id: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserData {
  email: string;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  totalOrdersAmount: number;
}

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUserProfile extends IUser {
  loyalty: Loyalty | null;
  address: Address | null;
}

export interface IUserCheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IUpdateDeliveryInfo {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  npDepartment?: string;
  npDeliveryType?: string;
  city?: string;
}
