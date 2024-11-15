import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth.config";
import MobileMainLogoIcon from "@/components/icons/MobileMainLogo";
import { InstaWhiteIcon } from "@/components/icons/InstaWhiteIcon";
import LinkToTop from "./LinkToTop/LinkToTop";
import { Locale } from "../../../../i18n.config";

import cn from "clsx";
import s from "./Footer.module.css";

import figureForFooter from "/public/img/figureForFooter.svg";
import figureForFooter_pink from "/public/img/figureForFooter_pink.svg";
import figureForFooter_yellow from "/public/img/figureForFooter_yellow.svg";
import { getDictionary } from "@/libs/18n/getDictionary";

interface Props {
  lang: Locale;
	titles?: any;
	idLand?: string | undefined
}

export const Footer = async ({
  lang,
	titles,
	idLand
}: Props): Promise<React.JSX.Element> => {
  const session = await getServerSession(authConfig);
	const isAuth = !!session?.user.id;
	const dict = await getDictionary(lang);
	const {footer} = dict

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

  return (
	  <footer className={cn("footer", s.footer, {
		[s.footer_pink]: idLand === "classic",
		[s.footer_yellow]: idLand === "banana",
	})}>
		  <div className={s.figure}>
			  {idLand === "classic" ? (
				  <Image src={figureForFooter_pink} width={720} height={80} alt="bg" />
			  ) : idLand === "banana" ? (
				<Image src={figureForFooter_yellow} width={720} height={80} alt="bg" />
			  ) : <Image src={figureForFooter} width={720} height={80} alt="bg" />}
        
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
              <Link href={`/${lang}`}>{buy}</Link>
            </li>
            {isAuth && (
              <li>
                <Link href={`/${lang}/profile`}>{cabinet}</Link>
              </li>
            )}
          </ul>
          <ul className={s.ul}>
            <li>
              <Link href={`/${lang}`}>{candies}</Link>
            </li>
            {/* <li>
              <Link href={`/${lang}/about-cbd`}>{aboutCbd}</Link>
            </li>
            <li>
              <Link href={`/${lang}/about`}>{about}</Link>
            </li> */}
            <li>
              <Link href={`/${lang}/checkout-info`}>{checkoutInfo}</Link>
            </li>
          </ul>
          <ul className={s.ul}>
            <li>
              <Link href={`/${lang}/contacts`}>{contacts}</Link>
            </li>
            <li>
              <Link href={`/${lang}/cooperation`}>{cooperation}</Link>
            </li>
            {/* <li>
              <Link href={`/${lang}/blog`}>{blog}</Link>
            </li> */}
          </ul>
          <div className={s.ul}>
            {/*  якщо залогінений - не виводимо контент але сам блок s.ul  повинен бути
					  початок */}
            {!isAuth && (
              <>
                <p>{footer.texts.text1}</p>
                <p>{footer.texts.text2}</p>
                <Link href="/signIn" className={s.button}>
				{footer.texts.logIn}
                </Link>
              </>
            )}
            {/* кінець */}
          </div>
        </div>
        <div className={s.footer_row}>
          <div className={s.part}>
            <Link href="/" className={s.logoImg}>
              <MobileMainLogoIcon iconStyle={s.mobile_home_logo} />
            </Link>
          </div>
				  <div className={cn(s.part, {
			  [s.part_pink]: idLand === "classic",
			  [s.part_yellow]: idLand === "banana",
		  })}>
            <p>© CBDRabbit. All Rights Reserved.</p>
            <p className={s.politics}>
              <Link href={`/${lang}/privacy`}>{privacy}</Link>{" "}
              <span className={s.divider}>|</span>{" "}
              <Link href={`/${lang}/policy`}>{policy}</Link>
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
