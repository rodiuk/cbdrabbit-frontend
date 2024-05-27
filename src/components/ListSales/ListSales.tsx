import React from "react";
import { DiscountInfo } from "../ProductCard/DiscountInfo/DiscountInfo";

interface Props {
	home: any;
	className?: string
}

const ListSales = ({ home, className }: Props) => {
  return (
    <>
      <DiscountInfo
        label={home.product.discountLabel}
			  discountList={home.product.discountList}
			  className={className}
      />
    </>
  );
};

export default ListSales;
