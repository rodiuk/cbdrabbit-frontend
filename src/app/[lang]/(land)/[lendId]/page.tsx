import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Header } from "@/components/layout/Header/Header";
import H1Block from "@/components/Landing/H1Block/H1Block";
import Description2 from "@/components/Landing/Description2/Description2";
import Accordeon from "@/components/Landing/Accordeon/Accordeon";
import Buttons from "@/components/Landing/Buttons/Buttons";

import banan1 from "/public/img/banan1.png";
import banana1_2 from "/public/img/banana1_2.svg";
import banana1_3 from "/public/img/banana1_3.svg";
import banana1_3_mob from "/public/img/banana1_3_mob.svg";
import banan2 from "/public/img/banan2.png";
import banana2_2 from "/public/img/banana2_2.svg";
import banana2_3 from "/public/img/banana2_3.svg";
import banana2_3_mob from "/public/img/banana2_3_mob.svg";
import banan3 from "/public/img/banan3.png";
import banana3_2 from "/public/img/banana3_2.svg";
import banana3_3 from "/public/img/banana3_3.svg";
import banana3_3_mob from "/public/img/banana3_3_mob.svg";

import h1d1 from "/public/img/h1d1.jpg";
import h1d2 from "/public/img/h1d2.jpg";
import h1d3 from "/public/img/h1d3.jpg";
import h2d1 from "/public/img/h2d1.jpg";
import h2d2 from "/public/img/h2d2.jpg";
import h2d3 from "/public/img/h2d3.jpg";
import h3d1 from "/public/img/h3d1.jpg";
import h3d2 from "/public/img/h3d2.jpg";
import h3d3 from "/public/img/h3d3.jpg";
import h3d4 from "/public/img/h3d4.jpg";
import { StaticImageData } from "next/image";
import { ILandingsPictures } from "@/interfaces/lending.interface";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/landingall`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

const landingsPictures: ILandingsPictures[] = [
  {
    id: "classic",
    title1: "ЧОРНИЙ ШОКОЛАД",
    title2: `ПОЛУНИЦЯ 50mg\u00A0CBD`,
    title3: "",
    image1: banan1,
    image2: banana1_2,
    image3: banana1_3,
    image3_mob: banana1_3_mob,
    description: [
      {
        id: 1,
        descr: "Бельгійський чорний шоколад",
        image: h1d1,
      },
      {
        id: 2,
        descr: "Українські сублімовані полуниці",
        image: h1d2,
      },
      {
        id: 3,
        descr: "50 мг СBD Ізолят канабідіолу",
        image: h1d3,
      },
    ],
  },
  {
    id: "banana",
    title1: "БІЛИЙ ШОКОЛАД",
    title2: "КОКОСОВЕ МОЛОКО",
    title3: `БАНАН 50mg\u00A0CBD`,
    image1: banan2,
    image2: banana2_2,
    image3: banana2_3,
    image3_mob: banana2_3_mob,
    description: [
      {
        id: 1,
        descr: "Крафтовий білий шоколад на кокосовому молоці",
        image: h2d1,
      },
      {
        id: 2,
        descr: "Cублімовані банани",
        image: h2d2,
      },
      {
        id: 3,
        descr: "50 мг СBD Ізолят канабідіолу",
        image: h2d3,
      },
    ],
  },
  {
    id: "matcha",
    title1: "БІЛИЙ ШОКОЛАД",
    title2: "КОКОСОВЕ МОЛОКО",
    title3: `МАНГО МАТЧА 50mg\u00A0CBD`,
    image1: banan3,
    image2: banana3_2,
    image3: banana3_3,
    image3_mob: banana3_3_mob,
    description: [
      {
        id: 1,
        descr: "Крафтовий білий шоколад на кокосовому молоці",
        image: h3d1,
      },
      {
        id: 2,
        descr: "Матча Японський тонізуючий чай",
        image: h3d2,
      },
      {
        id: 3,
        descr: "Cублімований манго",
        image: h3d3,
      },
      {
        id: 4,
        descr: "50 мг СBD Ізолят канабідіолу",
        image: h3d4,
      },
    ],
  },
];

export default async function Landing({ params }: IMainPageProps) {
  const { lang } = params;
  const lendId = params.lendId;
  const dict = await getDictionary(params.lang);

  const { header, landings } = dict;
  const productFined = landings.landing.find(
    (product: any) => product.id === lendId
  );
  const imagesFined = landingsPictures.find(
    (product: any) => product.id === lendId
  );
  if (!productFined || !imagesFined) {
    return;
  }

  return (
    <>
      <Header lang={params.lang} stylesName={s.noAfter} />
      <main
        className={cn("", s.main, {
          [s.pink]: params.lendId === "classic",
          [s.yellow]: params.lendId === "banana",
          [s.green]: params.lendId === "matcha",
        })}
      >
        <div className={s.container}>
          <H1Block
            productFined={productFined}
            imagesFined={imagesFined}
					  lang={params.lang}
					  textButton={landings.secondButton}

          />
        </div>
        <Description2 lendId={lendId} texts={landings.about} />
        <Accordeon lendId={lendId} content={landings.accordeon} />

        <Buttons
          button1Text={landings.firstButton}
				  button2Text={landings.secondButton}
				  lendId={lendId}
        />
      </main> 
      <Footer lang={lang} titles={header.titles} idLand={params.lendId} />
    </>
  );
}
