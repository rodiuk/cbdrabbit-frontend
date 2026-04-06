import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { buildPageMetadata } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const page = dict.informationalPages.checkoutInfo;

  return buildPageMetadata({
    lang: params.lang,
    canonical: "/checkout-info",
    title: dict.header.titles.checkoutInfo,
    description: page.blocks[0]?.paragraphs[0],
    imageSubtitle: page.blocks[0]?.title,
  });
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
