import React from 'react';
import s from "./AccordeonItem.module.css";

interface Props {
	item: {
		id: string
		title: string
		text: string
	}
}

const AccordeonItem = ({item}: Props) => {
	const [isOpen, setIsOpen] = React.useState(false)

	const handlerClick = () => {
		setIsOpen(!isOpen)
	}
	return (
		<li className={s.li}>
							<div className={s.ttl} onClick={handlerClick}>{item.title}</div>
							{isOpen && <div className={s.text} dangerouslySetInnerHTML={{ __html: item.text }}></div>}
			
							
						</li>
	);
};

export default AccordeonItem;
