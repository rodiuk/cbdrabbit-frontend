"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Button from "../Ui/Button/Button";
import { ISuccessSignUpDict } from "@/interfaces/auth.interface";

import letter from "/public/img/letter.svg";

import styles from "./styles.module.css";

interface Props {
  dict: ISuccessSignUpDict;
}

export const SuccessSignUp = ({ dict }: Props): React.JSX.Element => {
  const searchParams = useSearchParams();
  const userEmail = searchParams?.get("registered");

  const mailDomain = userEmail?.split("@")[1] ?? "https://google.com";

  return (
    <div className={styles.lay_item}>
      <div className={styles.items_wrap}>
        <h1 className={styles.ttl}>{dict.title}</h1>
        <div className={styles.img_center}>
          <img src={letter.src} alt="letter" />
        </div>
        <p className={styles.descr}>{userEmail}</p>
        <h2 className={styles.ttl}>{dict.subTitle}</h2>
        <div className={`${styles.descr} ${styles.m10}`}>{userEmail}</div>
        <p className={styles.ttl}>{dict.description}</p>
      </div>

      <div className={`${styles.bb}`}>
        <Button
          text={dict.button}
          className="white_button"
          handleClick={() => window.open(mailDomain, "_blank")}
        />
      </div>
    </div>
  );
};
