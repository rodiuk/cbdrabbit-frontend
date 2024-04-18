import React from 'react';
import cn from "clsx";

import s from "./OrderItem.module.css";


import Image from 'next/image';
import OrderProduct from './OrderProduct/OrderProduct';
import Button from '../Ui/Button/Button';
import ButtonWhite from '../Ui/Button/ButtonWhite';
import DotsIcon from '../icons/DotsIcon';

interface Prop {
	menu?: boolean
	status: string
	products?: any
}

const OrderItem = ({ menu, status, products }: Prop) => {
	
	return (
		<div className={s.orderInfo}>
					<div className={s.statusOrder}>
						<div className={s.orderInfo_ttl}>{status}</div>
						<div className={s.orderInfo_descr}>17.03.24, 11:52</div>
					</div>
					<div className={s.orderInfo_num}>
						<p>№ 0000000014</p>
					</div>
			<div className={s.orderInfo_items}>
				{products && products.map((item: any) => {
					return <OrderProduct key={item.id} item={item} />
				})}
					
					</div>
					<div className={s.orderInfo_pay}>
						<div className={s.orderInfo_ttl2}>Оплачено без доставки</div>
						<div className={s.orderInfo_descr2}>240 ₴</div>
					</div>
			<div className={s.buttonBlock}>
				<ButtonWhite text="Повторити замовлення" />
				{menu && (
					<div className={s.orderInfo_mnu}>
							<DotsIcon />
						</div>
				)}
				
					</div>
                </div>
	);
};

export default OrderItem;
