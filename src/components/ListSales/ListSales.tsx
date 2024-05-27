import React from "react";
import { DiscountInfo } from "../ProductCard/DiscountInfo/DiscountInfo";

interface Props {
  home: any;
}

const ListSales = ({ home }: Props) => {
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
