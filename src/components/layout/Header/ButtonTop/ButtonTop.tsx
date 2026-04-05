import Link from "next/link";

import s from "./ButtonTop.module.css";
import { Locale } from "../../../../../i18n.config";

interface Props {
  lang: Locale;
  isAuthenticated: boolean;
  label: string;
}

const LoginButton = ({ lang, isAuthenticated, label }: Props) => {
  return (
    <div className="wrap">
      {!isAuthenticated && (
        <Link
          href={`/${lang}/signIn`}
          className={s.button}
          // onClick={toggleMenu}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
