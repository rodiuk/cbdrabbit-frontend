"use client";

import React from "react";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { updatePasswordByCode } from "@/libs/api/user.api";
import { ISignUpPasswordDict } from "@/interfaces/auth.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./styles.module.css";

interface Props {
  dict: ISignUpPasswordDict;
  title: string;
  btnText: string;
}

export const RecoveryPassword = ({
  dict,
  title,
  btnText,
}: Props): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const code = searchParams?.get("resetPassword");

  const [password1, setPassword1] = React.useState<string>("");
  const [password2, setPassword2] = React.useState<string>("");
  const [notMatch, setNotMatch] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleUpdatePassword = async () => {
    if (!code) return router.back();

    if (password1 !== password2) return setNotMatch(true);

    try {
      setIsLoading(true);
      const res = await updatePasswordByCode(code, password1);

      if ("error" in res) return setError(JSON.stringify(res.error));

      if ("email" in res) router.push(pathname + `?resetSuccess=true`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.lay_item}>
      <h1 className={styles.ttl}>{title}</h1>
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
          text={btnText}
          handleClick={handleUpdatePassword}
          isLoading={isLoading}
          isDisabled={isLoading}
          greenThemeLoader
        />
      </div>
    </section>
  );
};
