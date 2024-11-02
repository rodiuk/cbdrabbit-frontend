"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Locale } from "../../../../i18n.config";
import Button from "@/components/Ui/Button/Button";
import { resetPasswordService } from "@/libs/api/user.api";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";

import cn from "clsx";
import s from "./style.module.css";

interface Props {
  email: string;
  dict: IRecoveryPasswordDict;
  lang: Locale;
  backLabel: string;
}

export const AskRecoveryPassword = (props: Props): React.JSX.Element => {
  const { dict, email, lang, backLabel } = props;

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendRecoveryEmail = async () => {
    try {
      setIsLoading(true);
      const res = await resetPasswordService(email, lang);

      if ("id" in res)
        return router.push(`signIn?sendResetPasswordSuccess=${email}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.content}>
      <div className={s.lay_wrap}>
        <div className={s.container}>
          <div className={s.flexLay}>
            <div className={s.lay_ttl}>
              <p className={s.title}>{dict.titleAskNew}</p>
            </div>

            <p className={s.message}>{dict.messageAsk}</p>

            <p className={s.email}>{maskEmailAddress(email)}</p>

            <div className={cn("button-block", s.submit)}>
              <ButtonWhite
                text={backLabel}
                handleClick={() => router.push(`signIn?email=${email}`)}
                iconLeft
              />
              <Button
                text={dict.buttonAsk}
                handleClick={handleSendRecoveryEmail}
                isDisabled={isLoading}
                isLoading={isLoading}
                greenThemeLoader
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
