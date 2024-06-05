"use client";

import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { Locale } from "../../../i18n.config";
import { ButtonLink } from "../Ui/ButtonLink";
import { IOrderDict } from "@/interfaces/i18n.interface";
import { clearCartAtom } from "@/libs/store/atoms";

import ok from "/public/img/ok.jpg";

import cn from "clsx";
import styles from "./styles.module.css";

interface Props {
  lang: Locale;
  dict: IOrderDict;
  containerStyle?: string;
}

export const SuccessOrder = (props: Props): React.JSX.Element => {
  const { lang, dict, containerStyle } = props;
  const [, clear] = useAtom(clearCartAtom);

  React.useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section
      className={cn(styles.lay_item, {
        [containerStyle!]: containerStyle !== undefined,
      })}
    >
      <div className={styles.items_wrap}>
        <div className={styles.img_center}>
          <Image src={ok.src} alt="Decorate icon" width={206} height={169} />
        </div>

        <h1 className={styles.ttl}>{dict.orderSuccess}</h1>
      </div>

      <div className={`${styles.bb}`}>
        <ButtonLink href={`/${lang}`} text={dict.buttonLabel} />
      </div>
    </section>
  );
};
