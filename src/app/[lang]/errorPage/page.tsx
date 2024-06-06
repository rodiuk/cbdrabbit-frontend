import React from "react";
import Image from "next/image";

import cn from "clsx";
import s from "./page.module.css";

import errorIcon from "/public/img/errorPage.jpg";

export default function ErrorPage(): React.JSX.Element {
  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.img}>
            <Image src={errorIcon} alt="iconRubbit" width={510} height={510} />
          </div>
          <div className={s.text}>
            <p className={s.first}>Якась помилка 🙅</p>
            <p className={s.two}>Спробуйте пізніше</p>
          </div>
        </div>
      </main>
    </>
  );
}
