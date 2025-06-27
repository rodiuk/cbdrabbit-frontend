import Link from "next/link";
import React from "react";

import s from "./ButtonTop.module.css";
import { Locale } from "../../../../../i18n.config";

interface Props {
  lang: Locale;
  isAuthenticated: boolean;
}

const LoginButton = ({ lang, isAuthenticated }: Props) => {
  return (
    <div className="wrap">
      {!isAuthenticated && (
        <Link
          href={`/${lang}/signIn`}
          className={s.button}
          // onClick={toggleMenu}
        >
          Вхід
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
