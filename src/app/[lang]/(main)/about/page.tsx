import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/land`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Land({ params }: any) {
	const { lang } = params;
	const dict = await getDictionary(params.lang);
	const {header} = dict
	
  return (
    <>
      <main className={cn("container", s.main)}>
        dgmgfsm
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
