import React from 'react';
import s from "./H1BlockDescription.module.css";

import h1d1 from "/public/img/h1d1.png";
import h1d2 from "/public/img/h1d2.png";
import h1d3 from "/public/img/h1d3.png";
import Image from 'next/image';

const H1BlockDescription = () => {
	return (
		<div className={s.descBlock}>
			<div className={s.item}>
				<div className={s.ttl}>Крафтовий білий шоколад на кокосовому молоці</div>
				<div className={s.img}>
					<Image src={h1d1} width={240} height={342} alt="kg" />
				</div>
			</div>
			<div className={s.item}>
				<div className={s.ttl}>Крафтовий білий шоколад на кокосовому молоці</div>
				<div className={s.img}>
					<Image src={h1d1} width={240} height={342} alt="kg" />
				</div>
			</div>
			<div className={s.item}>
				<div className={s.ttl}>Cублімовані банани</div>
				<div className={s.img}>
					<Image src={h1d2} width={240} height={342} alt="kg" />
				</div>
			</div>
			<div className={s.item}>
				<div className={s.ttl}>50 мг СBD Ізолят канабідіолу</div>
				<div className={s.img}>
					<Image src={h1d3} width={240} height={342} alt="kg" />
				</div>
			</div>
		</div>
	);
};

export default H1BlockDescription;
