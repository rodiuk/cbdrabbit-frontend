import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import styles from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

export async function generateMetadata({
  params,
}: Readonly<IMainPageProps>): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/privacy`,
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function Policy({ params }: IMainPageProps) {
	const { lang } = params;
	const dict = await getDictionary(lang);
	const {header} = dict
	
  return (
    <>
      <main className={cn("container", styles.main)}>
        <div className={styles.wrapper}>
          <h1 className={styles.h1}>
            Конфіденційність і захист персональних даних
          </h1>
          <div className={styles.block}>
            <p className={styles.m0}>
              1. Надаючи свої персональні дані на сайті Інтернет-магазину під
              час реєстрації або оформлення замовлення, Покупець надає
              Адміністратору та Продавцю (далі — Розпорядники) добровільну згоду
              на обробку, використання та передачу своїх персональних даних. Ці
              дані можуть бути внесені в бази даних Адміністратора, зберігатися,
              накопичуватися, оновлюватися та змінюватися без додаткового
              повідомлення. Адміністратор зобов’язується захищати дані від
              несанкціонованого доступу третіх осіб, не поширювати та не
              передавати їх будь-яким третім сторонам, за винятком випадків,
              передбачених пунктом 3 цього розділу та чинним законодавством.
            </p>
            <p className={styles.m0}>
              2. Розпорядники поважають конфіденційність особистої інформації
              користувачів сайту і прагнуть захищати її, створюючи максимально
              комфортні умови користування сайтом для кожного користувача.
            </p>
            <p className={styles.m0}>
              3. Розпорядники зобов’язуються не розголошувати інформацію,
              отриману від Покупця. Виключення становить надання інформації
              контрагентам і третім особам, що діють на підставі договору з
              Продавцем для виконання зобов&apos;язань перед Покупцем, а також у
              випадках, передбачених чинним законодавством України.
            </p>
            <p className={styles.m0}>
              4. Розпорядники збирають лише ті персональні дані, які Покупець
              надає свідомо і добровільно для використання сервісів сайту.
            </p>
            <p className={styles.m0}>
              5. Розпорядники збирають та використовують персональні дані
              користувачів сайту для адміністрування та персоналізації сервісів
              сайту, забезпечення виконання замовлень Покупця та в інших цілях,
              визначених цим Договором та чинним законодавством України.
            </p>
            <p className={styles.m0}>
              6. Покупець надає свою однозначну згоду Продавцю на збір, обробку
              та передачу будь-яких своїх персональних даних, які стають відомі
              Продавцю під час використання сервісів сайту. Згода на обробку
              персональних даних діє протягом усього терміну дії Договору,
              укладеного між Покупцем та Продавцем, а також після його
              завершення. Укладаючи Договір, Покупець підтверджує, що він
              повідомлений про свої права, встановлені законодавством про захист
              персональних даних, про цілі збору даних, а також про те, що його
              персональні дані передаються Продавцю для виконання замовлення,
              проведення взаєморозрахунків та отримання рахунків, актів та інших
              документів. Покупець також погоджується, що Продавець може
              надавати доступ і передавати його персональні дані третім особам
              без додаткового повідомлення з метою виконання замовлення. Обсяг
              прав Покупця як суб’єкта персональних даних відповідно до
              законодавства йому відомий і зрозумілий.
            </p>
          </div>
          <div className={styles.block}>
            <p className={styles.m0}>
              1. Надаючи свої персональні дані на сайті Інтернет-магазину під
              час реєстрації або оформлення замовлення, Покупець надає
              Адміністратору та Продавцю (далі — Розпорядники) добровільну згоду
              на обробку, використання та передачу своїх персональних даних. Ці
              дані можуть бути внесені в бази даних Адміністратора, зберігатися,
              накопичуватися, оновлюватися та змінюватися без додаткового
              повідомлення. Адміністратор зобов’язується захищати дані від
              несанкціонованого доступу третіх осіб, не поширювати та не
              передавати їх будь-яким третім сторонам, за винятком випадків,
              передбачених пунктом 3 цього розділу та чинним законодавством.
            </p>
            <p className={styles.m0}>
              2. Розпорядники поважають конфіденційність особистої інформації
              користувачів сайту і прагнуть захищати її, створюючи максимально
              комфортні умови користування сайтом для кожного користувача.
            </p>
            <p className={styles.m0}>
              3. Розпорядники зобов’язуються не розголошувати інформацію,
              отриману від Покупця. Виключення становить надання інформації
              контрагентам і третім особам, що діють на підставі договору з
              Продавцем для виконання зобов&apos;язань перед Покупцем, а також у
              випадках, передбачених чинним законодавством України.
            </p>
            <p className={styles.m0}>
              4. Розпорядники збирають лише ті персональні дані, які Покупець
              надає свідомо і добровільно для використання сервісів сайту.
            </p>
            <p className={styles.m0}>
              5. Розпорядники збирають та використовують персональні дані
              користувачів сайту для адміністрування та персоналізації сервісів
              сайту, забезпечення виконання замовлень Покупця та в інших цілях,
              визначених цим Договором та чинним законодавством України.
            </p>
            <p className={styles.m0}>
              6. Покупець надає свою однозначну згоду Продавцю на збір, обробку
              та передачу будь-яких своїх персональних даних, які стають відомі
              Продавцю під час використання сервісів сайту. Згода на обробку
              персональних даних діє протягом усього терміну дії Договору,
              укладеного між Покупцем та Продавцем, а також після його
              завершення. Укладаючи Договір, Покупець підтверджує, що він
              повідомлений про свої права, встановлені законодавством про захист
              персональних даних, про цілі збору даних, а також про те, що його
              персональні дані передаються Продавцю для виконання замовлення,
              проведення взаєморозрахунків та отримання рахунків, актів та інших
              документів. Покупець також погоджується, що Продавець може
              надавати доступ і передавати його персональні дані третім особам
              без додаткового повідомлення з метою виконання замовлення. Обсяг
              прав Покупця як суб’єкта персональних даних відповідно до
              законодавства йому відомий і зрозумілий.
            </p>
          </div>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}