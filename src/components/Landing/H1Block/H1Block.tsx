import React from "react";
import cn from "clsx";

import s from "./H1Block.module.css";
import SelectButtons from "../SelectButtons/SelectButtons";
import Image from "next/image";

import baban from "/public/img/baban.png";
import banana_2 from "/public/img/banana_2.svg";
import banana_3 from "/public/img/banana_3.svg";
import Link from "next/link";
import H1BlockDescription from "../H1BlockDescription/H1BlockDescription";

const H1Block = () => {
  return (
    <div className={s.h1Block}>
      <SelectButtons />
      <div className={cn("", s.row)}>
			  <div className={s.h1_pic}>
				  <Image  className={ s.banana } src={baban} alt="baban" width={480} height={480} />
				  <div className={s.banana_2}>
				  <Image src={banana_2} alt="banana_2"  width={406} height={330} />
				  </div>
				  <div className={s.banana_3}>
				  <Image  className={s.banana_3_img} src={banana_3} alt="banana_3" width={27} height={502} />
							</div>
		</div>
        <div className={s.h1block_content}>
          <h1 className={s.h1}>
            <span className={s.h1_1}>БІЛИЙ ШОКОЛАД</span>
            <span className={s.h1_2}>КОКОСОВЕ МОЛОКО</span>
            <span className={s.h1_3}>БАНАН 50mg CBD</span>
				  </h1>
				  <div className={s.descr}>1 цукерка - 8г</div>
				  <div className={s.bb}>
					  <Link className={s.button} href="#">ПРИДБАТИ</Link>
				  </div>
				  <H1BlockDescription />
        </div>
      </div>
    </div>
  );
};

export default H1Block;
