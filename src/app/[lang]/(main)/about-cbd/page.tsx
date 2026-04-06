import Image from "next/image";
import { Metadata } from "next";

import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";
import { IMainPageProps } from "@/interfaces/page.interface";
import { buildPageMetadata } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";

import l1 from "/public/img/landing1.webp";
import l2 from "/public/img/landing2.webp";
import l3 from "/public/img/landing3.webp";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const page = dict.informationalPages.aboutCbd;

  return buildPageMetadata({
    lang: params.lang,
    canonical: "/about-cbd",
    title: dict.header.titles.aboutCbd,
    description: page.whatIs.paragraphs[0],
    imageSubtitle: page.howItWorks.title,
  });
}

export default async function AboutCBD({ params }: Readonly<IMainPageProps>) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;
  const page = dict.informationalPages.aboutCbd;

  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.pageCard}>
          <section className={s.section}>
            <h1 className={s.sectionTitle}>{page.whatIs.title}</h1>
            <div className={s.sectionGrid}>
              <div>
                <div className={s.textBlock}>
                  {page.whatIs.paragraphs.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className={s.visualCard}>
                <Image
                  src={l1}
                  fill
                  alt="CBD illustration"
                  className={s.visualCBDImage}
                />
              </div>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{page.howItWorks.title}</h2>

            <div className={s.sectionFlex}>
              <div className={s.illustrationCard}>
                <Image
                  src={l2}
                  fill
                  alt="CBD mechanism illustration"
                  className={s.illustrationCardImage}
                />
              </div>

              <div className={s.textBlock}>
                {page.howItWorks.paragraphs.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{page.benefits.title}</h2>

            <p className={s.muted}>
              {page.benefits.intro}{" "}
              <span className={s.note}>{page.benefits.note}</span>
              :
            </p>

            <div className={s.benefitsGrid}>
              {page.benefits.items.map(item => (
                <div key={item.title} className={s.benefitItem}>
                  <p>
                    <b className={s.benefitTitle}>{item.title}</b> -{" "}
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{page.safety.title}</h2>

            <div className={s.textBlock}>
              <p>{page.safety.intro}</p>

              <ul className={s.list}>
                {page.safety.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>{page.safety.outro}</p>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{page.compare.title}</h2>

            <div className={s.compareMediaWrapper}>
              <Image
                src={l3}
                alt="Comparison media"
                fill
                className={s.illustrationCardImage}
              />
            </div>

            <div className={s.compareGrid}>
              <p>{page.compare.cbd}</p>
              <p>{page.compare.thc}</p>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{page.sources.title}</h2>

            <ul className={s.sources}>
              {page.sources.items.map(source => (
                <li key={source.label}>
                  <a
                    href={source.href}
                    target={
                      source.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      source.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
