import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import s from "./ButtonTop.module.css";
import { Locale } from "../../../../../i18n.config";

interface Props {
  lang: Locale;
}

const ButtonTop = ({ lang }: Props) => {
  const { status } = useSession();

  if (status === "loading") return null;

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

export default ButtonTop;
