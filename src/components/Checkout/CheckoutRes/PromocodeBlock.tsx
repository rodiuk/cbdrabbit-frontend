import React from "react";
import Image from "next/image";
import { Promocode } from "@prisma/client";
import ButtonWhite from "@/components/Ui/Button/ButtonWhite";
import { findOnePromocode } from "@/libs/api/promocodes.api";
import Input from "@/components/Ui/Input/Input";
import Close from "@/components/icons/Close";

import sale_icon from "/public/img/sale_icon.svg";

import cn from "clsx";
import s from "./s.module.css";

interface IPromocodeProps {
  setPromocode: React.Dispatch<React.SetStateAction<Promocode | null>>;
  promocode: Promocode | null;
}

export const PromocodeBlock = ({
  promocode,
  setPromocode,
}: IPromocodeProps): React.JSX.Element => {
  const [code, setCode] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleCheckPromocode = async () => {
    try {
      setIsLoading(true);
      const res = await findOnePromocode(code);

      if (!res || !res.id) return setError(true);

      setPromocode(res);
      setError(false);
      setCode("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return !promocode ? (
    <div className={s.checkout_promo}>
      <Input
        type="text"
        value={code}
        onInputChange={setCode}
        placeholder="Промокод"
        errorText={error ? "Невірний промокод" : undefined}
      />
      <ButtonWhite
        text={isLoading ? "Перевіряємо..." : "Застосувати"}
        handleClick={handleCheckPromocode}
      />
    </div>
  ) : (
    <div className={cn(s.checkoutRes_row, s.checkoutRes_row_promo)}>
      <div className={s.checkoutRes_nm}>
        <Image src={sale_icon.src} alt="sale_icon" width={22} height={14} />
        {promocode.code}
      </div>
      <div className={s.checkoutRes_price}>
        <button className={s.close}>
          <Close iconStyle={s.grey} handleClick={() => setPromocode(null)} />
        </button>
      </div>
    </div>
  );
};
