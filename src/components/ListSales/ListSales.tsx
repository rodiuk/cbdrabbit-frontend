import React from "react";
import { DiscountInfo } from "../ProductCard/DiscountInfo/DiscountInfo";

interface Props {
  home: any;
  className?: string;
}

const ListSales = ({ home, className }: Props) => {
  return (
    <>
      <DiscountInfo label={home.product.discountLabel} className={className} />
    </>
  );
};

export default ListSales;
