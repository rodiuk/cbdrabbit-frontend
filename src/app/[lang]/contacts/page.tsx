import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import Link from "next/link";

import { InstaWhiteIcon } from "@/components/icons/InstaWhiteIcon";
import TelegramGreenIcon from "@/components/icons/TelegramGreenIcon";

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

export default function Contacts() {
  return (
    <>
		  <main className={cn("container", s.main)}>
			  <div className={s.wrap}>
				  <div className="ttl">
				  Бажаєте залишити відгук, поділитися ідеєю, поспілкуватися про цукерки?
				  </div>
				  <div className={s.ttl2}>Запрошуємо в наш інстаграм 🐇</div>
				  <div className={s.linl1}><Link href="https://www.instagram.com/cbdrabbit" target="_blank"><InstaWhiteIcon iconStyle={s.gree_icon} />CBDrabbit</Link></div>
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
