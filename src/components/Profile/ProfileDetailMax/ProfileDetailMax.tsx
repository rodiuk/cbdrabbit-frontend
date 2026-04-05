import Image from "next/image";
import { IUserProfile } from "@/interfaces/user.interface";
import { IProfileDict } from "@/interfaces/i18n.interface";

import s from "./ProfileDetailMax.module.css";

import sale from "/public/img/salenew.jpg";

interface Props {
  user: IUserProfile | null;
  currency: string;
  dict: IProfileDict;
}

const ProfileDetailMax = (props: Props) => {
  const { dict } = props;

  return (
    <section className={s.details}>
      <div className={s.details_img}>
        <Image src={sale} alt="sale" />
      </div>
      <div className={s.text}>
        <p>{dict.maxDiscountTitle}</p>
        <p>{dict.maxDiscountSubtitle}</p>
      </div>
    </section>
  );
};

export default ProfileDetailMax;
