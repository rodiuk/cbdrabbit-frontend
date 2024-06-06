import React from "react";
import { Locale } from "../../../i18n.config";
import Image from "next/image";
import { ButtonLink } from "../Ui/ButtonLink";

import ok from "/public/img/ok.jpg";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
  btnText: string;
  title: string;
}

export const SuccessAction = (props: Props): React.JSX.Element => {
  const { lang, btnText, title } = props;

  return (
    <section className={styles.lay_item}>
      <div className={styles.items_wrap}>
        <div className={styles.img_center}>
          <Image src={ok.src} alt="Decorate icon" width={206} height={169} />
        </div>

        <h1 className={styles.ttl}>{title}</h1>
      </div>

      <div className={`${styles.bb}`}>
        <ButtonLink href={`/${lang}`} text={btnText} />
      </div>
    </section>
  );
};
