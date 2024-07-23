import React from 'react';
import s from "./H1BlockDescription.module.css";

// import h1d1 from "/public/img/h1d1.png";
// import h1d2 from "/public/img/h1d2.png";
// import h1d3 from "/public/img/h1d3.png";
import Image from 'next/image';

interface Props {
	productFinedDescr: any,
	productFinedImages: any
}

const H1BlockDescription = ({ productFinedDescr, productFinedImages }: Props) => {
	console.log(productFinedImages)
	return (
		<div className={s.descBlock}>
			{productFinedDescr && productFinedDescr.map((it: any, index: number) => {
				const images = productFinedImages[index] || '';
				console.log(images)
				return (
					<div className={s.item} key={index}>
				<div className={s.ttl}>{it.descr}</div>
				<div className={s.img}>
					<Image src={images.image} width={240} height={342} alt="kg" />
				</div>
			</div>
				)
			}) }
			
		</div>
	);
};

export default H1BlockDescription;
