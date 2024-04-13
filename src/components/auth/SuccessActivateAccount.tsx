import React from "react";
import Button from "../Ui/Button/Button";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";

import ok from "/public/img/ok.svg";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const SuccessActivateAccount = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang } = props;
  const { activate } = (await getDictionary(lang)).auth;

  return (
    <section className={styles.lay_item}>
      <div className={styles.items_wrap}>
        <div className={styles.img_center}>
          <img src={ok.src} alt="ok" />
        </div>
        <div className={styles.warning}>
          <h1>{activate.title}</h1>
          <p className={styles.big}>2%</p>
        </div>
        <h2 className={styles.ttl}>{activate.subTitle}</h2>
      </div>

      <div className={`${styles.bb}`}>
        <Button text={activate.button} />
      </div>
    </section>
  );
};
