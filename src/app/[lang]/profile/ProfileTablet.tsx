"use client";

import React from "react";
import Image from "next/image";
import PencilIcon from "@/components/icons/PencilIcon";
import ProfileDetail from "../../../components/Profile/ProfileDetail/ProfileDetail";
import { ArrowDownIcon } from "@/components/icons/ArrowDown";
import { IUserProfile } from "@/interfaces/user.interface";
import { maskEmailAddress } from "@/utils/maskEmailAddress";
import { IProfileDict } from "@/interfaces/i18n.interface";
import { useSession } from "next-auth/react";
import { UserDeliveryInfoSection } from "@/components/UserDeliveryInfoSection/UserDeliveryInfoSection";
import ProfileDetailMax from "@/components/Profile/ProfileDetailMax/ProfileDetailMax";

import s from "./page.module.css";

import np from "/public/img/np.svg";

interface Props {
  user: IUserProfile | null;
  currency: string;
  bottomBlock: (info: string) => void;
  profileDict: IProfileDict;
}

const ProfileTablet = (props: Props) => {
  const { user, currency, bottomBlock, profileDict } = props;
  const { data } = useSession();
  const [showDetail, setShowDetail] = React.useState(true);
  const maskedEmail = maskEmailAddress(data?.user?.email ?? "");

  let maxSale = 12;

  return (
    <div className={s.wrap}>
      <div className={s.wrap_left}>
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
            {!!user?.password?.length
              ? profileDict.passwordExist
              : profileDict.passwordNotExist}
          </p>
        </div>
        <div className={s.wrapper_wrap_tal}>
          <div className={s.h2}>
            {profileDict.deliveryTitle}

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

          <button
            className={s.buttonRed}
            onClick={() => bottomBlock("deleteAccount")}
          >
            {profileDict.deleteAccountBtn}
          </button>
        </div>
      </div>
      <div className={s.wrap_right}>
        <div className={s.wrapper_wrap}>
          <div className={s.wrapper_ttl}>
            <p>{profileDict.personalDiscountTitle}</p>
          </div>
          <div className={s.wrapper_big}>
            <p>{user?.loyalty?.percentDiscount}%</p>
          </div>

          <div className={s.profile_details}>
            {(user?.loyalty?.percentDiscount ?? 0) < maxSale && (
              <p
                className={s.profile_detailsOne}
                onClick={() => setShowDetail(!showDetail)}
              >
                {profileDict.personalDiscountLabel}
                <ArrowDownIcon iconStyle={s.arr} />
              </p>
            )}

            {(user?.loyalty?.percentDiscount ?? 0) < maxSale ? (
              <>
                {showDetail && (
                  <ProfileDetail
                    user={user}
                    currency={currency}
                    dict={profileDict}
                  />
                )}
              </>
            ) : (
              <>
                {showDetail && (
                  <ProfileDetailMax
                    user={user}
                    currency={currency}
                    dict={profileDict}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTablet;
