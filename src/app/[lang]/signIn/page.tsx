import React from "react";
import { SignInEmailForm } from "@/components/forms/auth/SignInEmailForm";
import { IMainPageProps } from "@/interfaces/page.interface";
import { SignInNotExistEmail } from "@/components/forms/auth/SignInNotExistEmail";
import { SignInPassword } from "@/components/forms/auth/SignInPassword";
import { getDictionary } from "@/libs/18n/getDictionary";
import { SignUpPasswordForm } from "@/components/forms/auth/SignUpPasswordForm";
import { SuccessAction } from "@/components/auth/SuccessAction";
import { RecoveryPassword } from "@/components/forms/auth/RecoveryPassword";
import { SuccessEmailChange } from "@/components/auth/SuccessEmailChange";

import cn from "clsx";
import styles from "./page.module.css";

export default async function About({ params, searchParams }: IMainPageProps) {
  const email = searchParams?.email;
  const notExist = searchParams?.notExist;
  const signUp = searchParams?.signUp;
  const resetPassword = searchParams?.resetPassword;
  const resetSuccess = searchParams?.resetSuccess;
  const changeEmail = searchParams?.changeEmail;

  const {
    signInEmail,
    signInNotExist,
    signUpPassword,
    signInPassword,
    general,
  } = (await getDictionary(params.lang)).auth;

  const rendererContent = () => {
    switch (true) {
      case !!email:
        return <SignInPassword dict={signInPassword} />;
      case !!notExist:
        return <SignInNotExistEmail lang={params.lang} dict={signInNotExist} />;
      case !!signUp:
        return <SignUpPasswordForm dict={signUpPassword} />;
      case !!resetPassword:
        return (
          <RecoveryPassword
            dict={signUpPassword}
            title={general.updatePassTitle}
            btnText={general.updatePassButton}
          />
        );
      case !!changeEmail:
        return (
          <SuccessEmailChange
            lang={params.lang}
            btnText={general.successPassUpdateBtn}
            title={general.successEmailUpdateMessage}
          />
        );
      case !!resetSuccess:
        return (
          <SuccessAction
            lang={params.lang}
            btnText={general.successPassUpdateBtn}
            title={general.successPassUpdateMessage}
          />
        );
      default:
        return <SignInEmailForm dict={signInEmail} />;
    }
  };

  return (
    <main className={cn("container", styles.main)}>{rendererContent()}</main>
  );
}
