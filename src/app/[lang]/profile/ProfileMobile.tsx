"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/Ui/Button/Button";
import PencilIcon from "@/components/icons/PencilIcon";
import ProfileDetail from "../../../components/Profile/ProfileDetail/ProfileDetail";
import { ArrowDownIcon } from "@/components/icons/ArrowDown";
import { IUserProfile } from "@/interfaces/user.interface";
import { IProfileDict } from "@/interfaces/i18n.interface";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import { UserDeliveryInfoSection } from "@/components/UserDeliveryInfoSection/UserDeliveryInfoSection";

import np from "/public/img/np.svg";

import s from "./page.module.css";

interface Props {
  user: IUserProfile | null;
  profileDict: IProfileDict;
  currency: string;
  bottomBlock: (info: string) => void;
}

const ProfileMobile = (props: Props): React.JSX.Element => {
  const { user, profileDict, currency, bottomBlock } = props;
  const { data } = useSession();
  const [showDetail, setShowDetail] = React.useState(true);

  const maskedEmail = maskEmailAddress(data?.user?.email ?? "");

  return (
    <div className={s.wrap_mobile}>
      <div className={s.wrapper_wrap}>
        <div className={s.wrapper_ttl}>
          <h1>{profileDict.personalDiscountTitle}</h1>
        </div>
        <div className={s.wrapper_big}>
          <p>{user?.loyalty?.percentDiscount}%</p>
        </div>
        <div
          className={s.profile_details}
          onClick={() => setShowDetail(!showDetail)} /* onClick={toggleBlock} */
        >
          <p className={s.profile_detailsOne}>
            {profileDict.personalDiscountLabel}{" "}
            <ArrowDownIcon iconStyle={s.arr} />
          </p>
          {showDetail && (
            <ProfileDetail dict={profileDict} user={user} currency={currency} />
          )}
        </div>
      </div>

      <div className={s.wrapper_wrap_tal}>
        <div className={s.h2}>
          Email
          <span className={s.pencil} onClick={() => bottomBlock("email")}>
            <PencilIcon />
          </span>
        </div>
        <p>{maskedEmail}</p>
      </div>

      <div className={s.wrapper_wrap_tal}>
        <div className={s.h2}>
          {profileDict.userPasswordTitle}
          <span className={s.pencil} onClick={() => bottomBlock("password")}>
            <PencilIcon />
          </span>
        </div>
        <p>
          {!user?.password?.length
            ? profileDict.passwordNotExist
            : profileDict.passwordExist}
        </p>
      </div>
      <div className={s.wrapper_wrap_tal}>
        <div className={s.h2}>
          {profileDict.deliveryTitle}{" "}
          <span className={s.pencil} onClick={() => bottomBlock("delivery")}>
            <PencilIcon />
          </span>
        </div>
        <div className={s.checkoutBlock_grey}>
          <p>{profileDict.deliveryDisclaimer}</p>
        </div>
        <UserDeliveryInfoSection user={user} profileDict={profileDict} />
        <div className={s.checkoutBlock_np}>
          <Image src={np} alt="np" />
          <div className={s.checkoutBlock_ttl}>{profileDict.npLabel}</div>
        </div>
      </div>

      <div className={s.wrapper_wrap_tal}>
        <div className={s.h2}>{profileDict.deleteAccount}</div>
        <Button
          handleClick={() => bottomBlock("deleteAccount")}
          text={profileDict.deleteAccountBtn}
          className={s.buttonRed}
        />
      </div>
    </div>
  );
};

export default ProfileMobile;
