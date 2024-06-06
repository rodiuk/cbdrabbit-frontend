"use client";

import React from "react";
import { Locale } from "../../../i18n.config";
import Image from "next/image";
import { ButtonLink } from "../Ui/ButtonLink";
import { useRouter, useSearchParams } from "next/navigation";
import { updatePasswordByCode } from "@/libs/api/user.api";

import ok from "/public/img/ok.jpg";

import styles from "./styles.module.css";

interface Props {
  lang: Locale;
  btnText: string;
  title: string;
}

export const SuccessEmailChange = (props: Props): React.JSX.Element | null => {
  const { lang, btnText, title } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const newEmail = searchParams?.get("newEmail");
  const code = searchParams?.get("code");

  const [updated, setUpdated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!newEmail || !code || updated) return;

    (async function fetch() {
      const res = await updatePasswordByCode(code, newEmail);

      if ("id" in res) {
        return setUpdated(true);
      }
    })();
  }, [code, lang, newEmail, router, updated]);

  return updated ? (
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
  ) : null;
};
