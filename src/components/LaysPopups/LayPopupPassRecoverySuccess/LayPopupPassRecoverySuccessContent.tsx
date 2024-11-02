"use client";

import React from "react";
import Image from "next/image";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";

import ok from "/public/img/ok.jpg";

import cn from "clsx";
import s from "./LayPopupPassRecoverySuccess.module.css";

interface Props {
  onHandleBack?: () => void;
  onHandleClose?: () => void;
  dict: IRecoveryPasswordDict;
  email: string;
}

export const LayPopupPassRecoverySuccessContent = (
  props: Props
): React.JSX.Element => {
  const { onHandleBack, onHandleClose, dict, email } = props;

  const mailDomain = email?.split("@")[1] ?? "https://google.com";

  return (
    <div className={s.content}>
      <div className={s.lay_wrap}>
        <div className={s.container}>
          <div className={s.flexLay}>
            <div className={s.lay_ttl}>
              {onHandleBack && (
                <ArrowLeftIcon handleClick={onHandleBack} iconStyle={s.back} />
              )}
              <p className={s.title}>{dict.titleSuccess}</p>

              {onHandleClose && (
                <span className={s.close} onClick={onHandleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16 4L4 16M4 4L16 16"
                      stroke="#98979A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
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
