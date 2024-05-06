"use client";

import React from "react";
import { PopupWrapper } from "./PopupWrapper";
import ProfileTablet from "./ProfileTablet";
import ProfileMobile from "./ProfileMobile";
import { useSession } from "next-auth/react";
import { IUserProfile } from "@/interfaces/user.interface";
import { getUserInfo } from "@/libs/api/user.api";
import {
  ICheckoutDict,
  IProfileDict,
  IRecoveryPasswordDict,
} from "@/interfaces/i18n.interface";
import { useSearchParams } from "next/navigation";

interface Props {
  currency: string;
  profileDict: IProfileDict;
  recoveryDict: IRecoveryPasswordDict;
  checkoutDict: ICheckoutDict;
}

export const ProfileWrapper = (props: Props): React.JSX.Element => {
  const { currency, profileDict, checkoutDict, recoveryDict } = props;
  const { data } = useSession();
  const [user, setUser] = React.useState<IUserProfile | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [actualLay, setActualLay] = React.useState("");
  const searchParams = useSearchParams();

  React.useEffect(() => {
    (async function fetchUser() {
      if (data?.user?.id) {
        const userInfo = await getUserInfo(data.user.id);
        setUser(userInfo ?? null);
      }
    })();
  }, [data?.user?.id, searchParams, isOpen]);

  const handleInfoSet = (info: string) => {
    setActualLay(info);
    setIsOpen(!!info);
  };

  return (
    <>
      <ProfileTablet
        user={user}
        currency={currency}
        bottomBlock={handleInfoSet}
        profileDict={profileDict}
      />

      <ProfileMobile
        user={user}
        profileDict={profileDict}
        currency={currency}
        bottomBlock={handleInfoSet}
      />

      <PopupWrapper
        isOpen={isOpen}
        actualLay={actualLay}
        handleInfo={handleInfoSet}
        profileDict={profileDict}
        recoveryDict={recoveryDict}
        checkoutDict={checkoutDict}
        user={user}
      />
    </>
  );
};
