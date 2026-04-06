import { Metadata } from "next";
import { getAllProducts } from "@/libs/api/products.api";
import { IMainPageProps } from "@/interfaces/page.interface";
import { buildPageMetadata } from "@/app/[lang]/shared-metadata";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { IProductRes } from "@/interfaces/product.interface";
import ListSales from "@/components/ListSales/ListSales";
import { getDictionary } from "@/libs/18n/getDictionary";
import MoreAboutCandies from "@/components/layout/HomeBanners/MoreAboutCandies";
import { SplideSlider } from "@/components/SplideSlider/SplideSlider";

import cn from "clsx";
import styles from "./page.module.css";
import OurDocuments from "@/components/layout/HomeBanners/OurDocuments";
import { FaqSection } from "@/components/FAQSection/FAQSection";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return buildPageMetadata({
    lang: params.lang,
    canonical: "/",
    imageSubtitle: "Natural CBD candies for calm, focus and a playful mood.",
  });
}

export default async function Home({ params }: IMainPageProps) {
  const products = await getAllProducts(params.lang);
  const home = (await getDictionary(params.lang))?.home;

  return (
    <main className={cn(styles.container)}>
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
      <SplideSlider className="homeslider" />

      <div className="container home-banners">
        <FaqSection faqs={home?.faqsSection?.faqs} />
      </div>

      <div className="container home-banners">
        <MoreAboutCandies
          title={home?.moreAboutCandies.title || ""}
          buttonLabel={home?.moreAboutCandies.button || ""}
        />

        <OurDocuments
          title={home?.ourDocuments.title || ""}
          buttonLabel={home?.ourDocuments.button || ""}
        />
      </div>
    </main>
  );
}
