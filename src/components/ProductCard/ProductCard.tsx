import React from "react";
import Image from "next/image";
import { ProductPrice } from "./ProductPrice/ProductPrice";
import { IProductRes } from "@/interfaces/product.interface";
import { ArrowRightIcon } from "../icons/ArrowRight";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";
import { ActionBar } from "./ActionBar/ActionBar";
import { DiscountInfo } from "./DiscountInfo/DiscountInfo";
import { ArrowRightFilterIcon } from "../icons/ArrowRightFilter";
import { RabbitEarIcon } from "../icons/RabbitEar";

import styles from "./ProductCard.module.css";

interface Props {
  product: IProductRes;
  lang: Locale;
}

export const ProductCard = async ({
  product,
  lang,
}: Props): Promise<React.JSX.Element> => {
  const { productName, description, price, id, properties } = product;

  const currency = (await getDictionary(lang))?.currency;
  const home = (await getDictionary(lang))?.home;

  return (
    <li className={styles.container}>
      <RabbitEarIcon iconStyle={styles.left_ear} />
      <RabbitEarIcon iconStyle={styles.right_ear} />

      <div className={styles.img_wrapper}>
        <Image
          src={product?.images[0]?.url}
          alt={product?.productName}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className={styles.image}
        />
        <ArrowRightFilterIcon iconStyle={styles.decorate_icon} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {productName}
            <ArrowRightIcon iconStyle={styles.icon} />
          </h2>
          <ProductPrice currentPrice={price} currency={currency} />
        </div>
        <ul className={styles.properties_list}>
          {properties?.map(property => (
            <li key={property.id} className={styles.property}>
              <Image
                src={property?.image?.url}
                width={20}
                height={20}
                alt={property.label}
              />
              {property.label}
            </li>
          ))}
        </ul>
        <p className={styles.description}>{description}</p>

        <div className={styles.divider} />

        <ActionBar product={product} />

        <DiscountInfo
          label={home.product.discountLabel}
          discountList={home.product.discountList}
        />
      </div>
    </li>
  );
};
