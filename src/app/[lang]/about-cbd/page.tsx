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
      canonical: `/about`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function AboutCBD({ params }: any) {
	const { lang } = params;
	const dict = await getDictionary(params.lang);
	const {header} = dict
  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.title}>8 питань про CBD</div>
          <div className={s.block}>
            <div className={s.ttl}>1. Загальні положення</div>
            <p>
              1.1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу
              України, є публічною офертою Продавця, адресованою невизначеному
              колу осіб, незалежно від їхнього статусу (фізична особа, юридична
              особа, фізична особа-підприємець), укласти договір купівлі-продажу
              товару, представленого на сайті www.cbdrabbit.shop
            </p>
          </div>
          <div className={s.block}>
            <div className={s.ttl}>1. Загальні положення</div>
            <p>
              1.1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу
              України, є публічною офертою Продавця, адресованою невизначеному
              колу осіб, незалежно від їхнього статусу (фізична особа, юридична
              особа, фізична особа-підприємець), укласти договір купівлі-продажу
              товару, представленого на сайті www.cbdrabbit.shop
            </p>
          </div>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
