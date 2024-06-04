import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";

import success from "/public/img/success.svg";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/success`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default function Success() {
  return (
    <main className={cn("main", s.main)}>
      <div className="container">
        <div className={s.wrap}>
          <div className={s.content}>
            <div className={s.content_wrap}>
              <div className={s.ttl}>Успішно оплачено!</div>
              <div className={s.img}>
                <Image src={success} alt="success" width={256} height={256} />
              </div>
              <div className={s.block}>
                <p className={s.text}>Ваш номер замовлення:</p>
                <p className={s.num}>00124456</p>
              </div>
              <div className={s.bot_text}>
                Цукерочки скоро поскачуть до вас 🐇
              </div>
              <div className="bb">
                <Link href="/" className={s.button}>
                  Чудово!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
