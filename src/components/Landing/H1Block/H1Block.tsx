"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cn from "clsx";

import s from "./H1Block.module.css";
import SelectButtons from "../SelectButtons/SelectButtons";
import Image from "next/image";

import Link from "next/link";
import H1BlockDescription from "../H1BlockDescription/H1BlockDescription";
import { Locale } from "../../../../i18n.config";
import { ILandingsPictures } from "@/interfaces/lending.interface";

interface IDescriptionItem {
  id: number;
  descr: string;
}
interface IProductFined {
  id: string;
  title1: string;
  title2: string;
  title3: string;
  description: IDescriptionItem[];
  weightCandy: string;
}

interface Props {
  productFined: IProductFined;
  lang: Locale;
	imagesFined: ILandingsPictures;
	textButton: string;
}

const H1Block = ({ productFined, lang, imagesFined, textButton }: Props) => {
  
  const [sizeWindow, setSizeWindow] = React.useState<number | null>(null);
  const { title1, title2, title3, weightCandy } = productFined;
  const { image1, image2, image3, image3_mob } = imagesFined;
  const bananaRef = useRef(null);

  useEffect(() => {
    setSizeWindow(window.innerWidth);
    const handleResize = () => {
      setSizeWindow(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline();

    if (sizeWindow !== null) {
      timeline
        .to(`.${s.banana}`, { right: 0, rotate: -720, duration: 1 })
        .to(`.${s.h1_1}`, { left: 0, duration: 0.5 })
        .to(`.${s.h1_2}`, { right: 0, duration: 0.5 })
        .to(`.${s.h1_3}`, { left: 0, duration: 0.5 })
        .to(`.${s.banana_2}`, {
          top: sizeWindow <= 560 ? "60vw" : "285",
          opacity: 1,
          duration: 1,
        })
        .to(`.${s.banana_3}`, {
          top: sizeWindow <= 580 ? "30" : "430",
          opacity: 1,
          duration: 1,
        });

      if (sizeWindow > 580) {
        ScrollTrigger.create({
          trigger: bananaRef.current,
          start: "top 100%",
          end: "bottom top",
          scrub: true,
          onUpdate: self => {
            let scrollTop = self.scroll();

            scrollTop = Math.min(Math.max(scrollTop, 50), 435);
            gsap.to(bananaRef.current, {
              height: undefined,
              top: scrollTop,
              duration: 0.5,
            });
          },
        });
      }

      if (sizeWindow <= 580) {
        ScrollTrigger.create({
          trigger: bananaRef.current,
          start: "top center", // Начало анимации, когда элемент находится в середине экрана
          end: "+=1200", // Конец анимации, когда нижняя часть элемента достигает верха экрана
          scrub: true,
          onUpdate: self => {
            // Рассчитываем высоту в зависимости от прокрутки
            let scrollTop = self.progress * (1464 - 0); // Прокрученный процент умножаем на разницу между максимальной и минимальной высотой
            scrollTop = Math.min(Math.max(scrollTop, 0), 1464); // Ограничиваем высоту в пределах 0 и 1064

            gsap.to(bananaRef.current, { height: scrollTop });
          },
        });
      }
    }
  }, [sizeWindow]);

  return (
    <div className={s.h1Block}>
      <SelectButtons lang={lang} langId={productFined.id} />
      <div className={cn("", s.row)}>
        {sizeWindow !== null && sizeWindow <= 992 ? (
          <div className={s.h1block_content}>
            <h1 className={s.h1}>
              <span className={s.h1_1}>{title1}</span>
              <span className={s.h1_2}>{title2} </span>
              <span className={s.h1_3}>{title3}</span>
            </h1>
            <div className={s.descr}>{weightCandy}</div>
            <div className={s.bb}>
						  <Link className={cn(s.button, {
							  [s.pink]: productFined.id === "classic",
							  [s.green]: productFined.id === "matcha",
						  })} href={`${lang}`}>
                {textButton}
              </Link>
            </div>
          </div>
        ) : null}
        <div className={s.h1_conte}>
          <div className={s.h1_pic}>
            <Image
              className={s.banana}
              src={image1}
              alt="baban"
              width={480}
              height={480}
            />
            <div className={s.banana_2}>
              <Image src={image2} alt="banana_2" width={406} height={330} />
            </div>
            <div ref={bananaRef} className={s.banana_3}>
              {sizeWindow !== null && sizeWindow <= 580 ? (
                <Image
                  className={s.banana_3_img}
                  src={image3_mob}
                  alt="banana_3_mob"
                  width={31}
                  height={1064}
                />
              ) : (
                <Image
                  className={s.banana_3_img}
                  src={image3}
                  alt="banana_3"
                  width={31}
                  height={502}
                />
              )}
            </div>
          </div>
          {sizeWindow !== null && sizeWindow <= 992 ? (
            <div className={s.h1block_content2}>
              <H1BlockDescription
                productFinedDescr={productFined.description}
                productFinedImages={imagesFined.description}
              />
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
            <div className={s.descr}>{weightCandy}</div>
            <div className={s.bb}> 
						  <Link className={cn(s.button, {
				  [s.pink]: productFined.id === "classic",
				  [s.green]: productFined.id === "matcha",
			  })} href={`${lang}`}>
                {textButton}
              </Link>
            </div>
            <H1BlockDescription
              productFinedDescr={productFined.description}
              productFinedImages={imagesFined.description}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default H1Block;
