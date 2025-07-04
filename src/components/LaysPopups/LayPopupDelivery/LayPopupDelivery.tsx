"use client";

import React from "react";
import Image from "next/image";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import NovaPost from "@/components/NovaPoshta/NovaPoshta";
import { ICheckoutDict, IProfileDict } from "@/interfaces/i18n.interface";
import Button from "@/components/Ui/Button/Button";
import ButtonRed from "@/components/Ui/Button/ButtonRed";
import { getUserInfo, updateDeliveryInfo } from "@/libs/api/user.api";
import { npDeliveryType } from "@/components/NovaPoshta/npDelivery";

import s from "./LayPopupDelivery.module.css";

import np from "/public/img/np.svg";
import UserCheckoutFormRow from "@/components/UserCheckoutFormRow/UserCheckoutFormRow";
import { Session } from "next-auth";

interface Props {
  bottomBlock: (e: string) => void;
  profileDict: IProfileDict;
  checkoutDict: ICheckoutDict;
  user: Session["user"] | null;
}

const LayPopupDelivery = (props: Props): React.JSX.Element => {
  const { bottomBlock, profileDict, checkoutDict } = props;
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [city, setCity] = React.useState("");
  const [postPoint, setPostPoint] = React.useState("");
  const [deliveryId, setDeliveryId] = React.useState("");
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);
  const [isLoadingReset, setIsLoadingReset] = React.useState(false);
  const [deliveryAddress, setDeliveryAddress] = React.useState<string>("");

  React.useEffect(() => {
    (async function fetchUser() {
      try {
        if (!props?.user?.id) return;
        const res = await getUserInfo(props.user.id);
        setUserInfo({
          firstName: res?.firstName ?? "",
          lastName: res?.lastName ?? "",
          phone: res?.address?.phoneNumber ?? "",
          email: res?.email ?? "",
        });
        setCity(res?.address?.city ?? "");
        setPostPoint(res?.address?.npDepartment ?? "");
        setDeliveryId(res?.address?.npDeliveryType ?? "");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props?.user?.id]);

  const handleUpdateDelivery = async () => {
    try {
      if (!props?.user?.id) return;
      setIsLoadingSave(true);
      const payload = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phone,
        city: city,
        npDepartment: postPoint,
        npDeliveryType:
          npDeliveryType.filter(item => item.id === deliveryId)[0]?.text ??
          deliveryId,
      };

      await updateDeliveryInfo(props.user.id, payload);
      bottomBlock("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSave(false);
    }
  };

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
            <div className={s.lay_ttl}>
              <p>
                {profileDict.changeDeliveryLabel}
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
            <UserCheckoutFormRow
              dict={checkoutDict}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            />

            <div className={s.checkoutBlock_np}>
              <div className={s.lay_ttl2}>Доставка</div>
              <Image src={np} alt="np" />
              <div className={s.checkoutBlock_ttl}>{profileDict.npLabel}</div>
            </div>
            <NovaPost
              city={city}
              setCity={setCity}
              postPoint={postPoint}
              setPostPoint={setPostPoint}
              deliveryId={deliveryId}
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
              setDeliveryId={setDeliveryId}
            />
            <div className={s.buttons}>
              <div className={s.buttonBlock}>
                <ButtonRed
                  isDisabled={isLoadingReset}
                  handleClick={() => bottomBlock("deleteDelivery")}
                  text={
                    isLoadingReset
                      ? "Loading..."
                      : profileDict.changeDeliveryButtonReset
                  }
                  className={s.button}
                />
              </div>
              <div className={s.buttonBlock}>
                <ButtonWhite
                  text={profileDict.changeDeliveryButtonCancel}
                  handleClick={() => bottomBlock("")}
                  className={s.button}
                />
              </div>
              <div className={s.buttonBlock}>
                <Button
                  text={
                    isLoadingSave
                      ? "Loading..."
                      : profileDict.changeDeliveryButtonSave
                  }
                  isDisabled={isLoadingSave}
                  handleClick={handleUpdateDelivery}
                  className={s.button}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayPopupDelivery;
