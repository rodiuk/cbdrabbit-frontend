"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "../../../../i18n.config";
import LocaleIcon from "@/components/icons/Locale";
import SwitcherArrowIcon from "@/components/icons/SwitcherArrow";

import cn from "clsx";
import styles from "./LocaleSwitcher.module.css";

const localesMap = {
  uk: "UA",
  en: "EN",
};

interface Props {
  current: string;
}

export const LocaleSwitcher = (props: Props) => {
  const { current } = props;
  const router = useRouter();
  const pathname = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const filteredLocales = i18n?.locales?.filter(
    locale => locale.toLowerCase() !== current.toLowerCase()
  );
  const hasAnotherLocale = filteredLocales?.length > 0;

  const handleChangeLocale = (locale: string) => {
    const localePath = redirectedPathName(locale.toLowerCase());
    router.push(localePath);
  };

  return (
    <div className={styles.container}>
      <div className={styles.current_container}>
        <LocaleIcon iconStyle={styles.icon} />
        <div className={styles.current_lang}>
          {localesMap[current as keyof typeof localesMap]}
          <SwitcherArrowIcon iconStyle={cn(styles.arrow, styles.icon)} />
        </div>
      </div>
      {hasAnotherLocale && (
        <ul className={styles.locales}>
          {filteredLocales?.map(locale => (
            <li key={locale} onClick={() => handleChangeLocale(locale)}>
              {localesMap[locale]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
