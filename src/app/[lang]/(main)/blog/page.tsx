import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts } from "@/libs/api/post.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/blog`,
      languages: {
        en: `/en/blog`,
        uk: `/uk/blog`,
      },
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Blog({ params }: any) {
  const { lang } = params;
  const posts = await getAllPosts();
  const dict = await getDictionary(params.lang);
  const { header } = dict;
  const items = [
    {
      id: 1,
      date: "17.03.24, 11:52",
      title: "Як там то-то?",
      description:
        "1.1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу України, є публічною офертою Продавця, адресованою невизначеному колу осіб, незалежно від їхнього статусу (фізич",
    },
    {
      id: 2,
      date: "18.03.24, 11:52",
      title: "Як там то-то?2",
      description:
        "1.1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу України, є публічною офертою Продавця, адресованою невизначеному колу осіб, незалежно від їхнього статусу (фізич",
    },
    {
      id: 3,
      date: "19.03.24, 11:52",
      title: "Як там то-то?3",
      description:
        "1.1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу України, є публічною офертою Продавця, адресованою невизначеному колу осіб, незалежно від їхнього статусу (фізич",
    },
  ];

  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.wrapper}>
          sdBlog has: {posts?.length}
          <ul>
            {items.map(item => {
              return (
                <li key={item.id} className={styles.item}>
                  <div className="wrap_item">
                    <div className={styles.date}>{item.date}</div>
                    <div className={styles.ttl}>
                      <Link href={`/${lang}/blog/${item.id}`}>
                        {item.title}
                      </Link>
                    </div>
                    <div className={styles.description}>{item.description}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
