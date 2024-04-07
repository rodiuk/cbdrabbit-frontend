import { Metadata } from "next";
import { getAllProducts } from "@/libs/api/products.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";
import { sendOrderMessage } from "@/libs/api/telegram.api";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Home({ params }: IMainPageProps) {
  const res = await getAllProducts(params.lang);
  const dictionary = await getDictionary(params.lang);

  sendOrderMessage("6787003082", "Hello, Andrii");

  return (
    <main className={cn("container", styles.main)}>
      <h1>{dictionary["home"].title}</h1>
      <ul className={styles.list}>
        {res?.map(product => (
          <li key={product.id} className={styles.item}>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
