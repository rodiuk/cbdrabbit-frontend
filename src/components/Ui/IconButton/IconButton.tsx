"use client";

import React from "react";

import cn from "clsx";
import s from "./IconButton.module.css";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const IconButton = ({
  handleClick,
  ariaLabel,
  children,
  className,
}: Props) => {
  return (
    <button
      className={cn(s.container, className)}
      type="button"
      aria-label={ariaLabel || "Icon Button"}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
