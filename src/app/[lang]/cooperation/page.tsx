import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import Link from "next/link";

import okIcon from "/public/img/ok.jpg";
import TelegramGreenIcon from "@/components/icons/TelegramGreenIcon";
import Image from "next/image";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/contact`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default function Cooperation() {
  return (
    <>
		  <main className={cn("container", s.main)}>
			  <div className={s.wrap}>
				  <div className={s.img}>
					  <Image src={okIcon} width={160} height={160} alt="ok" />
				  </div>
				  <div className={s.ttl2}>
					  <p>Ви заклад, кавʼярня, магазин чи івент?</p>
					  <p>Це чудово!</p>
					  <p>Наші цукерочки-зайчики дуже люблять нові місця 🐇</p>
				  </div>
				  <div className={s.tg_block}>
					  <div className={s.tt}>Щодо співпраці пишіть нам в телеграм 🤠</div>
					  <div className={s.linl1}><Link href="https://t.me/cbdrabbit" target="_blank"><TelegramGreenIcon iconStyle={s.gree_icon} />CBDrabbit</Link></div>
				  </div>
			  </div>
	  </main>
      <Footer />
    </>
  );
}
