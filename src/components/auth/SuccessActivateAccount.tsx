import React from "react";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";
import { checkVerifiedCode } from "@/libs/api/user.api";
import Image from "next/image";

import ok from "/public/img/ok.svg";

import styles from "./styles.module.css";
import { ButtonLink } from "../Ui/ButtonLink";

interface Props {
  lang: Locale;
  code: string;
}

export const SuccessActivateAccount = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang, code } = props;
  const { activate } = (await getDictionary(lang)).auth;

  const user = await checkVerifiedCode(code);
  const activated = "id" in user;

  return (
    <section className={styles.lay_item}>
      {activated ? (
        <>
          <div className={styles.items_wrap}>
            <div className={styles.img_center}>
              <Image
                src={ok.src}
                alt="Decorate icon"
                width={206}
                height={169}
              />
            </div>
            <div className={styles.warning}>
              <h1>{activate.title}</h1>
              <p className={styles.big}>2%</p>
            </div>
            <h2 className={styles.ttl}>{activate.subTitle}</h2>
          </div>

          <div className={`${styles.bb}`}>
            <ButtonLink href={`/${lang}`} text={activate.button} />
          </div>
        </>
      ) : (
        <>Something went wrong</>
      )}
    </section>
  );
};
