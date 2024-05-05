"use client";

import React from "react";
import Image from "next/image";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";
import { maskEmailAddress } from "@/utils/maskEmailAddress";

import ok from "/public/img/ok.svg";

import cn from "clsx";
import s from "./LayPopupPassRecoverySuccess.module.css";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IRecoveryPasswordDict;
  email: string;
}

const LayPopupPassRecoverySuccess = (props: Props): React.JSX.Element => {
  const { bottomBlock, dict, email } = props;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  const mailDomain = email?.split("@")[1] ?? "https://google.com";

  return (
    <div className={s.overl} onClick={e => handleBackdropClick(e)}>
      <div className={s.content}>
        <div className={s.lay_wrap}>
          <div className={s.container}>
            <div className={s.flexLay}>
              <div className={s.lay_ttl}>
                <ArrowLeftIcon
                  handleClick={() => bottomBlock("password")}
                  iconStyle={s.back}
                />
                <p className={s.title}>{dict.titleSuccess}</p>
                <span className={s.close} onClick={() => bottomBlock("")}>
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
    </div>
  );
};

export default LayPopupPassRecoverySuccess;
