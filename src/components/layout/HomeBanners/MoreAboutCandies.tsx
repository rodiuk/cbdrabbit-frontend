"use client";
import React from "react";
import { useRouter } from "next/navigation";
import cn from "clsx";
import s from "./HomeBaner.module.css";
import Button from "@/components/Ui/Button/Button";

import pic from "/public/img/last.svg";
import Image from "next/image";
import RubbitUshy from "@/components/icons/RubbitUshy";

interface Props {
  title: string;
  buttonLabel: string;
  className?: string;
}

const MoreAboutCandies = ({
  title,
  buttonLabel,
  className,
}: Props): React.JSX.Element => {
  const router = useRouter();

  return (
    <div className={cn(s.baner, className)}>
      <div className={s.banerWrap}>
        <div className={s.imgBlock}>
          <Image src={pic} alt="pic" width={256} height={256} />
        </div>
        <div className={s.tb}>
          <p
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />

          <Button
            className={s.bb}
            text={buttonLabel}
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

export default MoreAboutCandies;
