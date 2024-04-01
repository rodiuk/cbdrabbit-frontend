import React from "react";
import { Metadata } from "next";
import { getPostById } from "@/libs/api/post.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  const post = await getPostById(params.postId);

  return {
    ...(!!post?.metaTitle && { title: post.metaTitle }),
    ...(!!post?.metaDescription && { description: post.metaDescription }),
    alternates: {
      canonical: `/blog/${params.postId}`,
    },
    openGraph: {
      ...openGraphBase,
      ...(!!post?.metaTitle && { title: post.metaTitle }),
      ...(!!post?.metaDescription && { description: post.metaDescription }),
      locale: params.lang,
    },
  };
}

export default async function Post({ params }: IMainPageProps) {
  const post = await getPostById(params.postId);

  return (
    <main className={cn("container", styles.main)}>
      Post has: {post?.title}
    </main>
  );
}
