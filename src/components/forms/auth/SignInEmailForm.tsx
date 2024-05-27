"use client";

import React from "react";
import Image from "next/image";
import Input from "@/components/Ui/Input/Input";
import Button from "@/components/Ui/Button/Button";
import { GoogleButton } from "@/components/GoogleButton/GoogleButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/createQueryString";
import { ISignInEmailDict } from "@/interfaces/auth.interface";
import { checkIsUserExistByEmail } from "@/libs/api/user.api";

import icon_1 from "/public/img/icon_1.svg";

import styles from "./styles.module.css";
import Link from "next/link";

interface Props {
  dict: ISignInEmailDict;
}
 
export const SignInEmailForm = ({ dict }: Props): React.JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");

  const handleCheckEmail = async () => {
    if (!email) return;

    const isExist = await checkIsUserExistByEmail(email);

    if (isExist) {
      return router.push(
        pathname + `?${handleCreateQueryString("email", email)}`
      );
    }
    router.push(pathname + `?${handleCreateQueryString("notExist", email)}`);
  };

  const handleCreateQueryString = React.useCallback(
    (name: string, value: string) => {
      return createQueryString(searchParams, name, value);
    },
    [searchParams]
  );

  return (
    <section className={styles.lay_item}>
      <div className={styles.ttl}>{dict?.title}</div>
      <div className={styles.img_center}>
        <Image src={icon_1.src} width={256} height={256} alt="icon_1" />
      </div>
      <Input
        type="email"
        name="email"
        placeholder={dict?.inputPlaceholder}
        text={dict?.inputLabel}
        value={email}
        onInputChange={setEmail}
      />
      <div className={styles.bb}>
        <Button text={dict?.button} handleClick={handleCheckEmail} />
      </div>

      <span className={styles.divider_label}>{dict?.buttonDividerLabel}</span>

		  <GoogleButton label={dict?.buttonGoogle} />
		  <div className={styles.add_akk}>
			  <Link href="/" className={styles.akk}>
			  Створити акаунт
			  </Link>
		  </div>
    </section>
  );
};
