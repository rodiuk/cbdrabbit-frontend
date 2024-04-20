import React from "react";
import Link from "next/link";
import Close from "@/components/icons/Close";
import InstagrammIcon from "@/components/icons/InstagrammIcon";
import TelegrammIcon from "@/components/icons/TelegrammIcon";
import RabbitWiteIcon from "@/components/icons/RabbitWiteIcon";
import { Locale } from "../../../../../i18n.config";

import s from "./menuDrop.module.css";

interface Props {
  toggleMenu: () => void;
  lang: Locale;
}

const MenuDrop = ({ toggleMenu, lang }: Props) => {
  return (
    <div className={s.menu}>
      <div className={s.mnu}>
        <Link
          href={`/${lang}/signIn`}
          className={s.button}
          onClick={toggleMenu}
        >
          Увійти / Реєстрація <RabbitWiteIcon iconStyle={s.buttonIcon} />{" "}
        </Link>

        <ul className={s.mnu_list}>
          <li className={s.mnu_link}>
            <Link href={`/${lang}`} onClick={toggleMenu}>
              Головна
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
              Оформлення <RabbitWiteIcon iconStyle={s.buttonIcon} />{" "}
            </Link>
          </li>

          <li className={s.mnu_link}>
            <Link href={`/${lang}/orders`} onClick={toggleMenu}>
              Мої замовлення
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/profile`} onClick={toggleMenu}>
              Мій профіль
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/icons`} onClick={toggleMenu}>
              Ikons
            </Link>
          </li>
        </ul>
        <div className={s.ssoc}>
          <p>Соц мережі</p>
          <a href="#">
            <InstagrammIcon />
          </a>
          <a href="#">
            <TelegrammIcon />
          </a>
        </div>
        <div className={s.close} onClick={() => toggleMenu()}>
          <Close />
        </div>
      </div>
    </div>
  );
};

export default MenuDrop;
