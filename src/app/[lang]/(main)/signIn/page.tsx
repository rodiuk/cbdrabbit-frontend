import React from "react";
import { getDictionary } from "@/libs/18n/getDictionary";
import { IMainPageProps } from "@/interfaces/page.interface";
import { SuccessAction } from "@/components/auth/SuccessAction";
// import  SignInPassword  from "@/components/forms/auth/SignInPassword";

import { SignInEmailForm } from "@/components/forms/auth/SignInEmailForm";
import { SuccessEmailChange } from "@/components/auth/SuccessEmailChange";
import { RecoveryPassword } from "@/components/forms/auth/RecoveryPassword";
import { SignUpPasswordForm } from "@/components/forms/auth/SignUpPasswordForm";
import { SignInNotExistEmail } from "@/components/forms/auth/SignInNotExistEmail";
import { AskRecoveryPassword } from "@/components/auth/RecoveryPassword/AskRecoveryPassword";
import { EmailOnRecoverySendedSuccess } from "@/components/auth/RecoveryPassword/EmailOnRecoverySendedSuccess";

const SignInPassword = dynamic(
  () => import("@/components/forms/auth/SignInPassword"),
  { ssr: false }
);

import cn from "clsx";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

export default async function About({ params, searchParams }: IMainPageProps) {
  const email = searchParams?.email;
  const notExist = searchParams?.notExist;
  const signUp = searchParams?.signUp;
  const resetPassword = searchParams?.resetPassword;
  const sendResetPassword = searchParams?.sendResetPassword;
  const sendResetPasswordSuccess = searchParams?.sendResetPasswordSuccess;
  const resetSuccess = searchParams?.resetSuccess;
  const changeEmail = searchParams?.changeEmail;

  const dict = await getDictionary(params.lang);
  const {
    signInEmail,
    signInPassword,
    signUpPassword,
    signInNotExist,
    general,
  } = dict?.auth;

  const rendererContent = () => {
    switch (true) {
      case !!email:
        return <SignInPassword dict={signInPassword} />;
      case !!notExist:
        return <SignInNotExistEmail lang={params.lang} dict={signInNotExist} />;
      case !!signUp:
        return <SignUpPasswordForm dict={signUpPassword} />;
      case !!sendResetPassword:
        return (
          <AskRecoveryPassword
            email={sendResetPassword}
            dict={dict.recoveryPassword}
            lang={params.lang}
            backLabel={dict.auth.signInPassword.buttonBack}
          />
        );
      case !!sendResetPasswordSuccess:
        return (
          <EmailOnRecoverySendedSuccess
            email={sendResetPasswordSuccess}
            dict={dict.recoveryPassword}
          />
        );
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
