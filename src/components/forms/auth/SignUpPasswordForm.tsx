import React from "react";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { Locale } from "../../../../i18n.config";
import { getDictionary } from "@/libs/18n/getDictionary";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const SignUpPasswordForm = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang } = props;
  const userEmail = "newzaychyik@gmail.com";
  const { signUpPassword } = (await getDictionary(lang)).auth;

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{signUpPassword.title}</h1>
      <div className={styles.descr}>{userEmail}</div>
      <Input
        type="text"
        placeholder={signUpPassword.firstInputPlaceholder}
        password={true}
      />
      <Input
        type="text"
        placeholder={signUpPassword.secondInputPlaceholder}
        password={true}
      />
      <div className={styles.bb}>
        <Button text={signUpPassword.buttonSignUp} />
      </div>
    </section>
  );
};
