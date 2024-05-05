import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
  handleClick?: () => void;
}

export function ArrowLeftIcon({
  iconStyle,
  handleClick,
}: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      onClick={handleClick}
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        d="M19.5 10H1.5M1.5 10L9.9 1M1.5 10L9.9 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
