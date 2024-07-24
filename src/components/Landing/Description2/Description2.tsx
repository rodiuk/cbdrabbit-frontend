"use client";
import React from "react";
import cn from "clsx";
import s from "./Description2.module.css";

import ic1 from "/public/img/lend-descr2-1.svg";
import ic2 from "/public/img/lend-descr2-2.svg";
import ic3 from "/public/img/lend-descr2-3.svg";

import bg1 from "/public/img/lend1-descr2-bg.svg";
import bg2 from "/public/img/lend2-descr2-bg.svg";
import bg3 from "/public/img/lend3-descr2-bg.svg";
import bg1_mobile from "/public/img/lend1-descr2-bg_mob.svg";
import bg2_mobile from "/public/img/lend2-descr2-bg_mob.svg";
import bg3_mobile from "/public/img/lend3-descr2-bg_mob.svg";

import Image from "next/image";

interface ITextsItem {
	id: string
	text1: string
	text2: string
}

interface Props {
  lendId: string;
  texts: ITextsItem[];
}

const Description2 = ({ lendId, texts }: Props) => {
  
  const [sizeWindow, setSizeWindow] = React.useState<number | null>(null);
  const [background, setBackground] = React.useState(bg1);
  React.useEffect(() => {
    setSizeWindow(window.innerWidth);
    const handleResize = () => {
      setSizeWindow(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (lendId === "1") {
      if (sizeWindow !== null && sizeWindow > 580) {
        setBackground(bg1);
      } else {
        setBackground(bg1_mobile);
      }
    } else if (lendId === "2") {
      if (sizeWindow !== null && sizeWindow > 580) {
        setBackground(bg2);
      } else {
        setBackground(bg2_mobile);
      }
    } else if (lendId === "3") {
      if (sizeWindow !== null && sizeWindow > 580) {
        setBackground(bg3);
      } else {
        setBackground(bg3_mobile);
      }
    }
  }, [sizeWindow, lendId]);

  const icons = [ic1, ic2, ic3];

  return (
    <div className={s.description}>
      <div className={s.img_lay}>
        <Image src={background} alt="pic" />
      </div>
      <div className={cn("container", s.description_container)}>
        {texts &&
          texts.map((item: any, i: number) => {
            return (
              <div className={s.item} key={i}>
                <div className={s.wrap}>
                  <div className={s.img}>
                    <Image src={icons[i]} width={160} height={160} alt="pic" />
                  </div>
                  <div className={s.ttl}>{item.text1}</div>
                  <div className={s.text}>{item.text2}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Description2;
