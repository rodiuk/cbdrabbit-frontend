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
}

const Button: React.FC<ButtonProps> = ({
  className,
  iconLeft,
  text,
  icon,
  handleClick,
}) => {
  return (
    <button
      className={cn(s.button, {
        [className!]: className !== undefined,
      })}
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

export default Button;
