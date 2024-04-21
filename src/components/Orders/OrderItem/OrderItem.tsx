import React from "react";
import { IUserOrder } from "@/interfaces/order.interface";
import { formatDate } from "@/utils/formatDate";
import { IOrderDict } from "@/interfaces/i18n.interface";

import s from "./OrderItem.module.css";

import OrderProduct from "./OrderProduct/OrderProduct";
import ButtonWhite from "../../Ui/Button/ButtonWhite";
import DotsIcon from "../../icons/DotsIcon";

interface Prop {
  menu?: boolean;
  order: IUserOrder;
  currency: string;
  dict: IOrderDict;
}

const OrderItemCard = ({ menu, order, dict, currency }: Prop) => {
  return (
    <div className={s.orderInfo}>
      <div className={s.statusOrder}>
        <div className={s.orderInfo_ttl}>{order.status}</div>
        <div className={s.orderInfo_descr}>{formatDate(order.createdAt)}</div>
      </div>
      <div className={s.orderInfo_num}>
        <p>№ {order.checkId}</p>
      </div>
      <div className={s.orderInfo_items}>
        {order?.orderItems?.map(item => {
          return (
            <OrderProduct
              key={item.id}
              item={item}
              itemPrice={order.itemPrice}
            />
          );
        })}
      </div>
      <div className={s.orderInfo_pay}>
        <div className={s.orderInfo_ttl2}>{dict.amountLabel}</div>
        <div className={s.orderInfo_descr2}>
          {order?.totalSum} {currency}
        </div>
      </div>
      <div className={s.buttonBlock}>
        <ButtonWhite text={dict.orderAgainBtn} />
        {menu && (
          <div className={s.orderInfo_mnu}>
            <DotsIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemCard;
