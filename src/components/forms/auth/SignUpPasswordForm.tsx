"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { ISignUpPasswordDict } from "@/interfaces/auth.interface";
import { createUser } from "@/libs/api/user.api";

import styles from "./styles.module.css";

interface Props {
  dict: ISignUpPasswordDict;
}

export const SignUpPasswordForm = ({ dict }: Props): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userEmail = searchParams?.get("email");

  const [password1, setPassword1] = React.useState<string>("");
  const [password2, setPassword2] = React.useState<string>("");
  const [notMatch, setNotMatch] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSignUp = async () => {
    if (!userEmail) return router.back();

    if (password1 !== password2) return setNotMatch(true);
    try {
      setIsLoading(true);
      const user = await createUser({
        email: userEmail,
        password: password1,
        phoneNumber: "",
      });

      if (!user || "error" in user) return setError(user.error);

      if ("email" in user) router.push(pathname + `?registered=${user.email}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{dict.title}</h1>
      <div className={styles.descr}>{userEmail}</div>
      <Input
        type="password"
        placeholder={dict.firstInputPlaceholder}
        password={true}
        isPassword
        value={password1}
        onInputChange={setPassword1}
      />
      <Input
        type="password"
        placeholder={dict.secondInputPlaceholder}
        password={true}
        isPassword
        value={password2}
        onInputChange={setPassword2}
      />

      {notMatch && <p className={styles.error}>{dict.error}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.bb}>
        <Button
          text={isLoading ? "Loading..." : dict.buttonSignUp}
          handleClick={handleSignUp}
        />
      </div>
    </section>
  );
};
