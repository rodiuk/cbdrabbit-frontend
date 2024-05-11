"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { ISignInPasswordDict } from "@/interfaces/auth.interface";
import { isAccountActivated } from "@/libs/api/user.api";

import cn from "clsx";
import styles from "./styles.module.css";
import { maskEmailAddress } from "@/utils/maskEmailAddress";

interface Props {
  dict: ISignInPasswordDict;
}

export const SignInPassword = ({ dict }: Props): React.JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userEmail = searchParams?.get("email");
  const [notValid, setNotValid] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [notActivated, setNotActivated] = React.useState<boolean>(false);

  const handleSignIn = async () => {
    setNotActivated(false);
    setNotValid(false);
    if (!password || !userEmail) return setNotValid(true);

    const isAccActive = await isAccountActivated(userEmail);

    if (!isAccActive) return setNotActivated(true);

    const serverResult = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: password,
    });

    if (serverResult?.error || !serverResult?.ok) return setNotValid(true);

    router.push("/profile");
  };

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{dict.title}</h1>
      <p className={styles.descr}>{maskEmailAddress(userEmail ?? "")}</p>
      <Input
        type="password"
        text={dict.inputLabel}
        placeholder={dict.inputPlaceholder}
        isPassword
        password={true}
        value={password}
        onInputChange={setPassword}
      />

      {notValid && <p className={styles.error}>{dict.error}</p>}
      {notActivated && <p className={styles.error}>{dict.errorNotActivated}</p>}

      <div className={cn(styles.bb, styles.two_button)}>
        <Button
          text={dict.buttonBack}
          className="white_button"
          iconLeft={true}
          handleClick={() => router.back()}
        />
        <Button text={dict.buttonSignIn} handleClick={handleSignIn} />
      </div>
    </section>
  );
};
