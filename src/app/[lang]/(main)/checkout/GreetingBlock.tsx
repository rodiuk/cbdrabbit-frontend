import React from "react";
import RabbitHelloIcon from "@/components/icons/RabbitHello";
import { IUserCheckoutForm } from "@/interfaces/user.interface";

import styles from "./page.module.css";

interface Props {
  userInfo: IUserCheckoutForm;
}

export const GreetingBlock = ({ userInfo }: Props): React.JSX.Element => {
  return (
    <div className={styles.checkoutBlock}>
      <h2 className={styles.greeting_block}>
        Вітаємо{" "}
        {userInfo?.lastName && userInfo?.firstName
          ? `${userInfo?.firstName} ${userInfo?.lastName}`
          : userInfo?.firstName}{" "}
        <RabbitHelloIcon />
      </h2>
    </div>
  );
};
