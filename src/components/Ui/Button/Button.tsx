import React from "react";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";

import cn from "clsx";
import s from "./s.module.css";
import { LoaderRabbit } from "../Loaders/LoaderRabbit";

interface ButtonProps {
  className?: string;
  text: string;
  iconLeft?: boolean;
  icon?: React.ReactNode;
  handleClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  iconLeft,
  text,
  icon,
  handleClick,
  isDisabled,
  isLoading,
}) => {
  return (
    <button
      className={cn(s.button, {
        [className!]: className !== undefined,
      })}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {iconLeft && (
        <span className={s.icon_block_left}>
          {icon ? icon : <ArrowLeftIcon iconStyle={s.icon_left} />}
        </span>
      )}
      {text}

      {isLoading && <LoaderRabbit />}
    </button>
  );
};

export default Button;
