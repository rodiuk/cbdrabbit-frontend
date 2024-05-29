import React from "react";
import { IUserOrder } from "@/interfaces/order.interface";
import { formatDate } from "@/utils/formatDate";
import { IOrderDict } from "@/interfaces/i18n.interface";

import s from "./OrderItem.module.css";

import OrderProduct from "./OrderProduct/OrderProduct";
import sale_icon from "/public/img/sale_icon.svg";
import Image from "next/image";
import { InfoIcon } from "@/components/icons/InfoIcon";


interface Prop {
  menu?: boolean;
  order: IUserOrder;
  currency: string;
	dict: IOrderDict;
	openPoup: () => void
}

const OrderItemCard = ({ menu, order, dict, currency, openPoup }: Prop) => {
	let orderStatus = 0;
	
	

	return (
		<>
    <div className={s.orderInfo}>
      <div className={s.top_info}>
        <div className={s.orderInfo_num}>
          <p>№ {order.checkId}</p>
			  </div>
			  <div className={s.butt_info} onClick={openPoup}><InfoIcon iconStyle={s.icon_info} /> </div>
      </div>
      <div className={s.orderInfo_descr}>{formatDate(order.createdAt)}</div>
      <div className={s.orderInfo_ttl}>
        {orderStatus ? order.status : "Комплектується"}
      </div>
      <div className={s.orderInfo_ttl}>
        Відправлено <span className={s.ttl_end}>18.03.24, 11:52</span>
      </div>
      <div className={s.orderInfo_ttl}>
        <span className={s.red}>Зберігається до 21.03.24, 11:52</span>{" "}
      </div>
      <div className={s.orderInfo_ttl}>
        <span className={s.red}>Не отримано</span>{" "}
        <span className={s.ttl_end}>18.03.24, 11:52</span>
      </div>
      <div className={s.orderInfo_ttl}>
        <span className={s.red}>Кошти повернуто</span>{" "}
        <span className={s.ttl_end}>18.03.24, 11:52</span>
      </div>
      <div className={s.ttl_black}>Посилка №: 20 4003 9139 7777</div>

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
        <div className={s.orderInfo_ttl2}>Подарунок</div>
        <div className={s.orderInfo_descr2}>Rabbit Classic × 1</div>
      </div>
      <div className={s.orderInfo_pay}>
        <div className={s.orderInfo_ttl2}>{dict.amountLabel}</div>
        <div className={s.orderInfo_descr2}>
          {order?.totalSum} {currency}
        </div>
      </div>
      <div className={s.sale_tttl}>
        <span className={s.one}>
          <Image src={sale_icon} width={22} height={14} alt="sale_icon" />
          Знижка 20%
        </span>
        <span className={s.two}>- 64 ₴</span>
      </div>
      <div className={s.orderInfo_pay}>
        <div className={s.orderInfo_ttl2}>
          <p className={s.ttl2_2}>Доставка</p>
          <p className={s.ttl2_2}>За тарифами перевізника</p>
        </div>
				</div>
				
				<div className={s.endBlock}>
					<div className={s.endBlock_wrap}>
					<div className={s.endBlock_o}>Усього сплачено</div>
        <div className={s.endBlock_t}>680 ₴</div>
					</div>
        
      </div>
	  </div>
			
	  </>
  );
};

export default OrderItemCard;
