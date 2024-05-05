"use client";

import AllIcons from "@/components/icons/AllIcons";
import React from "react";
import axios from "axios";



export default function Icons() {

	const arg = {
		"amount": 4,
		"ccy": 980,
		"merchantPaymInfo": {
		  "reference": "555/6",
		  "destination": "Продукція StreetSoup. Замовлення номер 555/6",
		  "basketOrder": [
			{
			  "name": "Продукція StreetSoup",
			  "qty": 1,
			  "sum": 4,
			  "icon": "https://streetsoup.com.ua/assets/img/logo.png",
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

	React.useEffect(() => {
		axios.post("https://api.monobank.ua/api/merchant/invoice/create", arg, {
			headers: {
				'Content-type': 'application/json',
				'X-Token': 'uMPifdfwWuOCQHZlDW5zNC9-FZHbZjCktoXp34ciPTHo'
	}
}).then(response => {
	// Обработка успешного ответа
	console.log("Успешный ответ:", response.data);
  })
  .catch(error => {
	// Обработка ошибки
	console.error("Ошибка:", error);
  });
	}, [])
	return (
		<main className="container">
			<AllIcons />
		</main>
	);
}
