import React from "react";
import { Metadata } from "next";
import { IMainPageProps } from "@/interfaces/page.interface";
import { openGraphBase } from "@/app/[lang]/shared-metadata";

import cn from "clsx";
import s from "./page.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { getDictionary } from "@/libs/18n/getDictionary";

export async function generateMetadata({
  params,
}: IMainPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/contact`,
      languages: {
        en: `/en/contact`,
        uk: `/uk/contact`,
      },
    },
    openGraph: {
      ...openGraphBase,
      locale: params.lang,
    },
  };
}

export default async function CheckoutInfo({ params }: any) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { header } = dict;
  return (
    <>
      <main className={cn("container", s.main)}>
        <div className={s.wrap}>
          <div className={s.block}>
            <div className={s.ttl}>Оплата за товар</div>
            <p>
              Оплата товару здійснюється онлайн через сайт за допомогою
              платіжної системи Plata by mono на рахунок Продавця.
            </p>
          </div>
          <div className={s.block}>
            <div className={s.ttl}>Доставка товару по Україні</div>
            <p>
              Доставка товару здійснюється службою логістичної компанії ТОВ
              «Нова Пошта» відповідно до її опцій та тарифів.
            </p>
          </div>
          <div className={s.block}>
            <div className={s.ttl}>Умови повернення товару</div>
            <p>
              Згідно з чинним законодавством, Покупець має право повернути товар
              належної якості протягом 14 днів з моменту покупки. Після
              закінчення цього терміну рішення про повернення товару приймається
              на розсуд магазину.
            </p>
            <p>
              Поверненню підлягає лише товар належної якості в оригінальній
              упаковці, в якій він був доставлений Покупцю. Товар, що був у
              використанні, або належної якості поверненню не підлягає.
              Повернення здійснюється відповідно до Закону України «Про захист
              прав споживачів»
            </p>
          </div>
          <div className={s.block}>
            <div className={s.ttl}>Умови повернення грошових коштів</div>
            <p>
              Повернення грошових коштів здійснюється на банківську карту
              Покупця, з якої була проведена оплата за товар. Продавець
              перераховує кошти протягом 10 днів з моменту надходження
              поверненого товару на склад та підтвердження його повернення. Для
              повернення грошових коштів іншим способом (якщо використовувався
              інший спосіб оплати, крім банківської карти), необхідно звернутися
              за електронною адресою cbd.rabbit.ua@gmail.com
            </p>
          </div>
        </div>
      </main>
      <Footer lang={lang} titles={header.titles} />
    </>
  );
}
