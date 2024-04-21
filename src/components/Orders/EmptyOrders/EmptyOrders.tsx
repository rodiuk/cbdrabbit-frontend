"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/Ui/Button/Button";
import { useRouter } from "next/navigation";
import { Locale } from "../../../../i18n.config";
import { IOrderDict } from "@/interfaces/i18n.interface";

import s from "./EmptyOrders.module.css";

import errorRabbit from "/public/img/errorRabbit.jpg";

interface Props {
  lang: Locale;
  dict: IOrderDict;
}

const EmptyOrders = ({ lang, dict }: Props): React.JSX.Element => {
  const router = useRouter();

  return (
    <div className={s.emptyOrders}>
      <div className="img">
        <Image src={errorRabbit} alt="error" />
      </div>
      <div className={s.text}>
        <p>{dict.noOrdersTitle}</p>
      </div>
      <div className={s.buttonBlock}>
        <Button
          text={dict.choiceCandy}
          handleClick={() => router.push(`/${lang}`)}
        />
      </div>
    </div>
  );
};

export default EmptyOrders;
