import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

import s from "./ButtonTop.module.css";
import { Locale } from "../../../../../i18n.config";

interface Props {
  lang: Locale;
}

const LoginButton = ({ lang }: Props) => {
  const { status } = useSession();

  if (status === "loading") return <div className={s.placeholder} />;

  const isSignIn = status === "authenticated";

  return (
    <div className="wrap">
      {!isSignIn && (
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
