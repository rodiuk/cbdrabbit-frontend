'use client'
import React from "react";

import cn from "clsx";
import styles from "./page.module.css";

import pic1 from "/public/img/pic1.jpg";
import np from "/public/img/np.svg";
import money from "/public/img/money.svg";


import Input from "@/Ui/Input/Input";
import InputRadio from "@/Ui/InputRadio/InputRadio";
import RadioButtonsContainer from "@/components/RadioButtonsContainer/RadioButtonsContainer";
import InputNovaPoshta from "@/Ui/InputNovaPoshta/InputNovaPoshta";
import CheckoutRes from "./CheckoutRes/CheckoutRes";

export default function Checkout() {
	console.log(window.innerWidth)
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
				  <div className={styles.checkoutBlock}>
                            <div className={`${styles.checkoutBlock_h2} ${styles.checkoutBlock_h2mb}`}>
                                Доставка
                            </div>
                            <div className={styles.checkoutBlock_np}>
                                <img src={np.src} alt='np' />
                                <div className={styles.checkoutBlock_ttl}>
                                    Нова Пошта
                                </div>
                                <div className={styles.checkoutBlock_price}>
                                    Від 50 ₴
                                </div>
                            </div>
					  <RadioButtonsContainer
						  options={[
							{ id: "1", type: "radio", name: "Спосіб доставки", text: "У відділення", value: "У відділення" },
							{ id: "2", type: "radio", name: "Спосіб доставки", text: "До дверей", value: "До дверей" },
							{ id: "3", type: "radio", name: "Спосіб доставки", text: "Самовивіз", value: "Самовивіз" }
						  ]}
					  />

					  <InputNovaPoshta
						  type='text'
						  name='Населений пункт'
						  text='Населений пункт'
						  required={true}
					  />
					  <InputNovaPoshta
						  type='text'
						  name='Відділення'
						  text='Відділення'
						  required={true}
					  />
				  </div>
				  
				  <div className={styles.checkoutBlock}>
                            <div className={styles.checkoutBlock_h2}>
                                Оплата карткою на сайті
                            </div>
                            <div className={styles.checkoutBlock_img}>
                                <img src={money.src} alt='money' />
                            </div>
                            <div className={styles.checkoutBlock_list}>
                                <p>Без переплат</p>
                                <p>
                                    Онлайн оплата з картки будь-якого
                                    україньского банку
                                </p>
                            </div>
				  </div>
				  <CheckoutRes />
        </div>
		  </div>
		
    </main>
  );
}
