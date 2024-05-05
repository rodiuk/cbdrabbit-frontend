"use client";

import React from "react";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";
import { resetPassword } from "@/libs/api/user.api";
import { maskEmailAddress } from "@/utils/maskEmailAddress";

import cn from "clsx";
import s from "./LayPopupPasswordRecovery.module.css";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IRecoveryPasswordDict;
  email: string;
}

const LayPopupPasswordRecovery = (props: Props): React.JSX.Element => {
  const { bottomBlock, dict, email } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  const handleSendRecoveryEmail = async () => {
    try {
      setIsLoading(true);
      const res = await resetPassword(email);

      if ("id" in res) return bottomBlock("successResetPassword");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
                <p className={s.title}>{dict.titleAsk}</p>
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

              <p className={s.message}>{dict.messageAsk}</p>

              <p className={s.email}>{maskEmailAddress(email)}</p>

              <div className={cn("button-block", s.submit)}>
                <ButtonWhite
                  text={isLoading ? "Loading..." : dict.buttonAsk}
                  handleClick={handleSendRecoveryEmail}
                  isDisabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayPopupPasswordRecovery;
