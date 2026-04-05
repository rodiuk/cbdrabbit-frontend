import Link from "next/link";
import Image from "next/image";
import { Locale } from "../../../i18n.config";
import { Footer } from "@/components/layout/Footer/Footer";
import { HeaderLocales } from "@/interfaces/locales.interface";

import cn from "clsx";
import s from "./page.module.css";

import iconRubbit from "/public/img/last.jpg";
import { Header } from "../layout/Header/Header";
import { getDictionary } from "@/libs/18n/getDictionary";

interface INotFoundPageProps {
  headerLocales: HeaderLocales;
  lang: Locale;
}

export default async function NotFoundPage({
  headerLocales,
  lang,
}: INotFoundPageProps) {
  const page = (await getDictionary(lang)).informationalPages.notFound;

  return (
    <>
      <Header lang={lang} />

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
      <Footer lang={lang} titles={headerLocales.titles} />
    </>
  );
}
