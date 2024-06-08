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
import { Promocode } from "@prisma/client";
import { PromocodeBlock } from "./PromocodeBlock";

import no_sum from "/public/img/no_sum.svg";
import sale_icon from "/public/img/sale_icon.svg";

import s from "./s.module.css";

interface Props {
  dict: ICheckoutDict;
  currency: string;
  setFinalPrice: (finalPrice: number) => void;
  handleCheckout: () => void;
  hasError: boolean;
  promocode: Promocode | null;
  setPromocode: React.Dispatch<React.SetStateAction<Promocode | null>>;
  isLoading?: boolean;
}

const CheckoutRes = React.memo(function CheckoutRes({
  dict,
  currency,
  setFinalPrice,
  handleCheckout,
  hasError,
  isLoading,
  promocode,
  setPromocode,
}: Props): React.JSX.Element {
  const [cart] = useAtom(cartAtom);
  const { data } = useSession();
  const [userDiscount, setUserDiscount] = React.useState<number>(0);

  const currentPrice = 80;
  const freeDelivery = 2200; // это если сумма достаточна для безкошновної доставки

  const saleDiff = cart?.totalCount * currentPrice - cart?.totalAmount;
  let salePercent = Math.round((saleDiff / cart?.totalAmount) * 100);
  salePercent = salePercent > 0 ? salePercent : 0;

  const userDiscountSum = cart?.fromCheckout
    ? 0
    : (cart?.totalAmount / 100) * userDiscount;

  const promocodeDiscount = promocode?.percentDiscount
    ? (cart.totalAmount / 100) * promocode?.percentDiscount
    : 0;

  const promocodeDiscountLabel = promocode?.newPrice
    ? cart.totalCount * currentPrice - cart.totalCount * promocode?.newPrice
    : promocodeDiscount;

  const percentPromoDiscount =
    promocode?.percentDiscount &&
    ((cart.totalCount * currentPrice) / 100) * promocode?.percentDiscount;

  const totalAmount = promocode?.newPrice
    ? cart.totalCount * promocode.newPrice
    : promocode?.percentDiscount && percentPromoDiscount
    ? cart.totalCount * currentPrice - percentPromoDiscount
    : cart?.totalAmount;

  const finalPrice = React.useMemo(() => {
    return totalAmount - (!!promocode?.code ? 0 : userDiscountSum);
  }, [totalAmount, userDiscountSum, promocode]);

  const sumForFreeDelivery = Math.abs(finalPrice - freeDelivery).toFixed(2);
  const promocodeLabel = promocode?.percentDiscount
    ? `Знижка ${promocode?.percentDiscount}%`
    : `Вартість цукерки ${promocode?.newPrice}₴`;

  React.useEffect(() => {
    if (promocode?.code) {
      return setFinalPrice(finalPrice);
    }

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
  }, [data, cart, setFinalPrice, promocode, finalPrice]);

  return (
    <div className={s.checkoutRes}>
      <div className="container-row">
        {/* якщо 0, то значить нема цукерок і показуємо щоб добавили */}
        {!finalPrice && (
          <div className={s.checkoutRes_error}>
            <p>Додайте цукерок у кошик</p>
          </div>
        )}

        {hasError && (
          <div className={s.checkoutRes_error}>
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
          {/*   Эти 2 блочка теперь нет в дизайне но хз, коментирую покамест */}
          {/* <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>
              {dict.personalDiscount} {userDiscount}%
            </div>
            <div className={s.checkoutRes_price}>
              - {userDiscountSum} {currency}
            </div>
          </div> */}
          {/* <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>
              {dict.discountTitle} {salePercent}%
            </div>
            <div className={s.checkoutRes_price}>
              - {saleDiff} {currency}
            </div>
          </div> */}
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>Доставка</div>
            <div className={s.checkoutRes_price}>
              {finalPrice >= freeDelivery ? (
                <span className={s.free}>
                  <Image src={no_sum.src} alt="info" width={22} height={22} />{" "}
                  Безкоштовна
                </span>
              ) : (
                <span>
                  За тарифами <br /> перевізника{" "}
                </span>
              )}
            </div>
          </div>
          {finalPrice < freeDelivery && (
            <div className={s.info}>
              {" "}
              {/* цей блок теж мабуть віводиться коли ще немає сумми достатньої */}
              <div className={s.info_ic}>
                <Image src={no_sum.src} alt="info" width={22} height={22} />
              </div>
              <div className={s.info_content}>
                <div className={s.info_ttl}>
                  <p>
                    Додайте товарів ще на {sumForFreeDelivery}₴ для безкоштовної
                    доставки
                  </p>
                </div>
              </div>
            </div>
          )}

          <PromocodeBlock setPromocode={setPromocode} promocode={promocode} />

          {!promocode?.code && (
            <div className={s.checkoutRes_row}>
              <div className={s.checkoutRes_nm}>
                {dict.personalDiscount} {userDiscount}%
              </div>
              <div className={s.checkoutRes_price}>
                - {userDiscountSum.toFixed(2)} {currency}
              </div>
            </div>
          )}

          {promocode?.code && (
            <div className={s.checkoutRes_row}>
              <div className={s.checkoutRes_nm}>
                <Image
                  src={sale_icon.src}
                  alt="sale_icon"
                  width={22}
                  height={14}
                />
                {promocodeLabel}
              </div>
              <div className={s.checkoutRes_price}>
                - {promocodeDiscountLabel.toFixed(2)} ₴
              </div>
            </div>
          )}

          <div className={s.checkoutTotal}>
            <div className={s.checkoutTotal_ttl}>
              <p>{dict.totalCheckout}</p>
            </div>
            <div className={s.checkoutTotal_res}>
              <p>
                {finalPrice.toFixed(2)} {currency}
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
