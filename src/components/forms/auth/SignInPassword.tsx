import React from "react";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { Locale } from "../../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const SignInPassword = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang } = props;

  const { signInPassword } = (await getDictionary(lang)).auth;

  const userEmail = "newzaychyik@gmail.com";

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{signInPassword.title}</h1>
      <p className={styles.descr}>{userEmail}</p>
      <Input
        type="text"
        text={signInPassword.inputLabel}
        placeholder={signInPassword.inputPlaceholder}
        isPassword
        password={true}
      />

      {true && <p className={styles.error}>{signInPassword.error}</p>}
      <div className={cn(styles.bb, styles.two_button)}>
        <Button
          text={signInPassword.buttonBack}
          className="white_button"
          iconLeft={true}
        />
        <Button text={signInPassword.buttonSignIn} />
      </div>
    </section>
  );
};
