import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";
import { Locale } from "../../../../i18n.config";

import styles from "./style.module.css";
import { maskEmailAddress } from "@/utils/maskEmailAddress";

interface Props {
  title: string;
  message: string;
  email: string;
  backHref: string;
  lang: Locale;
}

export const AskRecoveryPassword = (props: Props): React.JSX.Element => {
  const { title, message, email, backHref, lang } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={backHref} className={styles.icon}>
          <ArrowLeftIcon />
        </Link>

        <h1 className={styles.title}>{title}</h1>
      </div>

      <p className={styles.message}>{message}</p>
      <p className={styles.email}>{maskEmailAddress(email)}</p>

      <Link
        href={`/${lang}/singIn/reset=true`}
        aria-label="Link on new submit popup"
        className={styles.submit}
      >
        Submit
      </Link>
    </div>
  );
};
