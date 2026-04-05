import React from "react";
import { HeaderCTA } from "./HeaderCTA";
import { NavWrapper } from "./NavWrapper";
import { getServerSession } from "next-auth";
import { Locale } from "../../../../i18n.config";
import { PageTitle } from "./PageTitle/PageTitle";
import { authConfig } from "@/configs/auth.config";
import { LogoContainer } from "./Logo/LogoContainer";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./Header.module.css";

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
        <LogoContainer lang={lang} />
        <HeaderCTA
          classNames={styles.cta_desktop}
          title={dict.header.cta}
          notAuthorized={!session?.user?.id}
        />
        <NavWrapper
          lang={lang}
          session={session}
          dict={dict.header}
          isAuthenticated={!!session?.user?.id}
        />
      </div>

      <HeaderCTA
        classNames={styles.cta_mobile}
        title={dict.header.cta}
        notAuthorized={!session?.user?.id}
      />

      <div className="container">
        <PageTitle lang={lang} titles={dict.header.titles} />
      </div>
    </header>
  );
};
