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
 
const landings = [
	{ id: 1, title1: "ЧОРНИЙ ШОКОЛАД", title2: `ПОЛУНИЦЯ 50mg\u00A0CBD`, title3: "" },
	{ id: 2, title1: "БІЛИЙ ШОКОЛАД", title2: "КОКОСОВЕ МОЛОКО", title3: `БАНАН 50mg\u00A0CBD` },
	{ id: 3, title1: "БІЛИЙ ШОКОЛАД", title2: "КОКОСОВЕ МОЛОКО", title3: `МАНГО МАТЧА 50mg\u00A0CBD` }
  ];
  
export default async function Landing({ params }: any) {
	const { lang } = params;
	const dict = await getDictionary(params.lang);
	const { header } = dict
	const productFined = landings.find(product => product.id === Number(params.lendId))
	console.log(params.lendId)
  return (
	  <>
		  <Header lang={params.lang} stylesName={s.noAfter} />
		  <main className={cn("", s.main, {
			  [s.pink]: params.lendId === "1",
			  [s.yellow]: params.lendId === "2",
			  [s.green]: params.lendId === "3",
		  })}>
			  <div className={s.container}>
			  <H1Block productFined={productFined}  lang={params.lang} />
			  </div> 
			  <Description2 />
			  <Accordeon />

			  <Buttons />
			  
        
      </main>
      <Footer lang={lang} titles={header.titles} idLand={params.lendId} />
    </>
  );
}
 