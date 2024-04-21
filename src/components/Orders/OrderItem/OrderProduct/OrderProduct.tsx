import React from "react";
import Image from "next/image";
import { IUserOrderItem } from "@/interfaces/order.interface";

import s from "./OrderProduct.module.css";

interface Props {
  item: IUserOrderItem;
  itemPrice: number;
}

const OrderProduct = (props: Props): React.JSX.Element => {
  const { item, itemPrice } = props;

  const imgUrl = item?.product?.images ? item.product.images.at(0)?.url : "";

  return (
    <div className={s.productCheckout}>
      <div className={s.productCheckout_img}>
        {imgUrl && <Image src={imgUrl} alt="pic" width={32} height={32} />}
      </div>
      <div className={s.productCheckout_info}>
        <div className={s.productCheckout_ttl}>
          <p>{item.product.productName}</p>
        </div>
        <div className={s.productCheckout_count}>
          <span className={s.grey}>{item.quantity} &#215;</span> {itemPrice} ₴
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
