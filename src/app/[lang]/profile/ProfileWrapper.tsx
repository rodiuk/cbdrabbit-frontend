"use client";

import React from "react";
import { PopupWrapper } from "./PopupWrapper";
import ProfileTablet from "./ProfileTablet";
import ProfileMobile from "./ProfileMobile";
import { useSession } from "next-auth/react";
import { IUserProfile } from "@/interfaces/user.interface";
import { deleteAccount, getUserInfo } from "@/libs/api/user.api";
import { signOut } from "next-auth/react";
import { ICheckoutDict, IProfileDict } from "@/interfaces/i18n.interface";
import { useSearchParams } from "next/navigation";

interface Props {
  currency: string;
  profileDict: IProfileDict;
  checkoutDict: ICheckoutDict;
}

export const ProfileWrapper = (props: Props): React.JSX.Element => {
  const { currency, profileDict, checkoutDict } = props;
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
  }, [data?.user?.id, searchParams]);

  const handleInfoSet = (info: string) => {
    setActualLay(info);
    setIsOpen(!isOpen);
  };

  const handleDeleteAccount = async () => {
    try {
      if (!data?.user?.id) return;

      signOut();
      await deleteAccount(data?.user?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProfileTablet
        user={user}
        currency={currency}
        bottomBlock={handleInfoSet}
        profileDict={profileDict}
        handleDeleteAccount={handleDeleteAccount}
      />

      <ProfileMobile
        user={user}
        profileDict={profileDict}
        currency={currency}
        bottomBlock={handleInfoSet}
        handleDeleteAccount={handleDeleteAccount}
      />

      <PopupWrapper
        isOpen={isOpen}
        actualLay={actualLay}
        handleInfo={handleInfoSet}
        profileDict={profileDict}
        checkoutDict={checkoutDict}
        user={user}
      />
    </>
  );
};
