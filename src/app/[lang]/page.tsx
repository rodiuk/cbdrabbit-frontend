import { Metadata } from "next";
import { getAllProducts } from "@/libs/api/products.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { IProductRes } from "@/interfaces/product.interface";

import cn from "clsx";
import styles from "./page.module.css";
import ListSales from "@/components/ListSales/ListSales";

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
  const products = await getAllProducts(params.lang);

  return (
    <main className={cn(styles.container)}>
      <div className={styles.s_home_bg1}>
        {/* <Image src={bg1} fill className={styles.image} alt="bg" /> */}
        {/* <Bg3 /> */}
      </div>
      {/* <div className={styles.s_home_bg2}><Bg2 /></div> */}
      <div className="container">
        <ul className={styles.products}>
          {products?.map(product => (
            <ProductCard
              key={product.id}
              product={product as unknown as IProductRes}
              lang={params.lang}
            />
          ))}
        </ul>
        <ListSales lang={params.lang} />
		
      </div>
    </main>
  );
}
