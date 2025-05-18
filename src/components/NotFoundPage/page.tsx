import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "../../../i18n.config";
import { Footer } from "@/components/layout/Footer/Footer";
import { HeaderLocales } from "@/interfaces/locales.interface";

import cn from "clsx";
import s from "./page.module.css";

import iconRubbit from "/public/img/last.jpg";
import { Header } from "../layout/Header/Header";

interface INotFoundPageProps {
  headerLocales: HeaderLocales;
  lang: Locale;
}

export default function NotFoundPage({
  headerLocales,
  lang,
}: INotFoundPageProps) {
  return (
    <>
      <Header lang={lang} />

      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.img}>
            <Image src={iconRubbit} alt="iconRubbit" width={256} height={256} />
          </div>
          <div className={s.block}>
            <p>Це твій останній шанс. Далі вже не буде вороття...</p>
            <p>
              Вибереш червону цукерку - залишишся в дивокраї, <br /> вибереш
              жовту - те ж саме, але бананова
            </p>
          </div>
          <Link href="/" className={s.button}>
            Піти за кроликом
          </Link>
        </div>
        <div className={s.bot}>
          <span className={s.bold}>404.</span> Сторінки не існує. А що взагалі
          реально?
        </div>
      </main>
      <Footer lang={lang} titles={headerLocales.titles} />
    </>
  );
}
