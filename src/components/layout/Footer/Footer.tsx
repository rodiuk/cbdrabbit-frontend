import React from "react";

import cn from "clsx";
import s from "./Footer.module.css";
import Link from "next/link";
import MobileMainLogoIcon from "@/components/icons/MobileMainLogo";
import BaseLogoIcon from "@/components/icons/BaseLogo";
import { InstaWhiteIcon } from "@/components/icons/InstaWhiteIcon";

import figureForFooter from "/public/img/figureForFooter.svg";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons/ArrowRight";
import LinkToTop from "./LinkToTop/LinkToTop";

export const Footer = (): React.JSX.Element => {
  return (
    <footer className={cn("footer", s.footer)}>
      <div className={s.figure}>
        <Image src={figureForFooter} width={720} height={80} alt="bg" />
        <LinkToTop />
      </div>
      <div className="container">
        <div className={s.mobil_logo}>
          <Link href="/">
            <MobileMainLogoIcon iconStyle={s.mobile_home_logo} />
          </Link>
        </div>
        <div className={s.mnu_row}>
          <ul className={s.ul}>
            <li>
              <Link href="/">Купити</Link>
            </li>
            <li>
              <Link href="/">Мій кабінет</Link>
            </li>
          </ul>
          <ul className={s.ul}>
            <li>
              <Link href="/">CBD цукерки</Link>
            </li>
            <li>
              <Link href="/">Про CBD</Link>
            </li>
            <li>
              <Link href="/">Про нас</Link>
            </li>
            <li>
              <Link href="/">Оплата і доставка</Link>
            </li>
          </ul>
          <ul className={s.ul}>
            <li>
              <Link href="/">Контакти</Link>
            </li>
            <li>
              <Link href="/">Співпраця</Link>
            </li>
            <li>
              <Link href="/">Блог</Link>
            </li>
          </ul>
          <div className={s.ul}>
            {/*  якщо залогінений - не виводимо контент але сам блок s.ul  повинен бути
					  початок */}
            <p>Давай знайомитись.</p>
            <p>Друзям зайчик робить знижки!</p>
            <Link href="/signIn" className={s.button}>
              Реєстрація / Вхід
            </Link>
            {/* кінець */}
          </div>
        </div>
        <div className={s.footer_row}>
          <div className={s.part}>
            <Link href="/" className={s.logoImg}>
              <MobileMainLogoIcon iconStyle={s.mobile_home_logo} />
            </Link>
          </div>
          <div className={s.part}>
            <p>© CBDRabbit. All Rights Reserved.</p>
            <p className={s.politics}>
              <Link href="/">Політика конфіденційності</Link>{" "}
              <span className={s.divider}>|</span>{" "}
              <Link href="/">Публічний договір оферти</Link>
            </p>
          </div>
          <div className={s.part}>
            <Link href="/" className={s.ssoc}>
              <InstaWhiteIcon /> CBDrabbit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
