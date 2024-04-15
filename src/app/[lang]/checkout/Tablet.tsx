import React from "react";

import cn from "clsx";
import styles from "./page.module.css";

import pic1 from "/public/img/pic1.jpg";
import np from "/public/img/np.svg";
import money from "/public/img/money.svg";

import RadioButtonsContainer from "@/components/RadioButtonsContainer/RadioButtonsContainer";
import InputNovaPoshta from "@/components/Ui/InputNovaPoshta/InputNovaPoshta";
import CheckoutRes from "./CheckoutRes/CheckoutRes";
import Input from "@/components/Ui/Input/Input";
import NovaPoshta from "@/components/NovaPoshta/NovaPoshta";

const Tablet = () => {
  return (
    <>
      <div className={styles.left}>
        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlock_h2}>Контактні дані</div>
          <div className={styles.labels}>
            <Input
              type="text"
              name="Телефон"
              text="Телефон"
              // required='true'
              placeholder="+380 (__)___-__-__"
            />
            <Input
              type="text"
              name="Прізвище"
              text="Прізвище"
              //required='true'
              placeholder="Введи прізвище кирилицею"
            />
            <Input
              type="text"
              name="Імʼя"
              text="Імʼя"
              //required='true'
              placeholder="Введи імʼя кирилицею"
            />
          </div>
        </div>
        <div className={styles.checkoutBlock}>
          <div
            className={`${styles.checkoutBlock_h2} ${styles.checkoutBlock_h2mb}`}
          >
            Доставка
          </div>
          <div className={styles.checkoutBlock_np}>
            <img src={np.src} alt="np" />
            <div className={styles.checkoutBlock_ttl}>Нова Пошта</div>
            <div className={styles.checkoutBlock_price}>Від 50 ₴</div>
          </div>
          <NovaPoshta />
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlock_h2}>Оплата карткою на сайті</div>
          <div className={styles.checkoutBlock_img}>
            <img src={money.src} alt="money" />
          </div>
          <div className={styles.checkoutBlock_list}>
            <p>Без переплат</p>
            <p>Онлайн оплата з картки будь-якого україньского банку</p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlock_h2}>Ваше замовлення</div>
          <ul className={styles.productCheckout}>
            <li className={styles.list}>
              <div className={styles.productCheckout_img}>
                <img src={pic1.src} alt="pic" />
              </div>
              <div className={styles.productCheckout_info}>
                <div className={styles.productCheckout_ttl}>
                  <p>Rabbit Black</p>
                </div>
                <div className={styles.productCheckout_count}>
                  <span className={styles.grey}>2 &#215;</span> 80 ₴
                </div>
              </div>
            </li>
            <li className={styles.list}>
              <div className={styles.productCheckout_img}>
                <img src={pic1.src} alt="pic" />
              </div>
              <div className={styles.productCheckout_info}>
                <div className={styles.productCheckout_ttl}>
                  <p>Rabbit Black</p>
                </div>
                <div className={styles.productCheckout_count}>
                  <span className={styles.grey}>2 &#215;</span> 80 ₴
                </div>
              </div>
            </li>
          </ul>
        </div>
        <CheckoutRes />
      </div>
    </>
  );
};

export default Tablet;
