import React from "react";

import cn from "clsx";
import styles from "./page.module.css";

import pic1 from "/public/img/pic1.jpg";
import Input from "@/Ui/Input/Input";

export default function Checkout() {
  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.checoutPage}>
        <div className={styles.checkoutBlocks}>
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
				  <div className={styles.checkoutBlock}>
                            <div className={styles.checkoutBlock_h2}>
                                Контактні дані
                            </div>
                            <div className={styles.labels}>
                                <Input
                                    type='text'
                                    name='Телефон'
                                    text='Телефон'
                                   // required='true'
                                    placeholder='+380 (__)___-__-__'
                                />
                                <Input
                                    type='text'
                                    name='Прізвище'
                                    text='Прізвище'
                                    //required='true'
                                    placeholder='Введи прізвище кирилицею'
                                />
                                <Input
                                    type='text'
                                    name='Імʼя'
                                    text='Імʼя'
                                    //required='true'
                                    placeholder='Введи імʼя кирилицею'
                                />
                            </div>
                        </div>
        </div>
      </div>
    </main>
  );
}
