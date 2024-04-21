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
      canonical: `/privacy`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default function Policy() {
  return <main className={cn("container", styles.main)}>Policy</main>;
}
