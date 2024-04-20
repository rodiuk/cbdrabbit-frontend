import React from "react";

import s from "./page.module.css";
import NovaPost from "@/components/NovaPoshta/NovaPoshta";
import Image from "next/image";
import UserCheckoutForm from "@/components/UserCheckoutForm/UserCheckoutForm";
import Button from "@/components/Ui/Button/Button";
import PencilIcon from "@/components/icons/PencilIcon";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import { ArrowDownIcon } from "@/components/icons/ArrowDown";

import np from "/public/img/np.svg";

interface Props {
  bottomBlock: (info: string) => void;
}

const ProfileTablet = ({ bottomBlock }: Props) => {
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
          <p>ojo*****@gmail.com</p>
        </div>

        <div className={s.wrapper_wrap_tal}>
          <div className={s.h2}>
            Пароль
            <span className={s.pencil} onClick={() => bottomBlock("password")}>
              <PencilIcon />
            </span>
          </div>
          <p>Встановлено</p>
        </div>
        <div className={s.wrapper_wrap_tal}>
          <div className={s.h2}>
            Дані для автозаповнення доставки
            <span className={s.pencil} onClick={() => bottomBlock("delivery")}>
              <PencilIcon />
            </span>
          </div>
          <div className={s.checkoutBlock_grey}>
            <p>
              Ми не поширюємо ці дані і не використовуємо для розсилок. Лише для
              швидшого оформлення замовлень
            </p>
          </div>
          {/* <UserCheckoutForm /> */}
          <div className={s.checkoutBlock_np}>
            <Image src={np} alt="np" />
            <div className={s.checkoutBlock_ttl}>Нова Пошта</div>
          </div>
          {/* <NovaPost /> */}
        </div>

        <div className={s.wrapper_wrap_tal}>
          <div className={s.h2}>Видалити акаунт</div>

          <button className={s.buttonRed} onClick={() => bottomBlock("delete")}>
            Видалити
          </button>
        </div>
      </div>
      <div className={s.wrap_right}>
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
      </div>
    </div>
  );
};

export default ProfileTablet;
