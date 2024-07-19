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
      canonical: `/about`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function About({ params }: any) {
	const { lang } = params;
	const dict = await getDictionary(params.lang);
	const {header} = dict
	
  return (
	  <>
		  <Header lang={params.lang} stylesName="noAfter" />
		  <main className={cn("", s.main)}>
			  <div className={s.container}>
			  <H1Block />
			  </div>
			  <Description2 />
			  <Accordeon />

			  <Buttons />
			  
        
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
 