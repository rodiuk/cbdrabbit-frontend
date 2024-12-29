import React from "react";
import Link from "next/link";
import Image from "next/image";
import { userByOrderId } from "@/libs/api/user.api";
import { SuccessClearStorage } from "./SUccessClearStorage";
import { formatDisplayedCheckId } from "@/utils/formatDisplayedCheckId";

import s from "./SuccessOrder.module.css";

import success from "/public/img/success.svg";

interface SuccessOrderProps {
  dict: any;
  orderNumber: string;
}

export const SuccessOrder = async ({
  dict,
  orderNumber,
}: SuccessOrderProps): Promise<React.JSX.Element> => {
  const user = await userByOrderId(Number(orderNumber));

  const mailDomain = user?.email?.split("@")[1] ?? "https://google.com";

  return (
    <div className="container">
      <div className={s.wrap}>
        <div className={s.content}>
          <div className={s.content_wrap}>
            <div className={s.ttl}>{dict.successPayed}</div>
            <div className={s.img}>
              <Image src={success} alt="success" width={256} height={256} />
            </div>
            <div className={s.block}>
              <p className={s.text}>{dict.suceesOrderNumber}</p>
              <p className={s.num}>{formatDisplayedCheckId(orderNumber)}</p>
            </div>
            <div className={s.bot_text}>{dict.successOrderLabel}</div>
            {!user?.isVerified && (
              <div className={s.bot_text}>{dict.notVerifiedAccount}</div>
            )}
            <div className="bb">
              {user?.isVerified ? (
                <Link href="/" className={s.button}>
                  {dict.successOrderButton}
                </Link>
              ) : (
                <Link
                  href=""
                  onClick={() => window.open(`https://${mailDomain}`, "_blank")}
                  className={s.button}
                >
                  {dict.openEmail}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <SuccessClearStorage />
    </div>
  );
};
