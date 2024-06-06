import React from "react";
import Image from "next/image";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";
import { checkVerifiedCode } from "@/libs/api/user.api";
import { ButtonLink } from "../Ui/ButtonLink";
import { signIn } from "next-auth/react";

import ok from "/public/img/ok.jpg";

import styles from "./styles.module.css";
import { SuccessAutoSignIn } from "./SuccessAutoSignIn";

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
          <SuccessAutoSignIn user={user} />
        </>
      ) : (
        <>Something went wrong</>
      )}
    </section>
  );
};
