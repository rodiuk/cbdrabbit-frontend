import React from 'react';
import s from "./SelectButtons.module.css";
import Image from 'next/image';

import ic1 from "/public/img/issmall1.png";
import ic2 from "/public/img/issmall2.png";
import ic3 from "/public/img/issmall3.png";

const SelectButtons = () => {
	
	return (
		<div className={s.productPage_select}>
			<button className={s.productPage_selectButton}>
				<Image src={ic1} alt='Rabbit Classic' width={48} height={48} />
				Rabbit Classic 
                </button>
                <button className={`${s.productPage_selectButton} ${s.active}`}>
				<Image src={ic2} alt='Rabbit Banana' width={48} height={48} /> Rabbit Banana
                </button>
                <button className={`${s.productPage_selectButton}`}>
				<Image src={ic3} alt='Rabbit Matcha' width={48} height={48} /> Rabbit Matcha
                </button>
            </div>
	);
};

export default SelectButtons;
