"use client";

import React from "react";
import Input from "@/components/Ui/Input/Input";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { IProfileDict } from "@/interfaces/i18n.interface";
import { IUserProfile } from "@/interfaces/user.interface";
import { createPassword, updatePassword } from "@/libs/api/user.api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import s from "./LayPopupPassword.module.css";
import ValidationPassword from "./ValidationPassword/ValidationPassword";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IProfileDict;
  user: IUserProfile | null;
}

const LayPopupPassword = (props: Props): React.JSX.Element => {
  const { bottomBlock, dict, user } = props;
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [notMatch, setNotMatch] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const hasPassword = user?.password && user?.password?.length > 0;

  const handleCreatePassword = async () => {
    try {
      setIsLoading(true);
      if (
        !newPassword?.length ||
        !confirmPassword?.length ||
        newPassword !== confirmPassword
      )
        return setNotMatch(true);

      const res = await createPassword(user?.id!, newPassword);
      if ("error" in res) return setPasswordError(true);

      bottomBlock("");
      router.push(`${pathname}?password=true`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
      if (
        !newPassword?.length ||
        !oldPassword?.length ||
        !newPassword?.length ||
        !confirmPassword?.length ||
        newPassword !== confirmPassword
      )
        return setNotMatch(true);

      const res = await updatePassword(user?.id!, newPassword, oldPassword);
      if ("error" in res) return setPasswordError(true);

      bottomBlock("");
      router.push(`${pathname}?password=true`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (hasPassword) {
      await handleChangePassword();
    } else {
      await handleCreatePassword();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  return (
    <div className={s.overl} onClick={e => handleBackdropClick(e)}>
      <div className={s.content}>
        <div className={s.lay_wrap}>
          <div className={s.container}>
            <div className={s.flexLay}>
              <div className={s.lay_ttl}>
                <p>
                  {dict.changePasswordLabel}
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
                </p>
              </div>

              {hasPassword && (
                <Input
                  type="text"
                  text={dict.changePasswordOldInputLabel}
                  placeholder={dict.changePasswordOldInputPlaceholder}
                  isPassword
                  handleForgot={() => bottomBlock("recoveryAsk")}
                  showForgotPassword
                  password={true}
                  errorText={
                    passwordError ? dict.changePasswordOldInputError : undefined
                  }
                  value={oldPassword}
                  onInputChange={setOldPassword}
                />
              )}

              <Input
                type="text"
                text={dict.changePasswordNewFirstLabel}
                placeholder={dict.changePasswordNewFirstPlaceholder}
                value={newPassword}
                isPassword
                onInputChange={setNewPassword}
						  />
						  
						  <ValidationPassword />

              <Input
                type="text"
                placeholder={dict.changePasswordNewSecondLabel}
                errorText={
                  notMatch ? dict.changePasswordNewInputError : undefined
                }
                value={confirmPassword}
                isPassword
                onInputChange={setConfirmPassword}
              />

              <div className="button-block">
                <ButtonWhite
                  text={isLoading ? "Loading..." : dict.changePasswordBtn}
                  handleClick={handleUpdate}
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

export default LayPopupPassword;
