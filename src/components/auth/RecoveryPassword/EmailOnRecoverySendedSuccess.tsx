"use client";

import React from "react";
import Image from "next/image";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";

import ok from "/public/img/mail.png";

import cn from "clsx";
import s from "./style.module.css";

interface Props {
  dict: IRecoveryPasswordDict;
  email: string;
}

export const EmailOnRecoverySendedSuccess = (
  props: Props
): React.JSX.Element => {
  const { dict, email } = props;

  const mailDomain = email?.split("@")[1] ?? "https://google.com";

  return (
    <div className={s.content}>
      <div className={s.lay_wrap}>
        <div className={s.container}>
          <div className={s.flexLay}>
            <div className={s.lay_ttl}>
              <p className={s.title}>{dict.titleSuccess}</p>
            </div>

            <div className={s.img_center}>
              <Image
                src={ok.src}
                alt="Decorate icon"
                width={206}
                height={169}
              />
            </div>

            <p className={s.message}>{dict.messageSuccess}</p>

            <p className={s.email}>{maskEmailAddress(email)}</p>

            <p className={s.label}>{dict.labelSuccess}</p>

            <div className={cn("button-block", s.submit)}>
              <ButtonWhite
                text={dict.buttonSuccess}
                handleClick={() =>
                  window.open(`https://${mailDomain}`, "_blank")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
