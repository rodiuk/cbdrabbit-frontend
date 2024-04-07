import { Image, Property } from "@prisma/client";

export interface IPropertyCreate {
  label: string;
  imgUrl: string;
  lang: string;
}

export interface IPropertyUpdate {
  label?: string;
  imgUrl?: string;
}

export interface IPropertyRes extends Property {
  image: Image;
}
