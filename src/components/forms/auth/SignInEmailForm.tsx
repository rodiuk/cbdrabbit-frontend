"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { createQueryString } from "@/utils/createQueryString";
import { checkIsUserExistByEmail } from "@/libs/api/user.api";
import { ISignInEmailDict } from "@/interfaces/auth.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GoogleButton = dynamic(
  () => import("@/components/GoogleButton/GoogleButton"),
  { ssr: false }
);

import icon_1 from "/public/img/icon_1.svg";

import styles from "./styles.module.css";
import dynamic from "next/dynamic";

interface Props {
  dict: ISignInEmailDict;
  hideTitle?: boolean;
  externalPath?: string;
  externalUse?: boolean;
}

export const SignInEmailForm = ({
  dict,
  hideTitle,
  externalPath,
  externalUse,
}: Props): React.JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showError, setShowError] = React.useState<boolean>(false);

  const handleCheckEmail = async () => {
    setIsLoading(true);
    setShowError(false);

    try {
      if (!email) return;

      const isExist = await checkIsUserExistByEmail(email);

      if (isExist) {
        return router.push(
          pathname + `?${handleCreateQueryString("email", email)}`
        );
      }
      !externalUse &&
        router.push(
          pathname + `?${handleCreateQueryString("notExist", email)}`
        );

      externalUse && setShowError(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQueryString = React.useCallback(
    (name: string, value: string) => {
      return createQueryString(searchParams, name, value);
    },
    [searchParams]
  );

  return (
    <section className={styles.lay_item}>
      {!hideTitle && (
        <>
          <div className={styles.ttl}>{dict?.title}</div>
          <div className={styles.img_center}>
            <Image src={icon_1.src} width={256} height={256} alt="icon_1" />
          </div>
        </>
      )}

      <Input
        type="email"
        name="email"
        placeholder={dict?.inputPlaceholder}
        text={dict?.inputLabel}
        value={email}
        onInputChange={setEmail}
        errorText={showError ? "Такого корситувача не існує" : undefined}
      />
      <div className={styles.bb}>
        <Button
          text={dict?.button}
          isLoading={isLoading}
          isDisabled={isLoading}
          greenThemeLoader
          handleClick={handleCheckEmail}
        />
      </div>

      <span className={styles.divider_label}>{dict?.buttonDividerLabel}</span>

      <GoogleButton label={dict?.buttonGoogle} externalPath={externalPath} />
      {/* <div className={styles.add_akk}>
			  <Link href="/" className={styles.akk}>
			  Створити акаунт
			  </Link>
		  </div> */}
    </section>
  );
};
