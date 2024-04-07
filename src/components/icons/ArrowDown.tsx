import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function ArrowDownIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.374 9.35l4.39-4.39a.667.667 0 01.943.942l-5.333 5.333L3.04 5.902a.667.667 0 01.943-.943l4.39 4.391z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
