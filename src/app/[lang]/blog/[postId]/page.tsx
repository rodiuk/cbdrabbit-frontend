import React from "react";
import { Metadata } from "next";
import { getPostById } from "@/libs/api/post.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";

import post_pic from "/public/img/post_pic.jpg";
import Image from "next/image";

interface Props {}

/* export async function generateMetadata({
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
 */
export default async function Post({ params }: IMainPageProps) {
  const post = await getPostById(params.postId);

  return (
    <>
      <main className={cn("container", styles.main)}>
			  <div className={styles.wrapper}>
				  <div className={styles.dt}>17.03.24, 11:52</div>
				  <div className={styles.h2}>
				  Post has: {post?.title} Як там то-то?
				  </div>
				  <div className={styles.block}>
					  <div className={styles.ttl}>7. Умови конфіденційності і захисту персональних даних</div>
					  <div className={styles.text}>1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу України, є публічною офертою Продавця, адресованою невизначеному колу осіб, незалежно від їхнього статусу (фізична особа, юридична особа, фізична особа-підприємець), укласти договір купівлі-продажу товару, представленого на сайті www.cbdrabbit.shop</div>
					  <div className={styles.img}>
						  <Image src={post_pic} alt="pic"  />
					  </div>
				  </div>
		</div>
      </main>
      <Footer />
    </>
  );
}
