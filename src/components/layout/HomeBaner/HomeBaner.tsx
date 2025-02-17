"use client";
import React from "react";
import { useRouter } from "next/navigation";
import cn from "clsx";
import s from "./HomeBaner.module.css";
import Button from "@/components/Ui/Button/Button";

import pic from "/public/img/last.svg";
import Image from "next/image";
import AllIcons from "@/components/icons/AllIcons";
import RubbitUshy from "@/components/icons/RubbitUshy";

interface Props {
  className?: string;
}

const HomeBaner: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  return (
    <div className={cn(s.baner, className)}>
      <div className={s.banerWrap}>
        <div className={s.imgBlock}>
          <Image src={pic} alt="pic" width={256} height={256} />
        </div>
        <div className={s.tb}>
          <p>
            Хочеш знати більше <br /> про цукерки?
          </p>

          <Button
            className={s.bb}
            text="Дізнатися"
            icon={<RubbitUshy />}
            iconRight
            handleClick={() => router.push(`/uk/classic`)}
            // handleClick={() => router.push(`/${lang}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBaner;
