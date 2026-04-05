"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import cn from "clsx";
import s from "./page.module.css";

import errorIcon from "/public/img/errorPage.jpg";
import ukDict from "@/libs/18n/dict/uk.json";
import enDict from "@/libs/18n/dict/en.json";

interface Props {
  handleReset: () => void;
}

export default function ErrorPage({ handleReset }: Props): React.JSX.Element {
  const pathname = usePathname();
  const commonDict = pathname?.startsWith("/en")
    ? enDict.common
    : ukDict.common;

  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.img}>
            <Image src={errorIcon} alt="iconRubbit" width={510} height={510} />
          </div>
          <div className={s.text}>
            <p className={s.first}>{commonDict.errorPage.title}</p>
            <p className={s.two}>{commonDict.errorPage.subtitle}</p>
          </div>

          <button
            className={s.button}
            onClick={() => {
              handleReset();
            }}
          >
            {commonDict.errorPage.button}
          </button>
        </div>
      </main>
    </>
  );
}
