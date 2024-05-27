import React from "react";
import { DiscountInfo } from "../ProductCard/DiscountInfo/DiscountInfo";
import { getDictionary } from "@/libs/18n/getDictionary";

interface Props {
  lang: any;
}

const ListSales = async ({ lang }: Props) => {
  const home = (await getDictionary(lang))?.home;
  return (
    <>
      <DiscountInfo
        label={home.product.discountLabel}
        discountList={home.product.discountList}
      />
    </>
  );
};

export default ListSales;
