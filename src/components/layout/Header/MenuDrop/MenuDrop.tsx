import React from "react";
import Image from "next/image";

import s from "./menuDrop.module.css";
import Close from "@/components/icons/Close";
import InstagrammIcon from "@/components/icons/InstagrammIcon";
import TelegrammIcon from "@/components/icons/TelegrammIcon";
import RabbitWiteIcon from "@/components/icons/RabbitWiteIcon";
import Link from "next/link";

interface Props {
	toggleMenu: () => void
}

const MenuDrop = ({toggleMenu}: Props) => {
  return (
    <div className={s.menu}>
		  <div className={s.mnu}>
		  <Link href={`/uk/signIn`} className={s.button}>Увійти / Реєстрація <RabbitWiteIcon iconStyle={s.buttonIcon} /> </Link>
			
        <ul className={s.mnu_list}>
				  <li className={s.mnu_link}>
					  <Link href="/uk">Головна</Link>
				  </li>
				  <li className={s.mnu_link}>
				  <Link href={`/uk/checkout`}>Оформлення <RabbitWiteIcon iconStyle={s.buttonIcon} /> </Link>
				  </li>
				  
          <li className={s.mnu_link}>
		 	 <Link href={`/uk/orders`}>Мої замовлення</Link>
          </li>
          <li className={s.mnu_link}>
		  <Link href={`/uk/profile`}>Мій профіль</Link>
          </li>
          <li className={s.mnu_link}>
		  <Link href={`/uk/icons`}>Ikons</Link>
          </li>
        </ul>
        <div className={s.ssoc}>
          <p>Соц мережі</p>
          <a href="#">
			<InstagrammIcon />
          </a>
          <a href="#">
            <TelegrammIcon />
          </a>
        </div>
			  <div className={s.close} onClick={() => toggleMenu()}>
          <Close />
        </div>
      </div>
    </div>
  );
};

export default MenuDrop;
