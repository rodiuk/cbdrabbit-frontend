import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Header } from "@/components/layout/Header/Header";

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
      <main className={cn("container", s.main)}>
        
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}