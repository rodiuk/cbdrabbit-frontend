import React from "react";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";

import cn from "clsx";
import s from "./s.module.css";

interface ButtonProps {
  className?: string;
  text: string;
  iconLeft?: boolean;
  icon?: React.ReactNode;
  handleClick?: () => void;
  isDisabled?: boolean;
}

const ButtonWhite: React.FC<ButtonProps> = ({
  className,
  iconLeft,
  text,
  icon,
  handleClick,
  isDisabled,
}) => {
  console.log(className);
  return (
    <button
      className={cn(s.white_button, {
        [className!]: className !== undefined,
      })}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {iconLeft && (
        <span className={s.icon_block_left}>
          {icon ? icon : <ArrowLeftIcon iconStyle={s.icon_left} />}
        </span>
      )}
      {text}
    </button>
  );
};

export default ButtonWhite;
