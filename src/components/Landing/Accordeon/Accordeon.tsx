"use client"
import cn from "clsx";

import s from "./Accordeon.module.css";
import AccordeonItem from './AccordeonItem/AccordeonItem';

interface IAccordeonItem {
	id: string
	title: string
	text: string
}
interface Props {
	content: IAccordeonItem[]
	lendId: string
}
const Accordeon = ({content, lendId}: Props) => {

	return (
		<div className={s.accordeon}>
			<div className={cn(s.accordeon_container, {
			[s.pink]: lendId === "classic",
			[s.yellow]: lendId === "banana",
			[s.green]: lendId === "matcha",
			[s.brown]: lendId === "coffee",
	  })}>
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
