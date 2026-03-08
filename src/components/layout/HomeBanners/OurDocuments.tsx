"use client";

import React from "react";
import Button from "@/components/Ui/Button/Button";

import Image from "next/image";
import documents from "/public/img/our_documents.png";

import cn from "clsx";
import s from "./HomeBaner.module.css";
import Gallery from "@/components/Ui/Gallery/Gallery";

interface Props {
  title: string;
  buttonLabel: string;
  className?: string;
}

const OurDocuments = ({
  title,
  buttonLabel,
  className,
}: Props): React.JSX.Element => {
  const [openGallery, setOpenGallery] = React.useState(false);

  return (
    <>
      <div className={cn(s.baner, className)}>
        <div className={s.banerWrap}>
          <div className={cn(s.imgBlock, s.documents_img_block)}>
            <Image
              src={documents}
              alt="Our documents picture"
              width={222}
              height={216}
            />
          </div>
          <div className={s.tb}>
            <p>{title}</p>

            <Button
              className={s.bb}
              text={buttonLabel}
              handleClick={() => setOpenGallery(true)}
            />
          </div>
        </div>
      </div>

      <Gallery
        isOpen={openGallery}
        onClose={() => setOpenGallery(false)}
        images={[
          "/img/docs/cbddocs01.webp",
          "/img/docs/cbddocs02.webp",
          "/img/docs/cbddocs03.webp",
          "/img/docs/cbddocs04.webp",
          "/img/docs/cbddocs05.webp",
        ]}
      />
    </>
  );
};

export default OurDocuments;
