import React from "react";
import { SignInEmailForm } from "@/components/forms/auth/SignInEmailForm";
import { IMainPageProps } from "@/interfaces/page.interface";
import { SignInNotExistEmail } from "@/components/forms/auth/SignInNotExistEmail";
import { SignInPassword } from "@/components/forms/auth/SignInPassword";
import { getDictionary } from "@/libs/18n/getDictionary";
import { SignUpPasswordForm } from "@/components/forms/auth/SignUpPasswordForm";

import cn from "clsx";
import styles from "./page.module.css";

export default async function About({ params, searchParams }: IMainPageProps) {
  const email = searchParams?.email;
  const notExist = searchParams?.notExist;
  const signUp = searchParams?.signUp;

  const { signInEmail, signInNotExist, signUpPassword, signInPassword } = (
    await getDictionary(params.lang)
  ).auth;

  const rendererContent = () => {
    switch (true) {
      case !!email:
        return <SignInPassword dict={signInPassword} />;
      case !!notExist:
        return <SignInNotExistEmail lang={params.lang} dict={signInNotExist} />;
      case !!signUp:
        return <SignUpPasswordForm dict={signUpPassword} />;
      default:
        return <SignInEmailForm dict={signInEmail} />;
    }
  };

  return (
    <main className={cn("container", styles.main)}>{rendererContent()}</main>
  );
}
