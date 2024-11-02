import { Image, Product } from "@prisma/client";
import { IPropertyRes } from "./property.interface";

export interface IProductCreate {
  productName: string;
  description: string;
  price: number;
  images: string[];
  propertiesIds: string[];
  locale: string;
}

export interface IProductCard extends Product {
  count: number;
  images?: Image[];
  properties?: IPropertyRes[];
}

export interface IProductRes extends Product {
  images: Image[];
  properties: IPropertyRes[];
}
