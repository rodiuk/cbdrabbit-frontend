import React from 'react';

import Image from 'next/image';

import s from "./OrderProduct.module.css";
import productImage from "/public/img/pic1.jpg";

const OrderProduct = ({ item }: any) => {
	console.log(item)
	return (
		<div className={s.productCheckout}>
                            <div className={s.productCheckout_img}>
							<Image src={productImage} alt="pic" />
                            </div>
                            <div className={s.productCheckout_info}>
                                <div className={s.productCheckout_ttl}>
                                    <p>{item.name}</p>
                                </div>
                                <div className={s.productCheckout_count}>
                                    <span className={s.grey}>{item.quantity} &#215;</span> {item.price} ₴
                                </div>
                            </div>
                        </div>
	);
};

export default OrderProduct;
