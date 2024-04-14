import React from "react";
import Button from "@/components/Ui/Button/Button";

import info from "/public/img/info.svg";
import arr2 from "/public/img/arrow-doble.svg";

import s from "./s.module.css";

const CheckoutRes = () => {
  return (
    <div className={s.checkoutRes}>
      <div className="container-row">
        <div className={s.checkoutRes_error}>
          <div className={s.checkoutRes_error_pic}>
            <img src={arr2.src} alt="arr2" />
          </div>
          <p>Щоб оформити відправлення заповніть усі поля *</p>
        </div>
        <div className={s.checkoutRes_prices}>
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>Вартість замовлення</div>
            <div className={s.checkoutRes_price}>240 ₴</div>
          </div>
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>Персональна знижка 0%</div>
            <div className={s.checkoutRes_price}>- 0 ₴</div>
          </div>
          <div className={s.checkoutRes_row}>
            <div className={s.checkoutRes_nm}>Знижка за кількість 0%</div>
            <div className={s.checkoutRes_price}>- 0 ₴</div>
          </div>
          <div className={s.info}>
            <div className={s.info_ic}>
              <img src={info.src} alt="info" />
            </div>
            <div className={s.info_content}>
              <div className={s.info_ttl}>
                <p>Ми не враховуємо вартість доставки</p>
                <div className={s.info_row}>
                  <div className={s.info_nm}>
                    <p>Нова Пошта</p>
                  </div>
                  <div className={s.info_price}>
                    <p>Від 50 ₴</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.checkoutTotal}>
            <div className={s.checkoutTotal_ttl}>
              <p>До оплати без доставки:</p>
            </div>
            <div className={s.checkoutTotal_res}>
              <p>240 ₴</p>
            </div>
            <Button text="Перейти до оплати" />
            <div className={s.checkoutTotal_check}>
              <p>
                Натискаючи “Перейти до оплати” я підтверджую що введені мною
                дані вірні
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutRes;
