import React from "react";
import { InfoField } from "./InfoField/InfoField";
import { IUserProfile } from "@/interfaces/user.interface";
import { IProfileDict } from "@/interfaces/i18n.interface";
import { npDeliveryType } from "../NovaPoshta/npDelivery";

import styles from "./UserDeliveryInfoSection.module.css";

interface Props {
  profileDict: IProfileDict;
  user: IUserProfile | null;
}

export const UserDeliveryInfoSection = (props: Props): React.JSX.Element => {
  const { user, profileDict } = props;

  const phone = user?.address?.phoneNumber
    ? user?.address?.phoneNumber
    : profileDict.noInfo;

  const lastName = user?.lastName ? user.lastName : profileDict.noInfo;
  const deliveryType = user?.address?.npDeliveryType
    ? npDeliveryType.filter(
        item => item.id === user?.address?.npDeliveryType
      )[0]?.text ?? user?.address?.npDeliveryType
    : profileDict.noInfo;

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        <InfoField title={profileDict?.phoneFieldTitle} hasBorder>
          <p>{phone}</p>
        </InfoField>

        <InfoField title={profileDict?.lastNameFieldTitle} hasBorder>
          <p>{lastName}</p>
        </InfoField>

        <InfoField title={profileDict?.firstNameFiledTitle} hasBorder>
          <p>{user?.firstName ?? profileDict.noInfo}</p>
        </InfoField>

        <InfoField title={profileDict?.deliveryFieldTitle}>
          <p>{deliveryType}</p>
          <p>{user?.address?.city ?? profileDict.noInfo}</p>
          <p>{user?.address?.npDepartment ?? profileDict.noInfo}</p>
        </InfoField>
      </ul>
    </section>
  );
};
