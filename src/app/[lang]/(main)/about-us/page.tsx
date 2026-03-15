import Image from "next/image";
import { Metadata } from "next";

import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";

import l1 from "/public/img/landing4.webp";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/about-us`,
      languages: {
        en: `/en/about-us`,
        uk: `/uk/about-us`,
      },
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function AboutUS({ params }: Readonly<IMainPageProps>) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;
  const page = dict.informationalPages.aboutUs;

  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.pageCard}>
          <section className={s.section}>
            <h1 className={s.title}>{page.story.title}</h1>

            <div className={s.content}>
              {page.story.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className={s.author}>{page.story.author}</p>

            <div className={s.imageWrap}>
              <Image
                src={l1}
                alt="Про бренд Cod Rabbit"
                fill
                className={s.image}
                sizes="(max-width: 768px) 100vw, 760px"
              />
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.title}>{page.rabbits.title}</h2>

            <div className={s.content}>
              {page.rabbits.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className={s.author}>{page.rabbits.author}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.title}>{page.values.title}</h2>

            {page.values.items.map(item => (
              <div key={item.title} className={s.subsection}>
                <h3 className={s.subTitle}>{item.title}</h3>

                <div className={s.content}>
                  {item.paragraphs.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {!!item.list?.length && (
                    <ul className={s.list}>
                      {item.list.map(listItem => (
                        <li key={listItem}>- {listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className={s.section}>
            <h2 className={s.title}>{page.mission.title}</h2>

            {page.mission.items.map(item => (
              <div key={item.title} className={s.subsection}>
                <h3 className={s.subTitle}>{item.title}</h3>

                <div className={s.content}>
                  {item.paragraphs.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
