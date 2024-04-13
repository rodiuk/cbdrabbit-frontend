import React from "react";
import Button from "../Ui/Button/Button";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";

import letter from "/public/img/letter.svg";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const SuccessSignUp = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang } = props;
  const { successSignUp } = (await getDictionary(lang)).auth;

  const userEmail = "newzaychyik@gmail.com";

  return (
    <div className={styles.lay_item}>
      <div className={styles.items_wrap}>
        <h1 className={styles.ttl}>{successSignUp.title}</h1>
        <div className={styles.img_center}>
          <img src={letter.src} alt="letter" />
        </div>
        <p className={styles.descr}>{userEmail}</p>
        <h2 className={styles.ttl}>{successSignUp.subTitle}</h2>
        <div className={`${styles.descr} ${styles.m10}`}>{userEmail}</div>
        <p className={styles.ttl}>{successSignUp.description}</p>
      </div>

      <div className={`${styles.bb}`}>
        <Button text={successSignUp.button} className="white_button" />
      </div>
    </div>
  );
};
