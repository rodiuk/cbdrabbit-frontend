"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cn from "clsx";

import s from "./H1Block.module.css";
import SelectButtons from "../SelectButtons/SelectButtons";
import Image from "next/image";
import type { CSSProperties } from "react";

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
  const isClassic = imagesFined.id === "classic";
  const isBanana = imagesFined.id === "banana";
  const isMatcha = imagesFined.id === "matcha";
  const isCoffee = imagesFined.id === "coffee";
  const isStyledVariant = isMatcha || isClassic || isBanana || isCoffee;
  const heroImageSize = isStyledVariant ? 430 : 480;
  const classicTags =
    lang === "uk"
      ? [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "vegan" },
        ]
      : [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "vegan" },
        ];
  const matchaTags =
    lang === "uk"
      ? [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "Vegan" },
          { id: "sugar-free", iconSrc: "/img/badge-sugar-free.svg", iconAlt: "Sugar free", label: "Sugar free" },
        ]
      : [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "Vegan" },
          { id: "sugar-free", iconSrc: "/img/badge-sugar-free.svg", iconAlt: "Sugar free", label: "Sugar free" },
        ];
  const bananaTags =
    lang === "uk"
      ? [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "Vegan" },
          { id: "sugar-free", iconSrc: "/img/badge-sugar-free.svg", iconAlt: "Sugar free", label: "Sugar free" },
        ]
      : [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "Vegan" },
          { id: "sugar-free", iconSrc: "/img/badge-sugar-free.svg", iconAlt: "Sugar free", label: "Sugar free" },
        ];
  const coffeeTags =
    lang === "uk"
      ? [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "Vegan" },
        ]
      : [
          { id: "cbd", iconSrc: "/img/badge-cbd.svg", iconAlt: "CBD", primary: "50mg", secondary: "CBD" },
          { id: "vegan", iconSrc: "/img/badge-vegan.svg", iconAlt: "vegan", label: "Vegan" },
        ];

  const styledTags = isClassic
    ? classicTags
    : isBanana
      ? bananaTags
      : isCoffee
        ? coffeeTags
        : matchaTags;

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
    <div
        className={cn(s.h1Block, {
        [s.matchaBlock]: isMatcha,
        [s.classicBlock]: isClassic,
        [s.bananaBlock]: isBanana,
        [s.coffeeBlock]: isCoffee,
      })}
    >
      <SelectButtons lang={lang} langId={productFined.id} />
      <div
          className={cn("", s.row, {
          [s.matchaRow]: isMatcha,
          [s.classicRow]: isClassic,
          [s.bananaRow]: isBanana,
          [s.coffeeRow]: isCoffee,
        })}
      >
        {sizeWindow !== null && sizeWindow <= 992 ? (
          <div
              className={cn(s.h1block_content, {
              [s.matchaContent]: isMatcha,
              [s.classicContent]: isClassic,
              [s.bananaContent]: isBanana,
              [s.coffeeContent]: isCoffee,
            })}
          >
            {isStyledVariant ? (
              <div
                className={cn(s.matchaIcon, {
                  [s.classicIcon]: isClassic,
                  [s.bananaIcon]: isBanana,
                  [s.coffeeIcon]: isCoffee,
                })}
              >
                {isClassic ? "🍓" : isBanana ? "🍌" : isCoffee ? "☕" : "🍵"}
              </div>
            ) : null}
            <h1
              className={cn(s.h1, {
                [s.matchaH1]: isMatcha,
                [s.classicH1]: isClassic,
                [s.bananaH1]: isBanana,
                [s.coffeeH1]: isCoffee,
              })}
            >
              {title1 ? <span className={s.h1_1}>{title1}</span> : null}
              {title2 ? <span className={s.h1_2}>{title2}</span> : null}
              {title3 ? <span className={s.h1_3}>{title3}</span> : null}
            </h1>
            <div
              className={cn(s.descr, {
                [s.matchaDescr]: isMatcha,
                [s.classicDescr]: isClassic,
                [s.bananaDescr]: isBanana,
                [s.coffeeDescr]: isCoffee,
              })}
            >
              {productFined.weightCandy}
            </div>
            {isStyledVariant ? (
              <div className={s.badges}>
                {styledTags.map(tag => (
                  <span
                    className={cn(s.badge, {
                      [s.classicBadge]: isClassic,
                      [s.matchaBadge]: isMatcha,
                      [s.bananaBadge]: isBanana,
                      [s.coffeeBadge]: isCoffee,
                    })}
                    key={tag.id}
                  >
                    <span
                      aria-hidden="true"
                      className={s.badgeIcon}
                      style={
                        {
                          "--icon-url": `url(${tag.iconSrc})`,
                          "--icon-width": `${tag.id === "vegan" ? 14 : 20}px`,
                          "--icon-height": `${tag.id === "vegan" ? 10 : 20}px`,
                        } as CSSProperties
                      }
                    />
                    {"label" in tag ? (
                      tag.label
                    ) : (
                      <>
                        <span className={s.badgePrimary}>{tag.primary}</span>
                        <span className={s.badgeSecondary}>{tag.secondary}</span>
                      </>
                    )}
                  </span>
                ))}
              </div>
            ) : null}
            <div className={s.bb}>
              <Link
                className={cn(s.button, {
                  [s.green]: isMatcha,
                  [s.pink]: isClassic,
                  [s.yellowButton]: isBanana,
                  [s.brownButton]: isCoffee,
                })}
                href={`/${lang}`}
              >
                {textButton}
              </Link>
            </div>
          </div>
        ) : null}
        <div
          className={cn(s.h1_conte, {
            [s.matchaConte]: isMatcha,
            [s.classicConte]: isClassic,
          })}
        >
          <div
            className={cn(s.h1_pic, {
              [s.matchaPic]: isMatcha,
              [s.classicPic]: isClassic,
              [s.bananaPic]: isBanana,
              [s.coffeePic]: isCoffee,
            })}
          >
            <Image
              className={cn(s.banana, {
                [s.matchaCandy]: isMatcha,
                [s.classicCandy]: isClassic,
                [s.bananaCandy]: isBanana,
                [s.coffeeCandy]: isCoffee,
              })}
              src={image1}
              alt="baban"
              width={heroImageSize}
              height={heroImageSize}
            />
            <div
              className={cn(s.banana_2, {
                [s.matchaShadow]: isMatcha,
                [s.classicShadow]: isClassic,
                [s.bananaShadow]: isBanana,
                [s.coffeeShadow]: isCoffee,
              })}
            >
              <Image src={image2} alt="banana_2" width={406} height={330} />
            </div>
            <div
              ref={bananaRef}
              className={cn(s.banana_3, {
                [s.matchaDrips]: isMatcha,
                [s.classicDrips]: isClassic,
                [s.bananaDrips]: isBanana,
                [s.coffeeDrips]: isCoffee,
              })}
            >
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
            <div
              className={cn(s.h1block_content2, {
                [s.matchaContent2]: isMatcha,
                [s.classicContent2]: isClassic,
                [s.bananaContent2]: isBanana,
                [s.coffeeContent2]: isCoffee,
              })}
            >
              <H1BlockDescription
                productFinedDescr={productFined.description}
                productFinedImages={imagesFined.description}
                variantId={imagesFined.id}
              />
            </div>
          ) : null}
        </div>

        {sizeWindow !== null && sizeWindow > 992 ? (
          <div
            className={cn(s.h1block_content, {
              [s.matchaContent]: isMatcha,
              [s.classicContent]: isClassic,
              [s.bananaContent]: isBanana,
              [s.coffeeContent]: isCoffee,
            })}
          >
            {isStyledVariant ? (
              <div
                className={cn(s.matchaIcon, {
                  [s.classicIcon]: isClassic,
                  [s.bananaIcon]: isBanana,
                  [s.coffeeIcon]: isCoffee,
                })}
              >
                {isClassic ? "🍓" : isBanana ? "🍌" : isCoffee ? "☕" : "🍵"}
              </div>
            ) : null}
            <h1
              className={cn(s.h1, {
                [s.matchaH1]: isMatcha,
                [s.classicH1]: isClassic,
                [s.bananaH1]: isBanana,
                [s.coffeeH1]: isCoffee,
              })}
            >
              {title1 ? <span className={s.h1_1}>{title1}</span> : null}
              {title2 ? <span className={s.h1_2}>{title2}</span> : null}
              {title3 ? <span className={s.h1_3}>{title3}</span> : null}
            </h1>
            <div
              className={cn(s.descr, {
                [s.matchaDescr]: isMatcha,
                [s.classicDescr]: isClassic,
                [s.bananaDescr]: isBanana,
                [s.coffeeDescr]: isCoffee,
              })}
            >
              {productFined.weightCandy}
            </div>
            {isStyledVariant ? (
              <div className={s.badges}>
                {styledTags.map(tag => (
                  <span
                    className={cn(s.badge, {
                      [s.classicBadge]: isClassic,
                      [s.matchaBadge]: isMatcha,
                      [s.bananaBadge]: isBanana,
                      [s.coffeeBadge]: isCoffee,
                    })}
                    key={tag.id}
                  >
                    <span
                      aria-hidden="true"
                      className={s.badgeIcon}
                      style={
                        {
                          "--icon-url": `url(${tag.iconSrc})`,
                          "--icon-width": `${tag.id === "vegan" ? 14 : 20}px`,
                          "--icon-height": `${tag.id === "vegan" ? 10 : 20}px`,
                        } as CSSProperties
                      }
                    />
                    {"label" in tag ? (
                      tag.label
                    ) : (
                      <>
                        <span className={s.badgePrimary}>{tag.primary}</span>
                        <span className={s.badgeSecondary}>{tag.secondary}</span>
                      </>
                    )}
                  </span>
                ))}
              </div>
            ) : null}
            <div className={s.bb}>
              <Link
                className={cn(s.button, {
                  [s.green]: isMatcha,
                  [s.pink]: isClassic,
                  [s.yellowButton]: isBanana,
                  [s.brownButton]: isCoffee,
                })}
                href={`/${lang}`}
              >
                {textButton}
              </Link>
            </div>
            {!isStyledVariant ? (
              <H1BlockDescription
                productFinedDescr={productFined.description}
                productFinedImages={imagesFined.description}
                variantId={imagesFined.id}
              />
            ) : null}
          </div>
        ) : null}
      </div>
      {isStyledVariant && sizeWindow !== null && sizeWindow > 992 ? (
        <div
          className={cn({
            [s.matchaIngredientsRow]: isMatcha,
            [s.classicIngredientsRow]: isClassic,
            [s.bananaIngredientsRow]: isBanana,
            [s.coffeeIngredientsRow]: isCoffee,
          })}
        >
          <H1BlockDescription
            productFinedDescr={productFined.description}
            productFinedImages={imagesFined.description}
            variantId={imagesFined.id}
          />
        </div>
      ) : null}
    </div>
  );
};

export default H1Block;
