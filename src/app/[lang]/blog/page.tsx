import React from "react";
import { Metadata } from "next";
import { getAllPosts } from "@/libs/api/post.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/blog`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <main className={cn("container", styles.main)}>
      Blog has: {posts?.length}
    </main>
  );
}
