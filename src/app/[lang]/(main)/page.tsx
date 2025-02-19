import { Metadata } from "next";
import { getAllProducts } from "@/libs/api/products.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { IProductRes } from "@/interfaces/product.interface";
import ListSales from "@/components/ListSales/ListSales";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./page.module.css";
import HomeBaner from "@/components/layout/HomeBaner/HomeBaner";
import { Slider } from "@/components/Slider/Slider";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/`,
      languages: {
        en: `/en`,
        uk: `/uk`,
      },
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Home({ params }: IMainPageProps) {
  const products = await getAllProducts(params.lang);
  const home = (await getDictionary(params.lang))?.home;

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
		  </div>
		  <div className="container">
		  <ListSales home={home} />
		  </div>  
			 
		  <Slider className="homeslider" />
		  <div className="container">
		  <HomeBaner />
		  </div>
			  
      
    </main>
  );
}
