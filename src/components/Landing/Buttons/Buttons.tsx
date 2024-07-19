import React from 'react';
import s from "./Buttons.module.css";
import Link from 'next/link';

const Buttons = () => {
	return (
		<div className={s.buttons}>
			<Link className={s.button} href="/">Більше про CBD</Link>
			<Link className={s.button2} href="/">Придбати</Link>
		</div>
	);
};

export default Buttons;
