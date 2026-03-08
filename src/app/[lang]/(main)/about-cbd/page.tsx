import React from "react";
import Image from "next/image";
import { Metadata } from "next";

import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";

import l1 from "/public/img/landing1.webp";
import l2 from "/public/img/landing2.webp";
import l3 from "/public/img/landing3.webp";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/about-cbd`,
      languages: {
        en: `/en/about-cbd`,
        uk: `/uk/about-cbd`,
      },
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

const sources = [
  {
    label: "🔗 Harvard Health: Cannabidiol — що відомо і чого ще не знаємо",
    href: "https://www.health.harvard.edu/blog/cannabidiol-cbd-what-we-know-and-what-we-dont-know-2021082419351",
  },
  {
    label: "🔗 NCBI / StatPearls: CBD у клінічній практиці — переваги та ризики",
    href: "https://www.ncbi.nlm.nih.gov/books/NBK556048/",
  },
  {
    label: "🔗 Forbes Health: Наукові докази користі CBD",
    href: "https://www.forbes.com/health/wellness/cbd-benefits/",
  },
  {
    label: "🔗 AP News — Все більше людей використовують продукти з CBD",
    href: "https://apnews.com/",
  },
  {
    label: "🔗 WebMD — Переваги для здоров'я",
    href: "https://www.webmd.com/pain-management/cbd-benefits",
  },
  {
    label: "🔗 Зелена Газета — Що таке CBD та як він працює",
    href: "#",
  },
];

export default async function AboutCBD({ params }: Readonly<IMainPageProps>) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;

  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.pageCard}>
          <section className={s.section}>
            <h1 className={s.sectionTitle}>
              <span className={s.icon}>🧠</span>
              Що таке CBD?
            </h1>
            <div className={s.sectionGrid}>
              <div>
                <div className={s.textBlock}>
                  <p>
                    <strong>CBD (канабідіол)</strong> — це природна сполука з
                    рослини <strong>Cannabis sativa</strong> (коноплі). На
                    відміну від THC, він{" "}
                    <strong>
                      не викликає психоактивного ефекту і не «дурманить»
                    </strong>
                    , тобто не дає стану ейфорії чи «кайфу».
                  </p>

                  <p>
                    CBD взаємодіє з ендоканабіноїдною системою (ЕКС) в організмі
                    — мережею рецепторів, які регулюють настрій, сон, біль та
                    імунітет.
                  </p>
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
            <h2 className={s.sectionTitle}>
              <span className={s.icon}>🌿</span>
              Як саме він працює?
            </h2>

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
                <p>
                  CBD не прив’язується прямо до рецепторів CB1/CB2, як THC, а{" "}
                  <strong>
                    посилює природні канали регуляції балансу в тілі
                  </strong>{" "}
                  — збільшує дію власних ендоканабіноїдів та взаємодіє з іншими
                  системами організму (наприклад серотоніновими рецепторами).
                </p>
              </div>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>
              <span className={s.icon}>✅</span>
              Можливі ефекти та користь
            </h2>

            <p className={s.muted}>
              Наукові дані вказують на наступні потенційні ефекти{" "}
              <span className={s.note}>
                (частина доказів — проміжні, потребують подальших досліджень)
              </span>
              :
            </p>

            <div className={s.benefitsGrid}>
              <div className={s.benefitItem}>
                <p>
                  <b className={s.benefitTitle}>
                    ✨ Зменшення тривожності та стресу
                  </b>{" "}
                  - CBD може впливати на серотонінові рецептори, що пов’язано зі
                  зниженням рівня тривоги.
                </p>
              </div>

              <div className={s.benefitItem}>
                <p>
                  <b className={s.benefitTitle}>✨ Покращення сну</b> - Деякі
                  дослідження показують, що CBD може допомогти легше засинати й
                  зменшити нічні пробудження.
                </p>
              </div>

              <div className={s.benefitItem}>
                <p>
                  <b className={s.benefitTitle}>
                    ✨ Знеболення та протизапальна дія
                  </b>{" "}
                  - CBD може модулювати больові сигнали та впливати на
                  запалення.
                </p>
              </div>

              <div className={s.benefitItem}>
                <p>
                  <b className={s.benefitTitle}>✨ Підтримка при епілепсії</b> -
                  На основі CBD створено препарат Epidiolex, схвалений для
                  лікування деяких форм епілепсії.
                </p>
              </div>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>
              <span className={s.icon}>⚠️</span>
              Що варто знати про безпеку
            </h2>

            <div className={s.textBlock}>
              <p>CBD зазвичай вважають добре переносимим, але важливо:</p>

              <ul className={s.list}>
                <li>
                  🔸 може взаємодіяти з іншими ліками (антикоагулянти,
                  антидепресанти тощо), змінюючи їх ефект;
                </li>
                <li>
                  🔸 можливі побічні ефекти: сухість у роті, сонливість, зміни
                  апетиту, нудота;
                </li>
                <li>
                  🔸 у дуже високих дозах можливий вплив на печінкові маркери —
                  особливо при одночасному прийомі певних ліків.
                </li>
              </ul>

              <p>
                <strong>CBD не є універсальним лікуванням</strong>, і його
                ефективність ще досліджується.
              </p>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>
              <span className={s.icon}>🧪</span>
              Різниця між CBD і THC
            </h2>

            <div className={s.compareMediaWrapper}>
              <Image
                src={l3}
                alt="Comparison media"
                fill
                className={s.illustrationCardImage}
              />
            </div>

            <div className={s.compareGrid}>
              <p>
                <b>CBD</b> — не психоактивний, не дає «ефекту кайфу» і широко
                використовується у wellness-продуктах.
              </p>
              <p>
                <b>THC</b> — психоактивний компонент конопель, що викликає ефект
                ейфорії.
              </p>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>
              <span className={s.icon}>📌</span>
              Список джерел
            </h2>

            <ul className={s.sources}>
              {sources.map(source => (
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
