"use client";

import React from "react";
import Link from "next/link";
import Close from "@/components/icons/Close";
import { useSession } from "next-auth/react";
import InstagrammIcon from "@/components/icons/InstagrammIcon";
import TelegrammIcon from "@/components/icons/TelegrammIcon";
import RabbitWiteIcon from "@/components/icons/RabbitWiteIcon";
import { Locale } from "../../../../../i18n.config";
import { signOut } from "next-auth/react";
import { IHeaderDict } from "@/interfaces/i18n.interface";

import s from "./menuDrop.module.css";

import basket_icom from "/public/img/basket_icom.svg";
import svd_icon from "/public/img/svd_icon.svg";
import my_page_icon from "/public/img/my_page_icon.svg";
import my_orders from "/public/img/my_orders.svg";
//import svd_icon.svg from "/public/img/svd_icon.svg.svg";
import Image from "next/image";

interface Props {
  toggleMenu: () => void;
  lang: Locale;
  dict: IHeaderDict;
}

const MenuDrop = (props: Props) => {
  const { toggleMenu, lang, dict } = props;
  const { status } = useSession();

  const isSignIn = status === "authenticated";

  const handleSignOut = () => {
    signOut();
    toggleMenu();
  };

  return (
    <div
      className={s.menu}
      onClick={e => e.currentTarget === e.target && toggleMenu()}
    >
      <div className={s.mnu}>
        {!isSignIn && (
          <Link
            href={`/${lang}/signIn`}
            className={s.button}
            onClick={toggleMenu}
          >
            {dict.links.signIn} <RabbitWiteIcon iconStyle={s.buttonIcon} />{" "}
          </Link>
        )}

			  <div className={s.wrapper_mnu}>
				  
		
        {/* 1 блок */}
        <ul className={s.mnu_list}>
          {isSignIn && (
            <>
              <li className={s.mnu_link}>
                <Link href={`/${lang}/profile`} onClick={toggleMenu}>
                  <Image
                    src={my_page_icon.src}
                    alt="Мій кабінет"
                    width={24}
                    height={24}
                  />
                  Мій кабінет
                </Link>
              </li>
              <li className={s.mnu_link}>
                <Link href={`/${lang}/orders`} onClick={toggleMenu}>
                  <Image
                    src={my_orders.src}
                    alt="Мій кабінет"
                    width={24}
                    height={24}
                  />
                  Мої замовлення
                </Link>
              </li>
            </>
          )}
          <li className={s.mnu_link}>
            <Link href={`/${lang}`} onClick={toggleMenu}>
              <Image
                src={basket_icom.src}
                alt="Купити"
                width={24}
                height={24}
              />
              Купити
            </Link>
          </li>
        </ul>

        <ul className={s.mnu_list}>
          <li className={s.mnu_link}>
            <Link href={`/${lang}`} onClick={toggleMenu}>
              <Image src={svd_icon.src} alt="CBD цукерки" width={24} height={24} />{" "}
              CBD цукерки
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
			Про CBD
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
			Про нас
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
			Оплата і доставка
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
			Блог
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
			Контакти
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
			Співпраця
            </Link>
          </li>

			  </ul>
			  {isSignIn && (
				  <>
					  <div className={s.botton_link}>
					  <Link href={`/${lang}`} className={s.out} onClick={handleSignOut}>
				{dict.links.signOut}
			</Link>
				  </div>
              
            </>
          )}
			  </div>

			  <div className={s.politic_block}>
			  <Link href={`/${lang}`} className={s.politic_link} onClick={handleSignOut}>
			  Політика конфіденційності
			</Link>
			  <Link href={`/${lang}`} className={s.politic_link} onClick={handleSignOut}>
			  Публічний договір оферти
			</Link>
			  </div>	  
       {/* 
	   покамет комментирую. хз, может еще понадобится
	    <div className={s.ssoc}>
          <p>{dict.links.socials}</p>
          <a href="#">
            <InstagrammIcon />
          </a>
          <a href="#">
            <TelegrammIcon />
          </a>
        </div> */}
        <div className={s.close} onClick={() => toggleMenu()}>
          <Close />
        </div>
      </div>
    </div>
  );
};

export default MenuDrop;
