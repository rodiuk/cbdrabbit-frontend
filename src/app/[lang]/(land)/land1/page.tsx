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
import Link from "next/link";

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

export default async function Landingall({ params }: any) {
	const { lang } = params;
	const dict = await getDictionary(params.lang);
	const {header} = dict
	const landings = [
		{id: 1, title1: "БІЛИЙ ШОКОЛАД", title2: "КОКОСОВЕ МОЛОКО", title3: "БАНАН 50mg CBD",}
	]
  return (
	  <>
		  <Header lang={params.lang} stylesName="noAfter" />
		  <main className={cn("container", s.main)}>
        <div className={s.wrapper}>
          sdBlog has: {landings?.length}
          <ul>
            {landings.map(item => {
              return (
                <li key={item.id} className={s.item}>
                  <div className="wrap_item">
                    <div className={s.date}>{item.title1}</div>
                    <div className={s.ttl}>
                      <Link href={`/${lang}/land1/${item.id}`}>
                        {item.title1}
                      </Link>
                    </div>
                    <div className={s.description}>{item.title2}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
 