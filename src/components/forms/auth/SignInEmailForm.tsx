import React from "react";
import Image from "next/image";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { getDictionary } from "@/libs/18n/getDictionary";
import { Locale } from "../../../../i18n.config";

import icon_1 from "/public/img/icon_1.svg";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
}

export const SignInEmailForm = async (
  props: Props
): Promise<React.JSX.Element> => {
  const { lang } = props;
  const { signInEmail } = (await getDictionary(lang)).auth;

  return (
    <section className={styles.lay_item}>
      <div className={styles.ttl}>{signInEmail.title}</div>
      <div className={styles.img_center}>
        <Image src={icon_1.src} width={120} height={115} alt="icon_1" />
      </div>
      <Input
        type="text"
        placeholder={signInEmail.inputPlaceholder}
        text={signInEmail.inputLabel}
      />
      <div className={styles.bb}>
        <Button text={signInEmail.button} />
      </div>
    </section>
  );
};
