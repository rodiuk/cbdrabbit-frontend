import React from 'react';
import cn from "clsx";
import s from "./Buttons.module.css";
import Link from 'next/link';

interface Props {
	button1Text: string
	button2Text: string
	lendId: string
}

const Buttons = ({button1Text, button2Text, lendId}: Props) => {
	return (
		<div className={s.buttons}>
			<Link className={cn(s.button, {
				  [s.pink]: lendId === "classic",
				  [s.green]: lendId === "matcha",
			  })} href="/">{button1Text}</Link>
			<Link className={cn(s.button2, {
				  [s.pink2]: lendId === "classic",
				  [s.green2]: lendId === "matcha",
			  })} href="/">{button2Text}</Link>
		</div>
	);
};

export default Buttons;
