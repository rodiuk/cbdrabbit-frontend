import React from "react";
import cn from "clsx";
import s from "./SelectButtons.module.css";
import Image from "next/image";

import ic1 from "/public/img/issmall1.png";
import ic2 from "/public/img/issmall2.png";
import ic3 from "/public/img/issmall3.png";
import Link from "next/link";
import { Locale } from "../../../../i18n.config";

interface Props {
  lang: Locale
  langId: number;
}

const SelectButtons = ({ lang, langId }: Props) => {
	
  return (
    <div className={s.productPage_select}>
		  <Link className={cn(s.productPage_selectButton, {
		  [s.red]: langId === 1,
		  [s.green]: langId === 3,
		  [s.active]: langId === 1
	  })} href={`/${lang}/land1/1`}>
        <Image src={ic1} alt="Rabbit Classic" width={48} height={48} /> Rabbit
        Classic
      </Link>
      <Link className={cn(s.productPage_selectButton, {
		  [s.red]: langId === 1,
		  [s.green]: langId === 3,
		  [s.active]: langId === 2
	  })} href={`/${lang}/land1/2`}>
        <Image src={ic2} alt="Rabbit Banana" width={48} height={48} /> Rabbit
        Banana
      </Link>
      <Link className={cn(s.productPage_selectButton, {
		  [s.red]: langId === 1,
		  [s.green]: langId === 3,
		  [s.active]: langId === 3
	  })} href={`/${lang}/land1/3`}>
        <Image src={ic3} alt="Rabbit Matcha" width={48} height={48} /> Rabbit
        Matcha
      </Link>
    </div>
  );
};

export default SelectButtons;
