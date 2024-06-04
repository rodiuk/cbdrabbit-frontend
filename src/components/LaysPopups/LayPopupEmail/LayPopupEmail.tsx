import React from "react";
import { usePathname, useRouter } from "next/navigation";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import Input from "@/components/Ui/Input/Input";
import { IProfileDict } from "@/interfaces/i18n.interface";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import { updateEmailRequest } from "@/libs/api/user.api";
import { useSession } from "next-auth/react";

import s from "./LayPopupEmail.module.css";

interface Props {
  bottomBlock: (e: string) => void;
  dict: IProfileDict;
  lang: string;
}

const LayPopupEmail = (props: Props): React.JSX.Element => {
  const { bottomBlock, dict, lang } = props;
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();
  const [email, setEmail] = React.useState<string>("");
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const maskedEmail = maskEmailAddress(data?.user?.email ?? "");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(email);

  const handleChangeEmail = async () => {
    if (!email?.length || !validEmail || !data?.user?.email)
      return setHasError(true);

    try {
      setIsLoading(true);

      const res = await updateEmailRequest(data.user.email, email, lang);
      if ("error" in res) return setHasError(true);

      router.push(pathname + `?newEmail=${email}`);
      bottomBlock("successChangeEmail");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let status = "2";

  const handleBadkdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      bottomBlock("");
    }
  };

  return (
    <div className={s.overl} onClick={e => handleBadkdropClick(e)}>
      <div className={s.content}>
        <div className={s.lay_wrap}>
          <div className={s.container}>
            {status === "1" ? (
              <div className={s.flexLay}>
                <div className={s.lay_ttl}>
                  <p>
                    {dict.changeEmailTitle}
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

                <div className={s.lay_text}>
                  <p>
                    {dict.changeEmailSubtitle} {maskedEmail}
                  </p>
                </div>
                <Input
                  type="text"
                  text={dict.changeEmailInputLabel}
                  placeholder={dict.changeEmailInputPlaceholder}
                  onInputChange={setEmail}
                  errorText={hasError ? dict.changeEmailInputError : undefined}
                />
                <div className={s.buttonBlock}>
                  <p className={s.bbt}>{dict.changeEmailSecondSubtitle}</p>
                  <ButtonWhite
                    text={isLoading ? "Loading" : dict.changeEmailBtn}
                    handleClick={handleChangeEmail}
                    isDisabled={isLoading}
                  />
                </div>
              </div>
            ) : status === "2" ? (
              <div className={s.flexLay}>
                <div className={s.lay_ttl}>
                  <p>
                    {dict.changeEmailTitle}
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

                <div className={s.lay_text}>
                  <p>
                    {dict.changeEmailSubtitle} {maskedEmail}
                  </p>
                </div>
                <Input
                  type="text"
                  text={dict.changeEmailInputLabel}
                  placeholder={dict.changeEmailInputPlaceholder}
                  onInputChange={setEmail}
                  errorText={hasError ? dict.changeEmailInputError : undefined}
                />
                <div className={s.buttonBlock}>
                  <p className={s.bbt}>{dict.changeEmailSecondSubtitle}</p>
                  <ButtonWhite
                    text={isLoading ? "Loading..." : dict.changeEmailBtn}
                    handleClick={handleChangeEmail}
                    isDisabled={isLoading}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayPopupEmail;
