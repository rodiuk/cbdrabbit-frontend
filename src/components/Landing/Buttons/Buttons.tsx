import React from 'react';
import s from "./Buttons.module.css";
import Link from 'next/link';

interface Props {
	button1Text: string
	button2Text: string
}

const Buttons = ({button1Text, button2Text}: Props) => {
	return (
		<div className={s.buttons}>
			<Link className={s.button} href="/">{button1Text}</Link>
			<Link className={s.button2} href="/">{button2Text}</Link>
		</div>
	);
};

export default Buttons;
