import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { buildPageMetadata } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return buildPageMetadata({
    lang: params.lang,
    canonical: "/terms",
    title: "Terms",
    description: "Terms and conditions for CBD Rabbit.",
  });
}

export default function Terms() {
  return <main className={cn("container", styles.main)}>Terms</main>;
}
