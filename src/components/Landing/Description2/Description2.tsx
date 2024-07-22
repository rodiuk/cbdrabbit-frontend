import React from "react";
import cn from "clsx";
import s from "./Description2.module.css";

import ic1 from "/public/img/lend-descr2-1.svg";
import ic2 from "/public/img/lend-descr2-2.svg";
import ic3 from "/public/img/lend-descr2-3.svg";
import bg from "/public/img/lend-descr2-bg.svg";
import Image from "next/image";

const Description2 = () => {
  return (
	  <div className={s.description}>
		  <div className={s.img_lay}>
		  <Image  src={bg}  alt="pic" />
		  </div>
      <div className={cn("container", s.description_container)}>
        <div className={s.item}>
          <div className={s.wrap}>
					  <div className={s.img}>
						  <Image  src={ic1} width={160} height={160} alt="pic" />
			</div>
            <div className={s.ttl}>ВЕГАН</div>
            <div className={s.text}>У продукції немає сухого молока</div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.wrap}>
					  <div className={s.img}>
						  <Image  src={ic2} width={160} height={160} alt="pic" />
			</div>
            <div className={s.ttl}>КОРИСНО</div>
            <div className={s.text}>Цукерка щоб розслабитися</div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.wrap}>
					  <div className={s.img}>
						  <Image  src={ic3} width={160} height={160} alt="pic" />
			</div>
            <div className={s.ttl}>ЯК ЇСТИ?</div>
            <div className={s.text}>Розсмоктуй під язиком</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description2;
