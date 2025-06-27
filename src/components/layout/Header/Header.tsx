import React from "react";
import { LogoContainer } from "./Logo/LogoContainer";
import { Locale } from "../../../../i18n.config";
import { PageTitle } from "./PageTitle/PageTitle";
import { NavWrapper } from "./NavWrapper";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./Header.module.css";
import { authConfig } from "@/configs/auth.config";
import { getServerSession, Session } from "next-auth";

interface Props {
  lang: Locale;
  stylesName?: string | undefined;
}

export const Header = async ({
  lang,
  stylesName,
}: Props): Promise<React.JSX.Element> => {
  const dict = await getDictionary(lang);
  const session = await getServerSession(authConfig);

  return (
    <header
      className={cn("", styles.container, styles.header, stylesName)}
      id="headerId"
    >
      <div className={cn("container", styles.block)}>
        {" "}
        {/* этот класс - он для ограничения, глобальный */}
        <LogoContainer lang={lang} />
        <NavWrapper
          lang={lang}
          session={session}
          dict={dict.header}
          isAuthenticated={!!session?.user?.id}
        />
      </div>
      <div className="container">
        <PageTitle lang={lang} />
      </div>
    </header>
  );
};
