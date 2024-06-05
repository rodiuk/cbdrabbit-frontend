import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import Image from "next/image";

import erroeIcon from "/public/img/errorPage.jpg";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/errorPage`, 
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default function ErrorPage() {
  return (
    <>
      <main className={cn("container", s.main)}>
			  <div className={s.wrap}>
			  <div className={s.img}>
					  <Image src={erroeIcon} alt="iconRubbit" width={510} height={510} />
				  </div>
				  <div className={s.text}>
					  <p className={s.first}>Якась помилка 🙅</p>
					  <p className={s.two}>Спробуйте пізніше</p>
				  </div>
			  </div>
		 </main>
    </>
  );
}
