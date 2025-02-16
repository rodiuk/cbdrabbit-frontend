import { StaticImageData } from "next/image";

export interface IDescriptionLandingsPictures {
  id: number;
  descr: string;
  image: StaticImageData;
}
export interface ILandingsPictures {
  id: string;
  title1?: string;
  title2?: string;
  title3?: string;
  image1: StaticImageData;
  image2: StaticImageData;
  image3: StaticImageData;
  image3_mob: StaticImageData;
  description: IDescriptionLandingsPictures[];
  accordeon: any[];
}
