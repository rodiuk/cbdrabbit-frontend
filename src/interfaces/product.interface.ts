import { Image, Product, Property } from "@prisma/client";
import { IPropertyRes } from "./property.interface";

export interface IProductCreate {
  productName: string;
  description: string;
  price: number;
  images: string[];
  propertiesIds: string[];
  lang: string;
}

export interface IProductCard extends Product {
  count: number;
}

export interface IProductRes extends Product {
  images: Image[];
  properties: IPropertyRes[];
}
