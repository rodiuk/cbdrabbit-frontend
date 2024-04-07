import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function BurgerMenuIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        stroke="#69332B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.5 10h15M2.5 5h15M2.5 15h15"
      ></path>
    </svg>
  );
}
