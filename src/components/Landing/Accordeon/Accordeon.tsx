"use client"
import React from 'react';

import s from "./Accordeon.module.css";
import AccordeonItem from './AccordeonItem/AccordeonItem';

interface IAccordeonItem {
	id: string
	title: string
	text: string
}
interface Props {
	content: IAccordeonItem[]
}
const Accordeon = ({content}: Props) => {
	
	const accordeon = [{
		title: "Користь",
		text: "super"
	},{
		title: "Зберігання",
		text: "Зберігати у сухому місці від 4° до 20°С і відносній вологості повітря не більше 75%. Термін придатності до вживання: 10 місяців з дати виготовлення"
	},{
		title: "Cклад",
		text: "Дофіга всього"
		},]
	
	
	return (
		<div className={s.accordeon}>
			<div className={s.accordeon_container}>
				<ul>
				{content.map((item, index) => {
					return (
						<AccordeonItem  key={index} item={item} />
					)
				}) }
				</ul>
				
			</div>
		</div>
	);
};

export default Accordeon;
