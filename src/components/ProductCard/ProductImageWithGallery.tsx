"use client";

import React from "react";
import Image from "next/image";

import Gallery from "../Ui/Gallery/Gallery";
import styles from "./ProductCard.module.css";

interface Props {
  images: string[];
  mainImage: string;
  productName: string;
}

export const ProductImageWithGallery = ({
  images,
  mainImage,
  productName,
}: Props): React.JSX.Element => {
  const [openGallery, setOpenGallery] = React.useState(false);

  return (
    <>
      <div className={styles.img_wrapper}>
        <Image
          src={mainImage}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
          onClick={() => setOpenGallery(true)}
        />
      </div>

      <Gallery
        images={images}
        isOpen={openGallery}
        onClose={() => setOpenGallery(false)}
      />
    </>
  );
};
