import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/policy`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default function Policy({ params }: IMainPageProps): React.JSX.Element {
  console.log(params);

  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.wrapper}>
        <h1 className={styles.h1}>Політика</h1>
        <h2 className={styles.h2}>Пункт 1</h2>
        <p className={styles.p}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eos rem
          recusandae velit, sequi quis totam voluptas explicabo laborum magni
          rerum impedit! Ipsam unde exercitationem explicabo blanditiis, sint
          officia vero!
        </p>
        <p className={styles.p}>
          риба <strong>рибна риба</strong> рибна риба рибна риба рибнариба рибна
          риба рибна риба рибна риба рибнариба рибна риба рибна риба рибна риба
          рибнариба рибна риба рибна риба рибна риба рибнариба рибна риба рибна
          риба рибна риба рибнариба рибна риба рибна риба рибна риба рибнариба
          рибна риба рибна риба рибна риба рибнариба рибна риба рибна риба рибна
          риба рибна
        </p>
        <h2 className={styles.h2}>Пункт 2</h2>
        <p className={styles.p}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eos rem
          recusandae velit, sequi quis totam voluptas explicabo laborum magni
          rerum impedit! Ipsam unde exercitationem explicabo blanditiis, sint
          officia vero!
        </p>
        <p className={styles.p}>
          риба рибна риба рибна риба рибна риба рибнариба рибна риба рибна риба
          рибна риба рибнариба рибна риба рибна риба рибна риба рибнариба рибна
          риба рибна риба рибна риба рибнариба рибна риба рибна риба рибна риба
          рибнариба рибна риба рибна риба рибна риба рибнариба рибна риба рибна
          риба рибна риба рибнариба рибна риба рибна риба рибна риба рибна
        </p>
        <h2 className={styles.h2}>Пункт 2</h2>
        <p className={styles.p}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eos rem
          recusandae velit, sequi quis totam voluptas explicabo laborum magni
          rerum impedit! Ipsam unde exercitationem explicabo blanditiis, sint
          officia vero!
        </p>
        <p className={styles.p}>
          риба рибна риба рибна риба рибна риба рибнариба рибна риба рибна риба
          рибна риба рибнариба рибна риба рибна риба рибна риба рибнариба рибна
          риба рибна риба рибна риба рибнариба рибна риба рибна риба рибна риба
          рибнариба рибна риба рибна риба рибна риба рибнариба рибна риба рибна
          риба рибна риба рибнариба рибна риба рибна риба рибна риба рибна
        </p>
        <h2 className={styles.h2}>Пункт 2</h2>
        <p className={styles.p}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eos rem
          recusandae velit, sequi quis totam voluptas explicabo laborum magni
          rerum impedit! Ipsam unde exercitationem explicabo blanditiis, sint
          officia vero!
        </p>
        <p className={styles.p}>
          риба рибна риба рибна риба рибна риба рибнариба рибна риба рибна риба
          рибна риба рибнариба рибна риба рибна риба рибна риба рибнариба рибна
          риба рибна риба рибна риба рибнариба рибна риба рибна риба рибна риба
          рибнариба рибна риба рибна риба рибна риба рибнариба рибна риба рибна
          риба рибна риба рибнариба рибна риба рибна риба рибна риба рибна
        </p>
      </div>
    </main>
  );
}
