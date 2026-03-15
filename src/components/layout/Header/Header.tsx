import React, { Suspense } from "react";
import { LogoContainer } from "./Logo/LogoContainer";
import { Locale } from "../../../../i18n.config";
import { PageTitle } from "./PageTitle/PageTitle";
import { NavWrapper } from "./NavWrapper";
import { getDictionary } from "@/libs/18n/getDictionary";

import cn from "clsx";
import styles from "./Header.module.css";
import { authConfig } from "@/configs/auth.config";
import { getServerSession, Session } from "next-auth";
import PercentageHeartIcon from "@/components/icons/PercentageHeartIcon";
import { HeaderCTA } from "./HeaderCTA";

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

  console.log("Header session", session?.user);

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
        <PageTitle lang={lang} />
      </div>
    </header>
  );
};
