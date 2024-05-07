import React from "react";
import { IMainPageProps } from "@/interfaces/page.interface";
import { getDictionary } from "@/libs/18n/getDictionary";
import { SignUpPasswordForm } from "@/components/forms/auth/SignUpPasswordForm";
import { SuccessSignUp } from "@/components/auth/SuccessSignUp";
import { SuccessActivateAccount } from "@/components/auth/SuccessActivateAccount";

import cn from "clsx";
import styles from "./page.module.css";

export default async function SignUp({ params, searchParams }: IMainPageProps) {
  const { signUpPassword, successSignUp } = (await getDictionary(params.lang))
    .auth;
  const successSignUpRes = searchParams?.registered;

  const activateSignUpCode = searchParams?.code;

  const rendererContent = () => {
    switch (true) {
      case !!successSignUpRes:
        return <SuccessSignUp dict={successSignUp} userEmail={successSignUpRes} />;
      case !!activateSignUpCode:
        return (
          <SuccessActivateAccount
            code={activateSignUpCode}
            lang={params.lang}
          />
        );
      default:
        return <SignUpPasswordForm dict={signUpPassword} />;
    }
  };

  return (
    <main className={cn("container", styles.main)}>{rendererContent()}</main>
  );
}
