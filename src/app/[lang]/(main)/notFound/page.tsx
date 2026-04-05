import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import Image from "next/image";

import iconRubbit from "/public/img/last.jpg";
import Link from "next/link";
import { getDictionary } from "@/libs/18n/getDictionary";

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

export default async function NotFound({ params }: any) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;
  const page = dict.informationalPages.notFound;

  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.img}>
            <Image src={iconRubbit} alt="iconRubbit" width={256} height={256} />
          </div>
          <div className={s.block}>
            <p>{page.title}</p>
            <p>{page.subtitle}</p>
          </div>
          <Link href="/" className={s.button}>
            {page.button}
          </Link>
        </div>
        <div className={s.bot}>
          <span className={s.bold}>404.</span> {page.footer}
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
