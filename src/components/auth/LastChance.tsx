import React from "react";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Locale } from "../../../i18n.config";
import Button from "../Ui/Button/Button";
import Image from "next/image";

import last from "/public/img/last.svg";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const LastChance = async (props: Props): Promise<React.JSX.Element> => {
  const { lang } = props;
  const { lastChance } = (await getDictionary(lang)).auth;

  return (
    <section className={styles.lay_item}>
      <div className={styles.items_wrap}>
        <div className={styles.img_center}>
          <Image src={last.src} alt="Decorate icon" width={206} height={169} />
        </div>
        <h1 className={`${styles.ttl} ${styles.mb15}`}>{lastChance.title}</h1>
        <p className={styles.ttl}>{lastChance.description}</p>
      </div>

      <div className={styles.bb}>
        <Button text={lastChance.button} />
      </div>
    </section>
  );
};
