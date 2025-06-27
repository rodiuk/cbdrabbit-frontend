"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { PopupWrapper } from "./PopupWrapper";
import ProfileTablet from "./ProfileTablet";
import ProfileMobile from "./ProfileMobile";
import { IUserProfile } from "@/interfaces/user.interface";
import { getUserInfo } from "@/libs/api/user.api";
import {
  ICheckoutDict,
  IProfileDict,
  IRecoveryPasswordDict,
} from "@/interfaces/i18n.interface";
import { Session } from "next-auth";

interface Props {
  currency: string;
  profileDict: IProfileDict;
  recoveryDict: IRecoveryPasswordDict;
  checkoutDict: ICheckoutDict;
  lang: string;
  user: Session["user"] | null;
}

export const ProfileWrapper = (props: Props): React.JSX.Element | null => {
  const { currency, profileDict, checkoutDict, recoveryDict, lang } = props;
  const [user, setUser] = React.useState<IUserProfile | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [actualLay, setActualLay] = React.useState("");
  const searchParams = useSearchParams();

  React.useEffect(() => {
    (async function fetchUser() {
      if (props?.user?.id) {
        const userInfo = await getUserInfo(props?.user?.id);
        setUser(userInfo ?? null);
      }
    })();
  }, [props?.user?.id, searchParams, isOpen]);

  const handleInfoSet = (info: string) => {
    setActualLay(info);
    setIsOpen(!!info);
  };

  if (!user) return <></>;

  return (
    <>
      <ProfileTablet
        user={user}
        currency={currency}
        bottomBlock={handleInfoSet}
        profileDict={profileDict}
        userSession={props.user}
      />

      <ProfileMobile
        user={user}
        profileDict={profileDict}
        currency={currency}
        bottomBlock={handleInfoSet}
        userSession={props.user}
      />

      <PopupWrapper
        isOpen={isOpen}
        actualLay={actualLay}
        handleInfo={handleInfoSet}
        profileDict={profileDict}
        recoveryDict={recoveryDict}
        checkoutDict={checkoutDict}
        user={user}
        lang={lang}
        userSession={props.user}
      />
    </>
  );
};
