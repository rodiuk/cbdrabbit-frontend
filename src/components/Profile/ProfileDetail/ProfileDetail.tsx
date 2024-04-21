import React from "react";
import Image from "next/image";
import { IUserProfile } from "@/interfaces/user.interface";
import { IProfileDict } from "@/interfaces/i18n.interface";

import s from "./ProfileDetail.module.css";

import sale from "/public/img/sale.svg";
import CheckIcon from "@/components/icons/CheckIcon";

interface Props {
  user: IUserProfile | null;
  currency: string;
  dict: IProfileDict;
}

const ProfileDetail = (props: Props) => {
  const { user, currency, dict } = props;

  const totalAmount = user?.totalOrdersAmount ? user?.totalOrdersAmount : 0;

  return (
    <section className={s.details}>
      <div className={s.details_grey}>
        <p>{dict.totalAmountTitle} </p>
        <p className={s.details_big}>
          {user?.totalOrdersAmount} {currency}
        </p>
      </div>
      <div className={s.details_white}>
        <p>{dict.amountDisclaimer}</p>
      </div>
      <div className={s.details_img}>
        <Image src={sale} alt="sale" />
      </div>
      <div className={s.details_sales}>
        <div className={s.details_row}>
          <div className={s.details_ttl}>
            <p>
              <CheckIcon />
              {dict.registerLabel}
            </p>
          </div>
          <div className={s.details_descr}>
            <p>2% {dict.discountLabel}</p>
          </div>
        </div>
        <div className={s.details_row}>
          <p className={s.details_bold}>{dict.totalAmountOrders}</p>
        </div>
        <div className={s.details_row}>
          <div className={s.details_ttl}>
            <p>
              {totalAmount > 1000 && <CheckIcon />}
              {dict.step1}
            </p>
          </div>
          <div className={s.details_descr}>
            <p>5% {dict.discountLabel}</p>
          </div>
        </div>
        <div className={s.details_row}>
          <div className={s.details_ttl}>
            <p>
              {totalAmount > 3000 && <CheckIcon />}
              {dict.step2}
            </p>
          </div>
          <div className={s.details_descr}>
            <p>7% {dict.discountLabel}</p>
          </div>
        </div>
        <div className={s.details_row}>
          <div className={s.details_ttl}>
            <p>
              {totalAmount > 5000 && <CheckIcon />}
              {dict.step3}
            </p>
          </div>
          <div className={s.details_descr}>
            <p>9% {dict.discountLabel}</p>
          </div>
        </div>
        <div className={s.details_row}>
          <div className={s.details_ttl}>
            <p>
              {totalAmount > 7000 && <CheckIcon />}
              {dict.step4}
            </p>
          </div>
          <div className={s.details_descr}>
            <p>12% {dict.discountLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetail;
