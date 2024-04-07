import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function MinusIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="currentColor"
      viewBox="0 0 25 24"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.5 12h14"
      ></path>
    </svg>
  );
}
