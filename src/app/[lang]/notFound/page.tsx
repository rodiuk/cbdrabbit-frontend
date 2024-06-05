import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import Image from "next/image";

import iconRubbit from "/public/img/last.jpg";
import Link from "next/link";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/notfound`, 
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default function NotFound() {
  return (
    <>
      <main className={cn("container", s.main)}>
			  <div className={s.wrap}>
			  <div className={s.img}>
					  <Image src={iconRubbit} alt="iconRubbit" width={256} height={256} />
				  </div>
          <div className={s.block}>
            <p>
			Це твій останній шанс. Далі вже не буде вороття...
					  </p>
					  <p>Вибереш червону цукерку - залишишся в дивокраї, <br /> вибереш жовту - те ж саме, але бананова</p>
				  </div>
				  <Link href="/" className={s.button}>Піти за кроликом</Link>
			  </div>
			  <div className={s.bot}><span className={s.bold}>404.</span> Сторінки не існує. А що взагалі реально?</div>
      </main>
      <Footer />
    </>
  );
}
