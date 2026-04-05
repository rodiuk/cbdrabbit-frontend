import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/contact`,
      languages: {
        en: `/en/contact`,
        uk: `/uk/contact`,
      },
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function CheckoutInfo({ params }: any) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;
  const page = dict.informationalPages.checkoutInfo;
  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          {page.blocks.map(block => (
            <div key={block.title} className={s.block}>
              <div className={s.ttl}>{block.title}</div>
              {block.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
