import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { deleteAccount } from "@/libs/api/user.api";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import ButtonRed from "@/components/Ui/Button/ButtonRed";
import { IProfileDict } from "@/interfaces/i18n.interface";

import cn from "clsx";
import s from "./LayPopupDeleteAkk.module.css";

import deleteAkkIcon from "/public/img/deleteAkk.svg";
import { Session } from "next-auth";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IProfileDict;
  user: Session["user"] | null;
}

const LayPopupDeleteAkk = ({ bottomBlock, dict, user }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);

      await deleteAccount(user?.id);
      signOut();
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
              <div className={cn("lay_ttl", s.header)}>
                <p>{dict.deleteAccount}</p>
                <span className="close" onClick={() => bottomBlock("")}>
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
              <div className={cn("lay_img", s.img)}>
                <Image src={deleteAkkIcon} alt="Delete decorate image" />
              </div>
              <div className={s.lay_text}>
                <p>{dict.askDeleteAccount}</p>
              </div>
              <div className={cn("button-block", s.buttons)}>
                <ButtonWhite
                  text={dict.cancelDeleteAccount}
                  handleClick={() => bottomBlock("")}
                />
                <ButtonRed
                  text={isLoading ? "Loading..." : dict.confirmDeleteAccount}
                  handleClick={handleDeleteAccount}
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

export default LayPopupDeleteAkk;
