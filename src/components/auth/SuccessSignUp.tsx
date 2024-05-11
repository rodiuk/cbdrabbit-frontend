"use client";

import React from "react";
import Image from "next/image";
import Button from "../Ui/Button/Button";
import { ISuccessSignUpDict } from "@/interfaces/auth.interface";
import { maskEmailAddress } from "@/utils/maskEmailAddress";

import letter from "/public/img/letter.svg";

import styles from "./styles.module.css";

interface Props {
  dict: ISuccessSignUpDict;
  userEmail: string;
}

export const SuccessSignUp = ({
  dict,
  userEmail,
}: Props): React.JSX.Element => {
  const mailDomain = userEmail?.split("@")[1] ?? "https://google.com";

  const handleRedirect = () => {
    window.open(`https://${mailDomain}`, "_blank");
  };

  return (
    <div className={styles.lay_item}>
      <div className={styles.items_wrap}>
        <h1 className={styles.ttl}>{dict.title}</h1>
        <div className={styles.img_center}>
          <Image
            src={letter.src}
            alt="Decorate icon"
            width={206}
            height={169}
          />
        </div>
        <p className={styles.descr}>{maskEmailAddress(userEmail)}</p>
        <h2 className={styles.ttl}>{dict.subTitle}</h2>
        <div className={`${styles.descr} ${styles.m10}`}>{maskEmailAddress(userEmail)}</div>
        <p className={styles.ttl}>{dict.description}</p>
      </div>

      <div className={`${styles.bb}`}>
        <Button
          text={dict.button}
          className="white_button"
          handleClick={handleRedirect}
        />
      </div>
    </div>
  );
};
