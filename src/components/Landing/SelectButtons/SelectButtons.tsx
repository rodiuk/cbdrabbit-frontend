import React from "react";
import s from "./SelectButtons.module.css";
import Image from "next/image";

import ic1 from "/public/img/issmall1.png";
import ic2 from "/public/img/issmall2.png";
import ic3 from "/public/img/issmall3.png";
import Link from "next/link";

interface Props {
  lang: string;
}

const SelectButtons = ({ lang }: Props) => {
  return (
    <div className={s.productPage_select}>
      <Link className={s.productPage_selectButton} href={`/${lang}/land1/1`}>
        <Image src={ic1} alt="Rabbit Classic" width={48} height={48} /> Rabbit
        Classic
      </Link>
      <Link className={s.productPage_selectButton} href={`/${lang}/land1/2`}>
        <Image src={ic2} alt="Rabbit Banana" width={48} height={48} /> Rabbit
        Banana
      </Link>
      <Link className={s.productPage_selectButton} href={`/${lang}/land1/3`}>
        <Image src={ic3} alt="Rabbit Matcha" width={48} height={48} /> Rabbit
        Matcha
      </Link>
    </div>
  );
};

export default SelectButtons;
