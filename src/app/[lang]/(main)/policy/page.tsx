import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/policy`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Policy({
  params,
}: IMainPageProps): Promise<React.JSX.Element> {
  const { lang } = params;

  const header = (await getDictionary(lang)).header;

  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.wrapper}>
          <h1 className={styles.h1}>Публічний договір оферти</h1>
          <h2 className={styles.h2}>1. Загальні положення</h2>
          <p className={styles.p}>
            1.1. Цей Договір, згідно зі ст. 633 та ст. 641 Цивільного кодексу
            України, є публічною офертою Продавця, адресованою невизначеному
            колу осіб, незалежно від їхнього статусу (фізична особа, юридична
            особа, фізична особа-підприємець), укласти договір купівлі-продажу
            товару, представленого на сайті www.cbdrabbit.shop
          </p>
          <p className={styles.p}>
            1.2. Укладаючи цей Договір, Покупець повністю приймає його умови.
          </p>
          <p className={styles.p}>
            1.3. Згідно зі ст. 642 Цивільного кодексу України, повне і безумовне
            прийняття пропозиції укласти цей Договір (акцепт) підтверджується
            фактом оформлення Покупцем відповідного замовлення на сайті
            Інтернет-магазину.
          </p>
          <p className={styles.p}>
            1.4. Продавець має право в односторонньому порядку змінювати умови
            цього Договору. Змінений Договір набуває чинності з моменту його
            розміщення на сайті.
          </p>
          <p className={styles.m0}>
            1.5. У цьому Договорі наведені терміни мають такі значення:
          </p>
          <ul>
            <li className={styles.li}>
              Інтернет-магазин – сайт Продавця, створений для укладення
              договорів роздрібної та оптової купівлі-продажу товару
              дистанційним способом, після ознайомлення Покупцем із
              запропонованим товаром на сайті www.cbdrabbit.shop
            </li>
            <li className={styles.li}>
              Адміністратор – Власник та адміністратор сайту www.cbdrabbit.shop
              та власник ФОП Родюк Олег Миколайович, код ЄДРПОУ 3521401759,
              фізична особа-підприємець, зареєстрована відповідно до
              законодавства України.
            </li>
            <li className={styles.li}>
              Продавець – фізична особа-підприємець Родюк Олег Миколайович
              (ідентифікаційний код РНОКПП: 3521401759), зареєстрований за
              адресою: 09100, Біла Церква, вул. Партизанська, 25, який здійснює
              продаж товару на сайті www.cbdrabbit.shop{" "}
            </li>
            <li className={styles.li}>
              Товар – продукція, запропонована до продажу на сайті https
              www.cbdrabbit.shop що є об`єктом купівлі-продажу за цим Договором.
            </li>
            <li className={styles.li}>
              Покупець – дієздатна фізична особа, яка досягла 18 років, або
              юридична особа, фізична особа-підприємець, яка здійснює замовлення
              на сайті www.cbdrabbit.shop.
            </li>
            <li className={styles.li}>
              Акцепт – повне, безумовне та беззастережне прийняття Покупцем умов
              цього Договору.
            </li>
            <li className={styles.li}>
              Замовлення – окремі позиції з асортиментного переліку товару,
              запропонованого Продавцем, обрані та зазначені Покупцем при
              оформленні замовлення на сайті www.cbdrabbit.shop.
            </li>
          </ul>

          <h2 className={styles.h2}>2. Предмет Договору</h2>
          <p className={styles.p}>
            2.1. На умовах, визначених цим Договором, Продавець
            зобов&apos;язується передати у власність Покупцю замовлений ним
            товар, а Покупець зобов&apos;язується оплатити та прийняти
            відповідний товар.
          </p>
          <p className={styles.p}>
            2.2. Моментом укладення цього Договору (акцептом) та моментом
            повного й беззаперечного прийняття Покупцем умов Договору вважається
            момент оформлення Покупцем відповідного замовлення на сайті
            Інтернет-магазину.
          </p>
          <h2 className={styles.h2}>3. Порядок оформлення замовлення</h2>
          <p className={styles.p}>
            3.1. Покупець оформлює замовлення в Інтернет-магазині самостійно
            через форму «Кошик» або, для оптових замовлень, за допомогою
            електронної пошти чи телефону, вказаних у розділі контактів
            Інтернет-магазину.
          </p>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
