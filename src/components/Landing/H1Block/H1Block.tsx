"use client"
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cn from "clsx";

import s from "./H1Block.module.css";
import SelectButtons from "../SelectButtons/SelectButtons";
import Image from "next/image";

import baban from "/public/img/baban.png";
import banana_2 from "/public/img/banana_2.svg";
import banana_3 from "/public/img/banana_3.svg";
import banana_3_mob from "/public/img/banana_3_mob.svg";
import Link from "next/link";
import H1BlockDescription from "../H1BlockDescription/H1BlockDescription";

interface Props {
	productFined: any,
	lang: any
}

const H1Block = ({productFined, lang}: Props) => {
	const [sizeWindow, setSizeWindow] = React.useState<number | null>(null);
	const {title1, title2, title3} = productFined
  const bananaRef = useRef(null);

  useEffect(() => {
    setSizeWindow(window.innerWidth);
    const handleResize = () => {
      setSizeWindow(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline();

    if (sizeWindow !== null) {
      timeline.to(`.${s.banana}`, { right: 0, rotate: -720, duration: 1 })
        .to(`.${s.h1_1}`, { left: 0, duration: 0.5 })
        .to(`.${s.h1_2}`, { right: 0, duration: 0.5 })
        .to(`.${s.h1_3}`, { left: 0, duration: 0.5 })
        .to(`.${s.banana_2}`, { top: sizeWindow <= 560 ? "60vw" : "285", opacity: 1, duration: 1 })
        .to(`.${s.banana_3}`, {
          top: sizeWindow <= 560 ? "auto" : "430", opacity: 1, duration: 1
        });

      ScrollTrigger.create({
        trigger: bananaRef.current,
        start: 'top 100%',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          let scrollTop = self.scroll();
          scrollTop = sizeWindow <= 560 ? Math.min(Math.max(scrollTop, 50), 780) : Math.min(Math.max(scrollTop, 50), 435);
          gsap.to(bananaRef.current, { height: sizeWindow <= 560 ? scrollTop : undefined, top: sizeWindow > 560 ? scrollTop : undefined, duration: 0.5 });
        }
      });
    }
  }, [sizeWindow]);

  return (
    <div className={s.h1Block}>
      <SelectButtons lang={lang} />
		  <div className={cn("", s.row)}>
		  {sizeWindow !== null && sizeWindow <= 992 ? (
            <div className={s.h1block_content}>
              <h1 className={s.h1}>
                <span className={s.h1_1}>{title1}</span>
                <span className={s.h1_2}>{title2} </span>
                <span className={s.h1_3}>{title3}</span>
              </h1>
              <div className={s.descr}>1 цукерка - 8г</div>
              <div className={s.bb}>
                <Link className={s.button} href="#">ПРИДБАТИ</Link>
              </div>
					  </div>
          ) : null}
			  <div className={s.h1_conte}>
				  <div className={s.h1_pic}>
          <Image className={s.banana} src={baban} alt="baban" width={480} height={480} />
          <div className={s.banana_2}>
            <Image src={banana_2} alt="banana_2" width={406} height={330} />
          </div>
          <div ref={ bananaRef } className={s.banana_3}>
						  {sizeWindow !== null && sizeWindow <= 580 ? (
				<Image className={s.banana_3_img} src={banana_3_mob} alt="banana_3" width={31} height={1064} />			  
			): <Image className={s.banana_3_img} src={banana_3} alt="banana_3" width={31} height={502} />}
            
					  </div>
					  </div>
				  {sizeWindow !== null && sizeWindow <= 992 ? (
            <div className={s.h1block_content2}>
              <H1BlockDescription />
					  </div>
          ) : null}
        </div>
        
          {sizeWindow !== null && sizeWindow > 992 ? (
            <div className={s.h1block_content}>
              <h1 className={s.h1}>
                <span className={s.h1_1}>{title1}</span>
                <span className={s.h1_2}>{title2} </span>
                <span className={s.h1_3}>{title3}</span>
              </h1>
              <div className={s.descr}>1 цукерка - 8г</div>
              <div className={s.bb}>
                <Link className={s.button} href="#">ПРИДБАТИ</Link>
              </div>
					  <H1BlockDescription />
					  </div>
          ) : null}
        
      </div>
    </div>
  );
};

export default H1Block;
