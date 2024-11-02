import React from "react";
import Loader from "../Loader";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeft";

import cn from "clsx";
import s from "./s.module.css";

interface ButtonProps {
  className?: string;
  text: string;
  iconLeft?: boolean;
  icon?: React.ReactNode;
  handleClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  greenThemeLoader?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  iconLeft,
  text,
  icon,
  handleClick,
  isDisabled,
  greenThemeLoader,
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
      {!isLoading && text}

      {isLoading && <Loader greenTheme={greenThemeLoader} />}
    </button>
  );
};

export default Button;
