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

import banan1 from "/public/img/classic-candy.webp";
import banana1_2 from "/public/img/banana1_2.svg";
import banana1_3 from "/public/img/banana1_3.svg";
import banana1_3_mob from "/public/img/banana1_3_mob.svg";
import banan2 from "/public/img/banana-candy.webp";
import banana2_2 from "/public/img/banana2_2.svg";
import banana2_3 from "/public/img/banana2_3.svg";
import banana2_3_mob from "/public/img/banana2_3_mob.svg";
import banana3_2 from "/public/img/banana3_2.svg";
import banana3_3 from "/public/img/banana3_3.svg";
import banana3_3_mob from "/public/img/banana3_3_mob.svg";
import matcha1 from "/public/img/matcha1.webp";
import coffee1 from "/public/img/coffee-candy.webp";

import h1d1 from "/public/img/classic-ingredient-1.webp";
import h1d2 from "/public/img/classic-ingredient-2.webp";
import h1d3 from "/public/img/matcha-ingredient-4.webp";
import h2d1 from "/public/img/banana-ingredient-2.webp";
import h2d2 from "/public/img/banana-ingredient-1.webp";
import h2d3 from "/public/img/matcha-ingredient-4.webp";
import h3d1 from "/public/img/matcha-ingredient-1.webp";
import h3d2 from "/public/img/matcha-ingredient-2.webp";
import h3d3 from "/public/img/matcha-ingredient-3.webp";
import h3d4 from "/public/img/matcha-ingredient-4.webp";
import h4d1 from "/public/img/coffee-ingredient-1.webp";
import h4d2 from "/public/img/coffee-ingredient-2.webp";
import h4d3 from "/public/img/coffee-ingredient-3.webp";
import { ILandingsPictures } from "@/interfaces/lending.interface";
import { Slider } from "@/components/Slider/Slider";
import { SplideSlider } from "@/components/SplideSlider/SplideSlider";
import NotFoundPage from "@/components/NotFoundPage/page";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params?.["landId"]}`,
      languages: {
        en: `/en/${params?.["landId"]}`,
        uk: `/uk/${params?.["landId"]}`,
      },
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
    title1: "Calmberry",
    title2: ``,
    title3: "",
    image1: banan1,
    image2: banana1_2,
    image3: banana1_3,
    image3_mob: banana1_3_mob,
    description: [
      {
        id: 1,
        descr: "Бельгійський веганський чорний шоколад",
        image: h1d1,
      },
      {
        id: 2,
        descr: "Сублімована полуниця",
        image: h1d2,
      },
      {
        id: 3,
        descr: "50 мг CBD Ізолят канабідіолу",
        image: h1d3,
      },
    ],
    accordeon: [],
  },
  {
    id: "banana",
    title1: "Banana",
    title2: "Chill",
    title3: "",
    image1: banan2,
    image2: banana2_2,
    image3: banana2_3,
    image3_mob: banana2_3_mob,
    description: [
      {
        id: 1,
        descr: "Сублімовані банани",
        image: h2d1,
      },
      {
        id: 2,
        descr: "Крафтовий білий шоколад на кокосовому молоці",
        image: h2d2,
      },
      {
        id: 3,
        descr: "50 мг CBD Ізолят канабідіолу",
        image: h2d3,
      },
    ],
    accordeon: [],
  },
  {
    id: "matcha",
    title1: "БІЛИЙ ШОКОЛАД",
    title2: "МАТЧА & МАЛИНА",
    title3: `50mg\u00A0CBD`,
    image1: matcha1,
    image2: banana3_2,
    image3: banana3_3,
    image3_mob: banana3_3_mob,
    description: [
      {
        id: 1,
        descr: "Крафтовий білий шоколад на кокосово-мигдалевому молоці",
        image: h3d1,
      },
      {
        id: 2,
        descr: "Преміальна матча від matchati.com",
        image: h3d2,
      },
      {
        id: 3,
        descr: "Сублімована малина",
        image: h3d3,
      },
      {
        id: 4,
        descr: "50 мг CBD Ізолят канабідіолу",
        image: h3d4,
      },
    ],
    accordeon: [],
  },
  {
    id: "coffee",
    title1: "Coffee",
    title2: "Break",
    title3: "",
    image1: coffee1,
    image2: banana1_2,
    image3: banana1_3,
    image3_mob: banana1_3_mob,
    description: [
      {
        id: 1,
        descr: "Бельгійський веганський чорний шоколад",
        image: h4d1,
      },
      {
        id: 2,
        descr: "Кава від CafeBoutique з цейлонською корицею",
        image: h4d2,
      },
      {
        id: 3,
        descr: "Мигдалеве молоко",
        image: h4d3,
      },
      {
        id: 4,
        descr: "50 мг CBD Ізолят канабідіолу",
        image: h3d4,
      },
    ],
    accordeon: [],
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
    return <NotFoundPage headerLocales={header} lang={params.lang} />;
  }

  return (
    <>
      <Header lang={params.lang} stylesName={s.noAfter} />
      <main
        className={cn("", s.main, {
          [s.pink]: params.lendId === "classic",
          [s.yellow]: params.lendId === "banana",
          [s.green]: params.lendId === "matcha",
          [s.brown]: params.lendId === "coffee",
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
        <Accordeon lendId={lendId} content={productFined.accordeon} />
        <SplideSlider />
        {/* <Slider /> */}
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
