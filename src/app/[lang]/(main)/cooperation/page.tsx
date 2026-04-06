import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { buildPageMetadata } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import Link from "next/link";

import okIcon from "/public/img/ok.jpg";
import TelegramGreenIcon from "@/components/icons/TelegramGreenIcon";
import Image from "next/image";
import { getDictionary } from "@/libs/18n/getDictionary";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const page = dict.informationalPages.cooperation;

  return buildPageMetadata({
    lang: params.lang,
    canonical: "/cooperation",
    title: dict.header.titles.cooperation,
    description: page.intro[0],
    imageSubtitle: page.telegramTitle,
  });
}

export default async function Cooperation({ params }: any) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;
  const page = dict.informationalPages.cooperation;
  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.img}>
            <Image src={okIcon} width={160} height={160} alt="ok" />
          </div>
          <div className={s.ttl2}>
            {page.intro.map(item => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className={s.tg_block}>
            <div className={s.tt}>{page.telegramTitle}</div>
            <div className={s.linl1}>
              <Link href="https://t.me/cbdrabbit" target="_blank">
                <TelegramGreenIcon iconStyle={s.gree_icon} />
                CBDrabbit
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
