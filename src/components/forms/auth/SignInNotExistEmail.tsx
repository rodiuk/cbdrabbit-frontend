import React from "react";
import Button from "@/components/Ui/Button/Button";
import { Locale } from "../../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const SignInNotExistEmail = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang } = props;
  const { signInNotExist } = (await getDictionary(lang)).auth;
  const userEmail = "newzaychyik@gmail.com";

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{signInNotExist.title}</h1>
      <div className={styles.descr}>{userEmail}</div>
      <div className={styles.lay_text}>
        <p>{signInNotExist.description}</p>
      </div>
      <div className={cn(styles.bb, styles.two_button)}>
        <Button
          text={signInNotExist.buttonBack}
          className="white_button"
          iconLeft={true}
        />
        <Button text={signInNotExist.buttonSignUp} />
      </div>
    </section>
  );
};
