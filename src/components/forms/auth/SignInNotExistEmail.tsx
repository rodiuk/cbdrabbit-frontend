"use client";

import React from "react";
import Button from "@/components/Ui/Button/Button";
import { ISignInNotExistDict } from "@/interfaces/auth.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/createQueryString";
import { Locale } from "../../../../i18n.config";

import cn from "clsx";
import styles from "./styles.module.css";

interface Props {
  dict: ISignInNotExistDict;
  lang: Locale;
}

export const SignInNotExistEmail = ({
  dict,
  lang,
}: Props): React.JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userEmail = searchParams?.get("notExist");

  const handleCreateQueryString = React.useCallback(
    (name: string, value: string) => {
      return createQueryString(new URLSearchParams(), name, value);
    },
    []
  );

  const handleRedirectToSignUp = React.useCallback(() => {
    if (!userEmail) return router.push("/");

    router.push(
      `/${lang}/signUp` + `?${handleCreateQueryString("email", userEmail)}`
    );
  }, [handleCreateQueryString, router, userEmail, lang]);

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{dict.title}</h1>
      <div className={styles.descr}>{userEmail}</div>
      <div className={styles.lay_text}>
        <p dangerouslySetInnerHTML={{ __html: dict.description }} />
      </div>
      <div className={cn(styles.bb, styles.two_button)}>
        <Button
          text={dict.buttonBack}
          className="white_button"
          iconLeft={true}
          handleClick={() => router.back()}
        />
        <Button text={dict.buttonSignUp} handleClick={handleRedirectToSignUp} />
      </div>
    </section>
  );
};
