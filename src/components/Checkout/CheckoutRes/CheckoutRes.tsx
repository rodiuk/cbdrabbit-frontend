"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { cartAtom } from "@/libs/store/atoms";
import { useAtom } from "jotai/react";
import { getUserInfo } from "@/libs/api/user.api";
import { calculateTotalUserPrice } from "@/utils/calculateTotalUserprice";
import { ICheckoutDict } from "@/interfaces/i18n.interface";
import Button from "@/components/Ui/Button/Button";

import info from "/public/img/info.svg";
import arr2 from "/public/img/arrow-doble.svg";

import s from "./s.module.css";

interface Props {
  dict: ICheckoutDict;
  currency: string;
  setFinalPrice: (finalPrice: number) => void;
  handleCheckout: () => void;
  hasError: boolean;
  isLoading?: boolean;
}

const CheckoutRes = React.memo(function CheckoutRes({
  dict,
  currency,
  setFinalPrice,
  handleCheckout,
  hasError,
  isLoading,
}: Props): React.JSX.Element {
  const [cart] = useAtom(cartAtom);
  const { data } = useSession();
  const [userDiscount, setUserDiscount] = React.useState<number>(0);

  React.useEffect(() => {
    (async function () {
      if (!!data?.user?.id) {
        const userInfo = await getUserInfo(data.user.id);
        if (!userInfo?.loyalty?.percentDiscount) return;

        setUserDiscount(userInfo?.loyalty?.percentDiscount);
        setFinalPrice(
          calculateTotalUserPrice(
            cart?.totalAmount,
            userInfo?.loyalty?.percentDiscount
          )
        );
      }
    })();
  }, [data, cart, setFinalPrice]);

  const currentPrice = 80;

  const saleDiff = cart?.totalCount * currentPrice - cart?.totalAmount;
  let salePercent = Math.round((saleDiff / cart?.totalAmount) * 100);
  salePercent = salePercent > 0 ? salePercent : 0;
  const userDiscountSum = cart?.fromCheckout
    ? 0
    : (cart?.totalAmount / 100) * userDiscount;
  const finalPrice = cart?.totalAmount - userDiscountSum;

  return (
    <div className={s.checkoutRes}>
      <div className="container-row">
        {hasError && (
          <div className={s.checkoutRes_error}>
            <div className={s.checkoutRes_error_pic}>
              <Image src={arr2.src} alt="arr2" width={24} height={24} />
            </div>
            <p>{dict.formError}</p>
          </div>
        )}
        <div className={s.checkoutRes_prices}>
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>{dict.totalAmountTitle}</div>
            <div className={s.checkoutRes_price}>
              {finalPrice} {currency}
            </div>
          </div>
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>
              {dict.personalDiscount} {userDiscount}%
            </div>
            <div className={s.checkoutRes_price}>
              - {userDiscountSum} {currency}
            </div>
          </div>
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>
              {dict.discountTitle} {salePercent}%
            </div>
            <div className={s.checkoutRes_price}>
              - {saleDiff} {currency}
            </div>
          </div>
          <div className={s.info}>
            <div className={s.info_ic}>
              <Image src={info.src} alt="info" width={24} height={24} />
            </div>
            <div className={s.info_content}>
              <div className={s.info_ttl}>
                <p>{dict.deliveryDisclaimer}и</p>
                <div className={s.info_row}>
                  <div className={s.info_nm}>
                    <p>{dict.npDelivery}</p>
                  </div>
                  <div className={s.info_price}>
                    <p>{dict.npCostLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.checkoutTotal}>
            <div className={s.checkoutTotal_ttl}>
              <p>{dict.totalCheckout}</p>
            </div>
            <div className={s.checkoutTotal_res}>
              <p>
                {finalPrice} {currency}
              </p>
            </div>
            <Button
              text={isLoading ? "Loading..." : dict.checkoutButton}
              handleClick={handleCheckout}
            />
            <div className={s.checkoutTotal_check}>
              <p>{dict.checkoutDisclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CheckoutRes;
