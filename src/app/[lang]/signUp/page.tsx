import React from "react";

import cn from "clsx";
import styles from "./page.module.css";

import icon_1 from "/public/img/icon_1.svg";
import letter from "/public/img/letter.svg";
import ok from "/public/img/ok.svg";
import last from "/public/img/last.svg";
import Button from "@/components/Ui/Button/Button";
import Input from "@/components/Ui/Input/Input";

export default function SignUp() {
  let errorInAccoun = false;
  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.lay_item}>
        <div className={styles.items_wrap}>
          <div className={styles.img_center}>
            <img src={last.src} alt="last" />
          </div>
          <div className={`${styles.ttl} ${styles.mb15}`}>
            Це твій останній шанс. Далі вже не буде вороття...
          </div>
          <div className={styles.ttl}>
            Вибереш червону цукерку - залишишся в дивокраї, вибереш жовту - те ж
            саме, але бананова
          </div>
        </div>

        <div className={`${styles.bb}`}>
          <Button text="Беру дві" />
        </div>
      </div>

      <div className={styles.lay_item}>
        <div className={styles.items_wrap}>
          <div className={styles.img_center}>
            <img src={ok.src} alt="ok" />
          </div>
          <div className={styles.warning}>
            <p>Ви отримали персональну знижку на усі покупки</p>
            <p className={styles.big}>2%</p>
          </div>
          <div className={styles.ttl}>Акаунт успішно створено!</div>
        </div>

        <div className={`${styles.bb}`}>
          <Button text="Гайда по цукерки!" />
        </div>
      </div>

      <div className={styles.lay_item}>
        <div className={styles.items_wrap}>
          <div className={styles.ttl}>Реєстрація(виїзджає)</div>
          <div className={styles.img_center}>
            <img src={letter.src} alt="letter" />
          </div>
          <div className={styles.descr}>newzaychyik@gmail.com</div>
          <div className={styles.ttl}>
            Ми відправили лист для підтвердження вашої пошти
          </div>
          <div className={`${styles.descr} ${styles.m10}`}>
            newzaychyik@gmail.com
          </div>
          <div className={styles.ttl}>
            Перейдіть за посиланням у листі, щоб зареєструвати акаунт
          </div>
        </div>

        <div className={`${styles.bb}`}>
          <Button text="На пошту" className="white_button" />
        </div>
      </div>

      <div className={styles.lay_item}>
        <div className={styles.ttl}>Вхід в аккаунт </div>
        <div className={styles.descr}>newzaychyik@gmail.com</div>
        <Input
          type="text"
          text="Пароль"
          placeholder="Введіть пароль"
          isPassword
          password={true}
        />
        {!errorInAccoun && (
          <p className={styles.error}>
            Неправильно введений пароль або email. Спробуйте ще раз
          </p>
        )}
        <div className={`${styles.bb} ${styles.two_button}`}>
          <Button text="Назад" className="white_button" iconLeft={true} />
          <Button text="Увійти" />
        </div>
      </div>

      <div className={styles.lay_item}>
        <div className={styles.ttl}>Такого email не зареєстровано</div>
        <div className={styles.descr}>newzaychyik@gmail.com</div>
        <div className={styles.lay_text}>
          <p>
            Бажаєте <strong>зареєструватися</strong> і отримати{" "}
            <strong>знижку</strong> на цукерки?
          </p>
        </div>
        <div className={`${styles.bb} ${styles.two_button}`}>
          <Button text="Назад" className="white_button" iconLeft={true} />
          <Button text="Реєстрація" />
        </div>
      </div>

      <div className={styles.lay_item}>
        <div className={styles.ttl}>Придумайте пароль для акаунта</div>
        <div className={styles.descr}>new****@gmail.com</div>
        <Input type="text" placeholder="Введи пароль" password={true} />
        <Input
          type="text"
          placeholder="Підтверди новий пароль"
          password={true}
        />
        <div className={styles.bb}>
          <Button text="Створити акаунт" />
        </div>
      </div>

      <div className={styles.lay_item}>
        <div className={styles.ttl}>Вхід (удалить)</div>
        <div className={styles.img_center}>
          <img src={icon_1.src} alt="icon_1" />
        </div>
        <Input type="text" placeholder="Введи email" text="Email" />
        <div className={styles.bb}>
          <Button text="Далі" />
        </div>
      </div>
    </main>
  );
}
