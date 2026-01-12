import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";
import { IProductRes } from "@/interfaces/product.interface";

import cn from "clsx";

const ProductPrice = dynamic(() => import("./ProductPrice/ProductPrice"), {
  ssr: false,
  loading: () => <CurrentPriceSkeleton />,
});
const ActionBar = dynamic(() => import("./ActionBar/ActionBar"), {
  ssr: false,
  loading: () => <TotalCountSkeleton />,
});

import styles from "./ProductCard.module.css";
import Link from "next/link";
import { TotalCountSkeleton } from "../skeletons/TotalCountSkeleton";
import { CurrentPriceSkeleton } from "../skeletons/CurrentPriceSkeleton";

interface Props {
  product: IProductRes;
  lang: Locale;
}

export const ProductCard = async ({
  product,
  lang,
}: Props): Promise<React.JSX.Element> => {
  const { productName, description, price, properties } = product;

  const filteredProperties = properties?.filter(
    property => !property.label?.includes("CBD")
  );
  const cbdProperty = properties?.find(property =>
    property.label?.includes("CBD")
  );

  const currency = (await getDictionary(lang))?.currency;
  let idProuct;
  let valLang = "";
  if (product.productName === "🍓 Calmberry") {
    idProuct = "classic";
  } else if (product.productName === "🍌 Banana Chill") {
    idProuct = "banana";
  } else if (product.productName === "🍵 Matcha Focus") {
    idProuct = "matcha";
  } else if (product.productName === "☕️ Coffee Break") {
    idProuct = "coffee";
  }

  if (lang === "en") {
    valLang = "/en/";
  }

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
            {idProuct && (
              <Link href={`${valLang}${idProuct}`}>{productName}</Link>
            )}
          </h2>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.price_row}>
          {cbdProperty && (
            <div className={cn(styles.property, styles.cbd_property)}>
              <Image
                src={cbdProperty?.image?.url!}
                width={20}
                height={20}
                alt={cbdProperty.label}
              />
              {cbdProperty.label?.includes("CBD") ? (
                <>
                  <span className={styles.cbd}>
                    {cbdProperty.label.split("CBD")[0]}
                  </span>
                  CBD
                </>
              ) : (
                cbdProperty.label
              )}
            </div>
          )}

          <ProductPrice currentPrice={price} currency={currency} />
        </div>
        <ul className={styles.properties_list}>
          {filteredProperties?.map(property => (
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
