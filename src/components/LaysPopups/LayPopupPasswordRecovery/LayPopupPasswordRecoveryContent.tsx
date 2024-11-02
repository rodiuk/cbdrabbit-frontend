import React from "react";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";
import { IRecoveryPasswordDict } from "@/interfaces/i18n.interface";

import cn from "clsx";
import s from "./LayPopupPasswordRecovery.module.css";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IRecoveryPasswordDict;
  email: string;
  isLoading: boolean;
  handleSendRecoveryEmail: () => void;
}

export const LayPopupPasswordRecoveryContent = (
  props: Props
): React.JSX.Element => {
  const { bottomBlock, dict, email, isLoading, handleSendRecoveryEmail } =
    props;

  return (
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
  );
};
