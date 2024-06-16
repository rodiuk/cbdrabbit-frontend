"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Close from "@/components/icons/Close";
import { useSession } from "next-auth/react";
import Image from "next/image";
import RabbitWiteIcon from "@/components/icons/RabbitWiteIcon";
import { IHeaderDict } from "@/interfaces/i18n.interface";

import { Locale } from "../../../../../i18n.config";

import s from "./menuDrop.module.css";

import basket_icom from "/public/img/basket_icom.svg";
import svd_icon from "/public/img/svd_icon.svg";
import my_page_icon from "/public/img/my_page_icon.svg";
import my_orders from "/public/img/my_orders.svg";

interface Props {
  toggleMenu: () => void;
  lang: Locale;
  dict: IHeaderDict;
}

const MenuDrop = (props: Props) => {
  const { toggleMenu, lang, dict } = props;
  const { status } = useSession();
  const titles = dict.titles;
  const {
    buy,
    cabinet,
    candies,
    aboutCbd,
    about,
    checkoutInfo,
    contacts,
    cooperation,
    blog,
    privacy,
    policy,
  } = titles;
  const isSignIn = status === "authenticated";
  //
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
                      alt={cabinet}
                      width={24}
                      height={24}
                    />
                    {cabinet}
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
                <Image src={basket_icom.src} alt={buy} width={24} height={24} />
                {buy}
              </Link>
            </li>
          </ul>

          <ul className={s.mnu_list}>
            <li className={s.mnu_link}>
              <Link href={`/${lang}`} onClick={toggleMenu}>
                <Image
                  src={svd_icon.src}
                  alt={candies}
                  width={24}
                  height={24}
                />
                {candies}
              </Link>
            </li>
            <li className={s.mnu_link}>
              <Link href={`/${lang}/about-cbd`} onClick={toggleMenu}>
                {aboutCbd}
              </Link>
            </li>
            <li className={s.mnu_link}>
              <Link href={`/${lang}/about`} onClick={toggleMenu}>
                {about}
              </Link>
            </li>
            <li className={s.mnu_link}>
              <Link href={`/${lang}/checkout-info`} onClick={toggleMenu}>
                {checkoutInfo}
              </Link>
            </li>
            <li className={s.mnu_link}>
              <Link href={`/${lang}/blog`} onClick={toggleMenu}>
                {blog}
              </Link>
            </li>
            <li className={s.mnu_link}>
              <Link href={`/${lang}/contacts`} onClick={toggleMenu}>
                {contacts}
              </Link>
            </li>
            <li className={s.mnu_link}>
              <Link href={`/${lang}/cooperation`} onClick={toggleMenu}>
                {cooperation}
              </Link>
            </li>
          </ul>
          {isSignIn && (
            <>
              <div className={s.botton_link}>
                <Link
                  href={`/${lang}`}
                  className={s.out}
                  onClick={handleSignOut}
                >
                  {dict.links.signOut}
                </Link>
              </div>
            </>
          )}
        </div>

        <div className={s.politic_block}>
          <Link href={`/${lang}/privacy`} className={s.politic_link}>
            {privacy}
          </Link>
          <Link href={`/${lang}/policy`} className={s.politic_link}>
            {policy}
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
