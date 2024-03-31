"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "../../../../i18n.config";

import cn from "clsx";
import styles from "./LocaleSwitcher.module.css";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className={styles.container}>
      {i18n.locales.map(locale => {
        return (
          <li key={locale} className={cn(styles.locale, {
            [styles.active]: pathName.startsWith(`/${locale}`),
          })}>
            <Link href={redirectedPathName(locale)} className="">
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
