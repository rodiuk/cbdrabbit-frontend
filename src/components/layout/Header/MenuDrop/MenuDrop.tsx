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
	  <div className={s.menu}
		  onClick={e => (e.currentTarget === e.target) && toggleMenu()}
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

        {isSignIn && (
          <Link href={`/${lang}`} className={s.button} onClick={handleSignOut}>
            {dict.links.signOut} <RabbitWiteIcon iconStyle={s.buttonIcon} />{" "}
          </Link>
        )}

        <ul className={s.mnu_list}>
          <li className={s.mnu_link}>
            <Link href={`/${lang}`} onClick={toggleMenu}>
              {dict.links.main}
            </Link>
          </li>
          <li className={s.mnu_link}>
            <Link href={`/${lang}/checkout`} onClick={toggleMenu}>
              {dict.links.checkout} <RabbitWiteIcon iconStyle={s.buttonIcon} />{" "}
            </Link>
          </li>

          {isSignIn && (
            <>
              <li className={s.mnu_link}>
                <Link href={`/${lang}/orders`} onClick={toggleMenu}>
                  {dict.links.orders}
                </Link>
              </li>
              <li className={s.mnu_link}>
                <Link href={`/${lang}/profile`} onClick={toggleMenu}>
                  {dict.links.profile}
                </Link>
              </li>
            </>
          )}
          <li className={s.mnu_link}>
            <Link href={`/${lang}/icons`} onClick={toggleMenu}>
              Ikons
            </Link>
          </li>
        </ul>
        <div className={s.ssoc}>
          <p>{dict.links.socials}</p>
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
