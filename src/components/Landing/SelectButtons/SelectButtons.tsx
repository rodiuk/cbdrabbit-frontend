import cn from "clsx";
import s from "./SelectButtons.module.css";
import Image from "next/image";

import ic1 from "/public/img/classic-candy.webp";
import ic2 from "/public/img/issmall2.png";
import ic3 from "/public/img/matcha1.webp";
import ic4 from "/public/img/coffee-candy.webp";
import Link from "next/link";
import { Locale } from "../../../../i18n.config";

interface Props {
  lang: Locale;
  langId: string;
}

const SelectButtons = ({ lang, langId }: Props) => {
  const themeClass =
    langId === "classic"
      ? s.themeClassic
      : langId === "banana"
        ? s.themeBanana
        : langId === "matcha"
          ? s.themeMatcha
          : langId === "coffee"
            ? s.themeCoffee
            : "";

  const getButtonClassName = (targetId: string) =>
    cn(
      s.productPage_selectButton,
      themeClass,
      targetId === "classic" && s.buttonClassic,
      targetId === "banana" && s.buttonBanana,
      targetId === "matcha" && s.buttonMatcha,
      targetId === "coffee" && s.buttonCoffee,
      {
        [s.isActive]: langId === targetId,
      }
    );

  return (
    <div className={s.productPage_select}>
      <Link
        className={getButtonClassName("classic")}
        href={`/${lang}/classic`}
      >
        <Image src={ic1} alt="Calm berry" width={48} height={48} />
        <span>
          Calm
          <br />
          Berry
        </span>
      </Link>
      <Link
        className={getButtonClassName("banana")}
        href={`/${lang}/banana`}
      >
        <Image src={ic2} alt="Banana Chill" width={48} height={48} />
        <span>Banana Chill</span>
      </Link>
      <Link
        className={getButtonClassName("matcha")}
        href={`/${lang}/matcha`}
      >
        <Image src={ic3} alt="Matcha Focus" width={48} height={48} />
        <span>Matcha Focus</span>
      </Link>
      <Link
        className={getButtonClassName("coffee")}
        href={`/${lang}/coffee`}
      >
        <Image src={ic4} alt="Coffee Break" width={48} height={48} />
        <span>Coffee Break</span>
      </Link>
    </div>
  );
};

export default SelectButtons;
