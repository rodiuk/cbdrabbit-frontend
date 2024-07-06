import React from "react";
import { LogoContainer } from "./Logo/LogoContainer";
import { Locale } from "../../../../i18n.config";
import { PageTitle } from "./PageTitle/PageTitle";
import { NavWrapper } from "./NavWrapper";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./Header.module.css";
import { string } from "zod";

interface Props {
	lang: Locale;
	stylesName?: string | undefined
}

export const Header = async ({ lang }: Props): Promise<React.JSX.Element> => {
	const dict = await getDictionary(lang);


  return (
    <header className={cn("", styles.container, styles.header)} id="headerId">
      <div className={cn("container", styles.block)}> {/* этот класс - он для ограничения, глобальный */}
			  <LogoContainer lang={lang} />


        <NavWrapper lang={lang} dict={dict.header} />
      </div>
      <div className="container">
        <PageTitle lang={lang} />
      </div>
    </header>
  );
};
