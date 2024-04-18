import React from 'react';

import s from "./EmptyOrders.module.css";

import errorRabbit from "/public/img/errorRabbit.jpg";
import Image from 'next/image';
import Button from '@/components/Ui/Button/Button';

const EmptyOrders = () => {
	return (
		<div className={s.emptyOrders}>
			<div className="img">
				<Image src={errorRabbit} alt="error" />
			</div>  
			<div className={s.text}>
				<p>У вас ще немає замовлень</p>
			</div>
			<div className={s.buttonBlock}>
				<Button text="Обрати цукерки" />
			</div>
		</div>
	);
};

export default EmptyOrders;
