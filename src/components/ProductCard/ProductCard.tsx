import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { IProductRes } from "@/interfaces/product.interface";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";

const ProductPrice = dynamic(() => import("./ProductPrice/ProductPrice"), {
  ssr: false,
});
const ActionBar = dynamic(() => import("./ActionBar/ActionBar"), {
  ssr: false,
});

import styles from "./ProductCard.module.css";
import Link from "next/link";

interface Props {
  product: IProductRes;
  lang: Locale;
}

export const ProductCard = async ({
  product,
  lang,
}: Props): Promise<React.JSX.Element> => {
  const { productName, description, price, properties } = product;

  const currency = (await getDictionary(lang))?.currency;
	let idProuct
	let valLang = ""
	if (product.productName === "Rabbit Classic") {
		idProuct = "1"
	} else if (product.productName === "Rabbit Banana") {
		idProuct = "2"
	} else if (product.productName === "Rabbit Matcha") {
		idProuct = "3"
	}

	if (lang === "en") {
		valLang = "/en/"
	}

console.log(product.productName)
  return (
    <li className={styles.container}>

      <div className={styles.img_wrapper}>
        <Image
          src={product?.images[0]?.url}
          alt={product?.productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
				  <h2 className={styles.title}>
					  {idProuct && <Link href={`${valLang}land1/${idProuct}`}>{productName}</Link>}
				  </h2>
          <ProductPrice currentPrice={price} currency={currency} />
        </div>
        <ul className={styles.properties_list}>
          {properties?.map(property => (
            <li key={property.id} className={styles.property}>
              <Image
                src={property?.image?.url!}
                width={20}
                height={20}
                alt={property.label}
              />
              {property.label?.includes("CBD") ? (
                <>
                  {property.label.split("CBD")[0]}
                  <span className={styles.cbd}>CBD</span>
                </>
              ) : (
                property.label
              )}
            </li>
          ))}
        </ul>
        <p className={styles.description}>{description}</p>

        <div className={styles.divider} />
        {product.isStock ? (
          <ActionBar product={product} />
        ) : (
          <div className={styles.not_present}>
            <p className={styles.p}>
              {/* class p здесь обязателен  */}Поки немає в наявності
            </p>
          </div>
        )}
      </div>
    </li>
  );
};
