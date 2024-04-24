import React from 'react';
import axios from "axios";

import s from "./ButtonforPay.module.css";
import { useRouter } from 'next/router';

interface Props {
	finalPrice: number
}



const ButtonforPay = ({ finalPrice }: Props) => {
	console.log(finalPrice.toFixed(2))
	
	const takeLinkFromBank = () => {
		let priceAll = finalPrice.toFixed(2)
		const numberWithoutDot = priceAll.replace(".", "");
		console.log(numberWithoutDot, "numberWithoutDot")
		const arg = {
			"amount": Number(numberWithoutDot),
			"ccy": 980,
			"merchantPaymInfo": {
			  "reference": "555/6",
			  "destination": "Продукція Rubbit. Замовлення номер 555/6",
			  "basketOrder": [
				{
				  "name": "Продукція Rubbit",
				  "qty": 1,
				  "sum":  Number(numberWithoutDot),
				  "icon": "https://cbdrabbit-frontend.vercel.app/_next/static/media/logoHome.2d340cbb.svg",
				  "unit": "шт.",
				  "code": "d21da1c47f3c45fca10a10c32518bdeb",
				  "barcode": "3b2a558cc6e44e218cdce301d80a1779",
				  "header": "Хідер",
				  "footer": "Футер",
				  "tax": [
					0
				  ],
				  "uktzed": "uktzedcode"
				}
			  ]
			},
			"redirectUrl":  "https://www.google.com.ua/",
			"webHookUrl": "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
			"validity": 3600,
			"paymentType": "debit"
		}
		
		axios.post("https://api.monobank.ua/api/merchant/invoice/create", arg, {
			headers: {
				'Content-type': 'application/json',
				'X-Token': 'uMPifdfwWuOCQHZlDW5zNC9-FZHbZjCktoXp34ciPTHo'
	}
}).then(response => {
	// Обработка успешного ответа
	console.log("Успешный ответ:", response.data);
	location.href = response.data.pageUrl
  })
  .catch(error => {
	// Обработка ошибки
	console.error("Ошибка:", error);
  });
	}
	return (
		<button
			className={s.button}
			onClick={takeLinkFromBank}
		>Перейти до оплати</button>
	);
};

export default ButtonforPay;
