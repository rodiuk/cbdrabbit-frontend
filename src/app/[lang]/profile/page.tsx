"use client";

import React from "react";

import cn from "clsx";
import s from "./page.module.css";

import { ArrowDownIcon } from "@/components/icons/ArrowDown";

import ProfileDetail from "./ProfileDetail/ProfileDetail";
import PencilIcon from "@/components/icons/PencilIcon";
import NovaPoshta from "@/components/NovaPoshta/NovaPoshta";

export default function Profile() {
  return (
    <main className={cn("container", s.wrapper)}>
      <div className="wrapper">
        <div className={s.wrapper_wrap}>
          <div className={s.wrapper_ttl}>
            <p>Моя персональна знижка</p>
          </div>
          <div className={s.wrapper_big}>
            <p>5%</p>
          </div>
          <div className={s.profile_details} /* onClick={toggleBlock} */>
            <p className={s.profile_detailsOne}>
              Деталі <ArrowDownIcon iconStyle={s.arr} />
            </p>

            <ProfileDetail />
          </div>
			  </div>
			  
			  <div className={s.wrapper_wrap_tal}>
                    <div className={s.h2}>
                        Email
                        <span
                            className={s.pencil}
                           // onClick={() => bottomBlock("email")}
                        >
                            <PencilIcon />
                        </span>
                    </div>
                    <p>ojo*****@gmail.com</p>
			  </div>

			  <div className={s.wrapper_wrap_tal}>
                    <div className={s.h2}>
                        Пароль
                        <span
                            className={s.pencil}
                            //onClick={() => bottomBlock("password")}
                        >
                            <PencilIcon />
                        </span>
                    </div>
                    <p>Встановлено</p>
			  </div>
			  <div className={s.wrapper_wrap_tal}>
			  <NovaPoshta />
			  </div>
      </div>
    </main>
  );
}
